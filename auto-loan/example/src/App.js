import React, { Component } from 'react';
import {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { scroller } from 'react-scroll';

//Setting Up Location
import es from 'date-fns/locale/es';
import frCa  from 'date-fns/locale/fr-CA';

import Util from "./Utils";
import getTranslations from './language';

import './App.css';
import InputGroup from './components/inputGroup';
import Tooltip from "./components/tooltip";
import TableResults from "./components/tableResults";
import CalculatorResults from "./components/calculatorResults";
import Dropdown from "./components/select";
import _ from 'underscore';

registerLocale('es', es);
registerLocale('fr', frCa);


class App extends Component {
    constructor(props){
        super(props);

        const region = props.region ? props.region : 'us';
        const lan = props.lan ? props.lan : 'en';
        const languages = getTranslations(props.lan);

        this.state = {
            region,
            lan,
            translations: languages,
            formType: 'loan',

            amount: 15000,
            months: 36,
            interest: 3,
            downPayment: 0,
            monthlyPayment: 0,

            tableColumns : [
                languages.monthYearText,
                languages.paymentSingular,
                languages.principalPaid,
                languages.interestPaid,
                languages.totalInterestText,
                languages.balance+' ',
            ],
            tableResults : [],
            dateToFinish : new Date(),

            showResults: false,
            mortgageTotals: {},

            startDate: new Date(),
            showAmortization: false,
            term: 1,
        };

    }//End of Constructor



    handleChange = (properties) => {
        this.setState({[properties.name]: properties.value, showResults: false});
    };

    scrollTo(selector) {
        scroller.scrollTo(selector, {
            duration: 800,
            delay: 0,
            offset: -100,
            smooth: 'easeInOutQuart',
        })
    }

    getTermMonths(currentTerm = 36) {

        let terms = [12,24,36,48,60,72,84];

        let months = [];
        _.each(terms, (term, key) => {
            months.push({
                id: term,
                title: `${term}`,
                selected: term === currentTerm
            })
        });

        return months;
    }

    handleFormTypeChange = (props) => {

        const formType = props.target.name;
        let monthlyPayment = this.state.monthlyPayment;
        let amount = this.state.amount;

        if (this.state.formType === formType) {
            return false;
        }

        if (formType === 'qualify') {
            monthlyPayment = this.monthlyPayment();
        }

        if (formType === 'loan') {
            amount = this.estimateLoanAmount();
        }

        this.setState({formType,monthlyPayment, amount}, () => {
            if (amount > 0) {
                this.calculateAmortization();
            }
        });
    };

    handleBPSelect = (value, name) => {
        //Updating List of Monthds
        this.setState({[name]: value, showResults: false});
    };

    handleDateChange = date => {
        this.setState({ startDate: date }, () => { this.calculateAmortization() });
    };

    rate() {
        if (this.state.region === 'ca') {
            return (Math.pow(Math.pow(1+(this.state.interest/100/2),2),(1/12))-1);
        }

        return this.state.interest/100/12;
    }

    monthlyPayment() {
        const amount = this.state.amount-this.state.downPayment;

        if (this.state.region === 'ca') {
            return (amount*this.rate())/(1-Math.pow(1+this.rate(),-this.state.months));
        }

        return Util.pmt(this.rate(),this.state.months,-amount);
    }

    estimateLoanAmount() {
        let total_amount = Util.estimateLoan(this.rate(), this.state.months, -this.state.monthlyPayment);
        let downPayment = parseFloat(this.state.downPayment);

        if (downPayment > 0) {
            total_amount += downPayment;
        }

        return total_amount;
    }

    calculateAmortization = () =>{

        let {
            amount,
            downPayment,
            months,
            startDate,
            term,
            translations,
            formType,
            monthlyPayment
        } = this.state;


        let monthly_payment = monthlyPayment;

        if (formType === 'loan') {
            monthly_payment = this.monthlyPayment();
        }

        let monthly_payment_without_extra = monthly_payment;

        let total_interest = 0;
        let default_color = 'trbg-default';
        let tr_bg_color = default_color;


        let payment = Number(monthly_payment);

        let amortizationTerm = months;
        let term_date = '';
        let aux_dates = '';
        let next_month = '';
        let next_year = '';
        let interest_paid = '';
        let principal_paid = 0;
        let amortizationTable = [];

        let yearTotals = {
            payment: 0,
            principalPaid: 0,
            interestPaid: 0,
            totalInterest: 0,
            balance: 0,
            earlyPayments: 0
        };

        let termTotals = {
            payment: 0,
            principalPaid: 0,
            interestPaid: 0,
            totalInterest: 0,
            balance: 0,
            earlyPayments: 0
        };

        amount = amount-downPayment;

        let currDate = new Date(startDate);
        let termEndDate = new Date(startDate);
        termEndDate.setFullYear(currDate.getFullYear() + term);

        for(let month=1; month<=amortizationTerm; month++) {
            tr_bg_color = default_color;

            aux_dates = new Date(startDate);
            term_date = new Date( aux_dates.setMonth(aux_dates.getMonth() + month) );
            next_month = term_date.getMonth();
            next_year = term_date.getFullYear();

            interest_paid = amount*this.rate();

            principal_paid = payment-interest_paid;

            if (amount < principal_paid){
                principal_paid = amount;
                payment = principal_paid;
                amount = 0;
            }
            else {
                amount -= (payment-interest_paid);
            }

            yearTotals.payment += payment;
            yearTotals.principalPaid += principal_paid;
            yearTotals.interestPaid += interest_paid;
            yearTotals.earlyPayments += Math.max(0,monthly_payment-monthly_payment_without_extra);


            total_interest += interest_paid;

            amortizationTable.push({
                month_year: translations.shortMonths[next_month]+' - '+next_year,
                payment: '$' + Util.formatMoney( Util.roundTo(payment, 2) ),
                principalPaid: '$' + Util.formatMoney( Util.roundTo(principal_paid, 2) ),
                interestPaid: '$' + Util.formatMoney( Util.roundTo(interest_paid, 2) ),
                totalInterest: '$' + Util.formatMoney( Util.roundTo(total_interest, 2) ),
                balance: '$' + Util.formatMoney( Util.roundTo(amount, 2) ),
                bg_class: tr_bg_color,
            });

            // last month total  - amount is never zero so the verification is 0.01
            if (next_month === 11 || amount <= 0.01) {
                amortizationTable.push({
                    month_year: Util.translationsStringReplace({
                        'yyyy': next_year
                    }, translations.totalAsOf),
                    payment: '$' + Util.formatMoney( Util.roundTo(yearTotals.payment, 2) ),
                    principalPaid: '$' + Util.formatMoney( Util.roundTo(yearTotals.principalPaid, 2) ),
                    interestPaid: '$' + Util.formatMoney( Util.roundTo(yearTotals.interestPaid, 2) ),
                    totalInterest: '$' + Util.formatMoney( Util.roundTo(total_interest, 2) ),
                    balance: '$' + Util.formatMoney( Util.roundTo(amount, 2) ),
                    bg_class: 'trbg-total',
                });
            }

            if(amount <= 0){
                break;
            }
        }

        this.setState({
            monthlyPayment: monthly_payment_without_extra,
            tableResults: amortizationTable,
            dateToFinish: term_date,
            showResults: true,
            showEPayError: false,
            mortgageTotals: yearTotals,
            termTotals: termTotals
        });

    };

    handleAmortizationAction = () => {
        let aux_showAmortization = this.state.showAmortization;
        aux_showAmortization = !aux_showAmortization;

        this.setState({showAmortization : aux_showAmortization} );
    };

    handleSubmit(e){
        e.preventDefault();
        this.calculateAmortization();
    }

    render() {

        const {
            formType,
            translations,
            amount,
            months,
            interest,
            downPayment,
            monthlyPayment
        } = this.state;
        const {btnLabel} = this.props;

        const termMonths = this.getTermMonths(months);

        return (
            <div className="auto-loan-calculator-wrapper">
                <div className="container row">
                    <div className="col-sm-12 col-lg-6 col-xl-6 form-container">
                        <div className="row no-gutters mt-3">
                            <div className="btn-group btn-group-toggle col-12 col-sm-6">
                                <button className={`btn btn-secondary ${formType === 'loan' ? 'btn-active' : ''}`} name="loan" onClick={this.handleFormTypeChange}>{translations.loanFormText}</button>
                            </div>
                            <div className="btn-group btn-group-toggle col-12 col-sm-6">    
                                <button className={`btn btn-secondary ${formType === 'qualify' ? 'btn-active' : ''}`} name="qualify" onClick={this.handleFormTypeChange}>{translations.qualifyFormText}</button>
                            </div>
                        </div>
                        <form id="mbp-calculator" onSubmit={this.handleSubmit.bind(this)} >
                            <div className="row form-group mt-3">
                                { formType === 'loan' && (
                                    <InputGroup
                                        id='loan-amount'
                                        label={translations.loanAmount}
                                        name='amount'
                                        value={Math.min(amount, 1000000)}
                                        fixedDecimalScale={true}
                                        decimalScale={2}
                                        icon='$'
                                        iconPosition='left'
                                        tooltipContent={translations.amountHelpText}
                                        errorOccur={(Number(amount) < 1 || Number(amount) > 1000000 || amount === '') ? 1 : 0}
                                        errorMsg={translations.moneyFieldError}
                                        onChange={this.handleChange}
                                    />
                                )}
                                { formType === 'qualify' && (
                                    <InputGroup
                                        id='monthly-payment'
                                        label={translations.monthlyPayment}
                                        name='monthlyPayment'
                                        value={this.state.monthlyPayment}
                                        fixedDecimalScale={true}
                                        decimalScale={2}
                                        icon='$'
                                        iconPosition='left'
                                        tooltipContent={translations.monthlyPaymentHelpText}
                                        errorOccur={(Number(monthlyPayment) < 1 || Number(monthlyPayment) > 1000000 || monthlyPayment === '') ? 1 : 0}
                                        errorMsg={translations.moneyFieldError}
                                        onChange={this.handleChange}
                                    />
                                )}
                            </div>

                            <div className="row no-gutters mt-3">
                                <InputGroup
                                    id='ssc_interest'
                                    label={translations.interestLabel}
                                    name='interest'
                                    value={interest}
                                    icon='%'
                                    iconPosition='left'
                                    tooltipContent={translations.interestHelpText}
                                    errorOccur={(Number(interest) <= 0 || Number(interest) > 100 || interest === '') ? 1 : 0}
                                    errorMsg={translations.percentageFieldError}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="row no-gutters">

                                <div className="col-12 no-gutters mt-3">
                                    <label htmlFor="interestTerm" className="col-12">
                                        <Tooltip content={translations.termInMonthsHelp} />
                                        {translations.termInMonths}
                                    </label>

                                    <div className="input-group input-select">
                                        <div className="input-group-append">
                                            <span className="input-group-text">{`${translations.monthPluralText}`}</span>
                                        </div>

                                        <Dropdown
                                            name="months"
                                            list={termMonths}
                                            handleBPSelect={this.handleBPSelect}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <small className={`inputErrorText ${ (months < 1 || months > 84 ||  months === '') ? 'show' : 'hide' }`}>{translations.timeError}</small>
                                </div>
                            </div>

                            <div className="row no-gutters mt-3">
                                <div className="col-sm-12 no-gutters">
                                    <InputGroup
                                        id='downPayment'
                                        label={translations.downPaymentText}
                                        name='downPayment'
                                        value={downPayment}
                                        wrapperClass={'pr-1 down-payment-field'}
                                        icon='$'
                                        iconPosition='left'
                                        tooltipContent={translations.downPaymentHelp}
                                        errorOccur={parseFloat(downPayment) > amount}
                                        errorMsg={translations.downPaymentError}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block"
                                    disabled={ Number(amount) < 1 || Number(amount) > 1000000 || amount === '' ||
                                    Number(months) < 1 || Number(months) > 84 || months === '' }
                                >
                                    { btnLabel }
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Showing monthly payment results */}
                    {this.state.showResults && (
                        <div className="col-sm-12 col-lg-6 col-xl-6">
                            <CalculatorResults
                                state={this.state}
                                onChangeAmortization={this.handleAmortizationAction}
                                monthlyPayment={this.monthlyPayment()}
                                estimateMaximumLoan={this.estimateLoanAmount()}
                            />
                        </div>
                    )}
                </div>

                {this.state.showResults && this.state.showAmortization && (
                    <TableResults state={this.state} onHandleDateChange={this.handleDateChange}/>
                )}
            </div>
        );

    }//End of render

}
export default App;
