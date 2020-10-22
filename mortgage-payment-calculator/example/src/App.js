import React, { Component } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { scroller } from 'react-scroll';

//Setting Up Location
import es from 'date-fns/locale/es';
import frCa  from 'date-fns/locale/fr-CA';

import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import Table from './components/table.jsx'
import Tooltip from './components/tooltip.jsx';
import Dropdown from "./components/select";

import './App.css';

registerLocale('es', es);
registerLocale('fr', frCa);

class App extends Component {
    constructor(props){
        super(props);

        const region = props.region ? props.region : 'us';
        const lan = props.lan ? props.lan : 'en';
        const possibleYears = Util.getPossibleYears(50);
        const languages = getTranslations(lan);
        const listOfMonths = Util.getMonthds( languages.fullMonths );

        this.state = {
            lan,
            region,
            translations : languages,
            startDate: new Date(),
            amount: 100000,
            years: 30,
            months: 360,
            interest: 4,
            extraMonthlyAmount: 0,
            extra_yearly_amount: 0,
            extra_lump_amount: 0,
            extraYearlyMonths: listOfMonths,
            extraLumpMonths: listOfMonths,
            extraLumpYears: possibleYears,
            term: 1,

            downPayment: 0,
            downPaymentRate: 0,
            paymentType: 'bi-weekly',

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
            showResults  : false,
            showAmortization: false,
            showExtraPayments: false,
            showEPayError: false,

            lockField: '',

            mortgageTotals: {},
            termTotal: {}
        };

    }//End of Constructor

    pmt(rate, nper, pv, fv, type){
        if (!fv) fv = 0;
        if (!type) type = 0;

        if (rate === 0) return -(pv + fv)/nper;

        const pvif = Math.pow(1 + rate, nper);
        let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

        if (type === 1) {
            pmt /= (1 + rate);
        }

        return pmt;
    }

    rate() {
        if (this.state.region === 'ca') {
            return (Math.pow(Math.pow(1+(this.state.interest/100/2),2),(1/12))-1);
        }

        return this.state.interest/100/12;
    }

    biWeeklyRate() {
        if (this.state.region === 'ca') {
            return Math.pow(Math.pow(1+(this.state.interest/100/2),2),(1/26))-1;
        }

        return this.state.interest/100/26;
    }

    monthlyPayment() {
        const amount = this.state.amount-this.state.downPayment;

        if (this.state.region === 'ca') {
            return (amount*this.rate())/(1-Math.pow(1+this.rate(),-this.state.years * 12));
        }

        return this.pmt(this.rate(),this.state.years * 12,-amount);
    }

    biWeeklyPayment() {
        return this.monthlyPayment() / 2;
    }

    handleChange = (properties) => {
        let showResults = false;
        if((properties.name === 'extraMonthlyAmount' || properties.name === 'extra_yearly_amount' || properties.name === 'extra_lump_amount') && this.state.showResults === true ){
            showResults = true;
        }

        this.setState({showResults, [properties.name]: properties.value});
    }

    handlePaymentTypeChange = (props) => {
        this.setState({paymentType: props.target.name});
    }

    handleBPSelect = (id, name) => {
        //Updating List of Monthds
        let tempPer = JSON.parse(JSON.stringify(this.state[name]));
        tempPer.forEach(item => (item.selected = false));
        tempPer[id].selected = true;

        const currDate = new Date();
        const currYear = currDate.getFullYear();
        const currentMonth = currDate.getMonth();
        const extra_lump_month = this.state.extraLumpMonths.findIndex(obj => obj.selected);
        let aux_showEPayError = false;
        if(name === 'extraLumpYears' && tempPer[id].title === currYear && extra_lump_month < currentMonth){
            aux_showEPayError = true;
        }else{
            if( name === 'extraLumpMonths' && this.state.extraLumpYears.filter(y => y.selected)[0].title === currYear && this.state.extraLumpMonths.findIndex(obj => obj.title === tempPer[id].title) < currentMonth ){
                aux_showEPayError = true;
            }
        }

        this.setState({ [name]: tempPer, showEPayError: aux_showEPayError });
    };

    handleDownPayment = (props) => {
        const {name, value} = props;

        let validated_value = value;

        if (name === this.state.lockField) {
            this.setState({lockField: ''});
            return false;
        }

        if (name === 'downPayment') {
            validated_value = Math.min(this.state.amount, Math.max(0, value));
            const downPaymentRate = (+value / this.state.amount) * 100;
            this.setState({ downPaymentRate: parseFloat(downPaymentRate).toFixed(2), [name]: parseFloat(validated_value).toFixed(2), lockField: 'downPaymentRate'});
        }
        else if (name === 'downPaymentRate') {
            const downPayment = (+value / 100) * this.state.amount;
            validated_value = Math.min(100, Math.max(0, value));
            this.setState({ downPayment: parseFloat(downPayment).toFixed(0), [name]: parseFloat(validated_value).toFixed(2), lockField: 'downPayment'});
        }
    }

    handleTermChange = (props) => {
        const {name, value} = props;
        let int_val = Math.floor(value);
        this.setState( {term: Math.max(1, Math.min(10, int_val))});
    }

    handleTimeChange = (props) => {
        const {name, value} = props;

        let int_val = Math.floor(value);
        let time_value = 0;
        if(name === 'years') {
            time_value = Util.calculateMonthsYears(int_val, false);
            this.setState( {years: int_val, months: time_value, showResults: false } );
        }
        else{
            time_value = Util.calculateMonthsYears(int_val);
            let rest = time_value - Math.floor(time_value);
            let str_number = time_value.toString();
            if(rest === 0){
                str_number = str_number.split(".")[0];
            }
            this.setState( {months: int_val, years: str_number, showResults: false } );
        }
    }

    keyUpHandlerTime = (e) => {
        const {name, value} = e.target;
        let int_val = Math.floor(value);
        this.setState( {[name]: int_val} );
    }

    translationsStringReplace(keys, translation) {

        let newTranslation = translation;
        Object.keys(keys).forEach((key) =>  {
            newTranslation = newTranslation.replace(`##${key}##`, keys[key])
        });
        return newTranslation;
    }

    calculateAmortization = (props) =>{

        let {
            amount,
            downPayment,
            paymentType,
            months,
            startDate,
            term,
            extraMonthlyAmount,
            extra_yearly_amount,
            extra_lump_amount,
            extraYearlyMonths,
            extraLumpMonths,
            extraLumpYears,
            translations } = this.state;

        let extra_yearly_month = extraYearlyMonths.findIndex(obj => obj.selected);
        let extra_lump_month = extraLumpMonths.findIndex(obj => obj.selected);
        let extra_lump_year = Number(extraLumpYears.filter(obj => obj.selected)[0].title);

        let monthly_payment = (paymentType === 'bi-weekly') ? this.biWeeklyPayment() : this.monthlyPayment();
        let monthly_payment_without_extra = monthly_payment;

        let total_interest = 0;
        let default_color = 'trbg-default';
        let tr_bg_color = default_color;

        if(extraMonthlyAmount){
            monthly_payment += Number(extraMonthlyAmount);
            default_color = 'trbg-lblue';
        }

        let payment = Number(monthly_payment);
        let temp_payment = payment;

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
        const currYear = currDate.getFullYear();
        const currentMonth = currDate.getMonth();
        let termEndDate = new Date(startDate);
        termEndDate.setFullYear(currDate.getFullYear() + term);

        if (paymentType === 'monthly') {
            for(let month=1; month<=amortizationTerm; month++) {
                tr_bg_color = default_color;

                aux_dates = new Date(startDate);
                term_date = new Date( aux_dates.setMonth(aux_dates.getMonth() + month) );
                next_month = term_date.getMonth();
                next_year = term_date.getFullYear();

                if( extra_yearly_amount && extra_yearly_month === next_month ){
                    payment += Number(extra_yearly_amount);

                    if( extra_lump_amount && extra_lump_amount !== "0" && extra_lump_month === next_month && extra_lump_year === next_year ){
                        tr_bg_color = "trbg-lgreen";
                    }
                    else{
                        tr_bg_color = "trbg-lsky";
                    }
                }
                else{
                    if( extra_lump_amount && extra_lump_month === next_month && extra_lump_year === next_year ){
                        payment += Number(extra_lump_amount);
                        tr_bg_color = "trbg-lgreen";
                    }
                    else{
                        payment = temp_payment;
                    }
                }

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


                if (termEndDate.getTime() - term_date.getTime() >= 0) {
                    termTotals.payment = '$' + Util.formatMoney( Util.roundTo(yearTotals.payment, 2) );
                    termTotals.principalPaid = '$' + Util.formatMoney( Util.roundTo(yearTotals.principalPaid, 2) );
                    termTotals.interestPaid = '$' + Util.formatMoney( Util.roundTo(yearTotals.interestPaid, 2) );
                    termTotals.earlyPayments = yearTotals.earlyPayments;
                }

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
                        month_year: this.translationsStringReplace({
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
        }
        else if (paymentType === 'bi-weekly') {

            currDate.setHours(0,0,0,0);

            let new_amount = this.state.amount - this.state.downPayment;
            monthly_payment_without_extra = this.biWeeklyPayment();
            total_interest = 0;

            yearTotals.payment = 0;
            yearTotals.principalPaid = 0;
            yearTotals.interestPaid = 0;
            yearTotals.earlyPayments = 0;

            termTotals.payment = 0;
            termTotals.principalPaid = 0;
            termTotals.interestPaid = 0;
            termTotals.earlyPayments = 0;

            let once_a_year_paid = false;
            let one_time_payment = false;

            while (new_amount >= 0.1) {

                // Add 2 weeks to the current Date
                currDate.setTime(currDate.getTime() + (14 * 24 * 60 * 60 * 1000));
                payment = this.biWeeklyPayment();
                interest_paid = new_amount * this.biWeeklyRate();
                total_interest += interest_paid;
                principal_paid = payment-interest_paid;

                tr_bg_color = default_color;

                let date = currDate.getDate();
                next_month = currDate.getMonth();
                next_year = currDate.getFullYear();
                term_date = currDate;

                if( extra_yearly_amount && extra_yearly_month === next_month ){
                    payment += Number(extra_yearly_amount);

                    if( extra_lump_amount && extra_lump_amount !== "0" && extra_lump_month === next_month && extra_lump_year === next_year ){
                        tr_bg_color = "trbg-lgreen";
                    }
                    else if (!once_a_year_paid) {
                        tr_bg_color = "trbg-lsky";
                        once_a_year_paid = true;
                    }
                }
                else{
                    if( extra_lump_amount && extra_lump_month === next_month && extra_lump_year === next_year && !one_time_payment  ){
                        payment += Number(extra_lump_amount);
                        tr_bg_color = "trbg-lgreen";
                        one_time_payment = true;
                    }
                    else {
                        payment = temp_payment;
                    }
                }

                if (new_amount < principal_paid){
                    principal_paid = new_amount;
                    payment = principal_paid;
                    new_amount = 0;
                }
                else {
                    new_amount -= (payment-interest_paid);
                }

                yearTotals.payment += payment;
                yearTotals.principalPaid += principal_paid;
                yearTotals.interestPaid += interest_paid;
                yearTotals.earlyPayments += Math.max(0,payment-monthly_payment_without_extra);

                if (termEndDate.getTime() - term_date.getTime() >= 0) {
                    termTotals.payment = '$' + Util.formatMoney( Util.roundTo(yearTotals.payment, 2) );
                    termTotals.principalPaid = '$' + Util.formatMoney( Util.roundTo(yearTotals.principalPaid, 2) );
                    termTotals.interestPaid = '$' + Util.formatMoney( Util.roundTo(yearTotals.interestPaid, 2) );
                    termTotals.earlyPayments = yearTotals.earlyPayments;
                }


                amortizationTable.push({
                    month_year: `${date < 10 ? `0${date}` : date} ${translations.shortMonths[next_month]} - ${next_year}`,
                    payment: '$' + Util.formatMoney( Util.roundTo(payment, 2) ),
                    principalPaid: '$' + Util.formatMoney( Util.roundTo(principal_paid, 2) ),
                    interestPaid: '$' + Util.formatMoney( Util.roundTo(interest_paid, 2) ),
                    totalInterest: '$' + Util.formatMoney( Util.roundTo(total_interest, 2) ),
                    balance: '$' + Util.formatMoney( Util.roundTo(new_amount, 2) ),
                    bg_class: tr_bg_color,
                });

                // last month total  - amount is never zero so the verification is 0.01
                if ((next_month === 11 && (31-date < 14)) || new_amount <= 0.01) {
                    amortizationTable.push({
                        month_year: this.translationsStringReplace({
                            'yyyy': next_year
                        }, translations.totalAsOf),
                        payment: '$' + Util.formatMoney( Util.roundTo(yearTotals.payment, 2) ),
                        principalPaid: '$' + Util.formatMoney( Util.roundTo(yearTotals.principalPaid, 2) ),
                        interestPaid: '$' + Util.formatMoney( Util.roundTo(yearTotals.interestPaid, 2) ),
                        totalInterest: '$' + Util.formatMoney( Util.roundTo(total_interest, 2) ),
                        balance: '$' + Util.formatMoney( Util.roundTo(new_amount, 2) ),
                        bg_class: 'trbg-total',
                    });

                    once_a_year_paid = false;
                }

            }
        }

        let aux_showEPayError = false;
        if( extraLumpYears.filter(y => y.selected)[0].title === currYear && extra_lump_month < currentMonth){
            aux_showEPayError = true;
        }

        this.setState({
            monthlyPayment: monthly_payment_without_extra,
            tableResults: amortizationTable,
            dateToFinish: term_date,
            showResults: true,
            showEPayError: aux_showEPayError,
            mortgageTotals: yearTotals,
            termTotals: termTotals
        }, () => {
            if(this.state.showAmortization){
                this.scrollTo('mortgagePaymentResults');
            }
        });

    }

    calculateCurrentPayment() {

    }

    handleSubmit(e){
        e.preventDefault();
        this.calculateAmortization();
    }

    handleAmortizationAction = () => {
        let aux_showAmortization = this.state.showAmortization;
        aux_showAmortization = !aux_showAmortization;

        this.setState({showAmortization : aux_showAmortization}, () => this.scrollTo('mortgagePaymentResults') );
    }

    handleExtraPaymentFields = () => {
        let auxTableResults = JSON.parse(JSON.stringify(this.state.tableResults));

        let aux_showExtraPayments = this.state.showExtraPayments;
        aux_showExtraPayments = !aux_showExtraPayments;
        if(aux_showExtraPayments){
            this.setState({showExtraPayments : aux_showExtraPayments});
        }else{
            auxTableResults.forEach(row => (row.bg_class = 'trbg-default'));

            this.setState({showExtraPayments : aux_showExtraPayments, extraMonthlyAmount: 0, extra_yearly_amount: 0, extra_lump_amount: 0, tableResults: auxTableResults }, () => {
                this.scrollTo('renderResultTitle');
                this.calculateAmortization();
            });
        }
    }

    handleDateChange = date => {
        this.setState({ startDate: date }, () => { this.calculateAmortization() });
    };

    scrollTo(selector) {
        scroller.scrollTo(selector, {
            duration: 800,
            delay: 0,
            offset: -100,
            smooth: 'easeInOutQuart',
        })
    }

    render() {

        const {amount, downPaymentRate, downPayment, paymentType, interest, years, term, months, translations, extraMonthlyAmount, extra_yearly_amount, extra_lump_amount, extraYearlyMonths, extraLumpMonths, extraLumpYears, mortgageTotals, termTotals, showAmortization} = this.state;
        const {title, btnLabel} = this.props;

        let resultsSectionTitle = translations.monthlyPayments;
        if (paymentType === 'bi-weekly') {
            resultsSectionTitle = translations.biWeeklyPayments;
        }

        return (
            <div className="container loan-calculator-wrapper">

                <div className="row justify-content-center mortgage-form-container">
                    <div className="col-xs-12 col-sm-6 col-lg-5">
                        <h3 className="loan-titles">{title ? title : translations.calculatorTitle}</h3>

                        <form id="mbp-calculator" onSubmit={this.handleSubmit.bind(this)} >

                            <div className="row form-group mt-3">
                                <InputGroup
                                    id='home_price'
                                    label={translations.loanAmount}
                                    name='amount'
                                    value={amount}
                                    icon='$'
                                    iconPosition='left'
                                    tooltipContent={translations.amountHelpText}
                                    errorOccur={(Number(amount) < 1 || Number(amount) > 1000000 || amount === '') ? 1 : 0}
                                    errorMsg={translations.moneyFieldError}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="row no-gutters">
                                <div className="col-12 no-gutters mt-3">
                                    <InputGroup
                                        id="mortgage_term"
                                        icon={translations.yearPluralText}
                                        label={translations.termInYears}
                                        name={translations.yearPluralText}
                                        wrapperClass={'pr-0'}
                                        tooltipContent={translations.dateHelpText}
                                        className={`form-control ${ (years < 1 || years > 100 || years === '') ? 'inputError' : '' }`}
                                        value={years >= 1 ? years : ''}
                                        onChange={this.handleTimeChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <small className={`inputErrorText ${ (years < 1 || years > 100 || years === '' || months < 1 || months > 1200 || months === '') ? 'show' : 'hide' }`}>{translations.timeError}</small>
                                </div>
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

                            <div className="row no-gutters mt-3">
                                <div className="col-sm-7 no-gutters">
                                    <InputGroup
                                        id='downPayment'
                                        label={translations.downPaymentText}
                                        name='downPayment'
                                        value={downPayment}
                                        wrapperClass={'pr-1'}
                                        icon='$'
                                        iconPosition='left'
                                        tooltipContent={translations.downPaymentHelp}
                                        errorOccur={false}
                                        errorMsg={false}
                                        onChange={this.handleDownPayment}
                                    />
                                </div>

                                <div className="col-sm-5 no-gutters">
                                    <InputGroup
                                        id='downPaymentRate'
                                        label={' '}
                                        name='downPaymentRate'
                                        value={downPaymentRate}
                                        wrapperClass={'pl-1'}
                                        icon='%'
                                        iconPosition='left'
                                        tooltipContent={translations.downPaymentRateHelp}
                                        errorOccur={false}
                                        errorMsg={false}
                                        onChange={this.handleDownPayment}
                                    />
                                </div>
                            </div>

                            <div className="row no-gutters">
                                <div className="col-12 no-gutters mt-3">
                                    <InputGroup
                                        id="mortgage_fixed_term"
                                        icon={translations.yearPluralText}
                                        label={translations.termsSummaryLabel}
                                        name={translations.termsSummary}
                                        wrapperClass={'pr-0'}
                                        tooltipContent={translations.termHelpText}
                                        className={`form-control ${ (term < 1 || term > 10 || term === '') ? 'inputError' : '' }`}
                                        value={term >= 1 ? term : ''}
                                        onChange={this.handleTermChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <small className={`inputErrorText ${ (term < 1 || term > 10 || term === '') ? 'show' : 'hide' }`}>{translations.timeError}</small>
                                </div>
                            </div>

                            <div className="row no-gutters mt-3">
                                <div className="btn-group btn-group-toggle col-sm-12" data-toggle="buttons">
                                    <button className={`btn btn-secondary ${paymentType === 'bi-weekly' ? 'active' : ''}`} name="bi-weekly" onClick={this.handlePaymentTypeChange}>{translations.biweeklyText}</button>
                                    <button className={`btn btn-secondary ${paymentType === 'monthly' ? 'active' : ''}`} name="monthly" onClick={this.handlePaymentTypeChange}>{translations.monthlyText}</button>
                                </div>
                            </div>

                            <div className="mt-4 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block"
                                    disabled={ Number(amount)    < 1 || Number(amount)   > 1000000 || amount === ''   ||
                                               Number(years)     < 1 || Number(years)    > 100     || years === ''    ||
                                               Number(months)    < 1 || Number(months)   > 1200    || months === ''   ||
                                               Number(interest) <= 0 || Number(interest) > 100     || interest === '' }
                                >
                                    { btnLabel }
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Showing monthly payment results */}
                    {this.state.showResults && (
                        <div className="mt-3 results-total col-sm-6 col-lg-7 col-xl-5 text-center">
                            <h3 className="loan-titles" id="renderResultTitle">{resultsSectionTitle}</h3>
                            <div className="mp-result mb-5">
                                <div className="mp-dolar-sign">$</div>
                                <div className="mp-dolar-numbers">{Util.formatMoney( Util.roundTo(paymentType === 'bi-weekly' ? this.biWeeklyPayment() : this.monthlyPayment(), 2) )}</div>
                            </div>

                            <div className="text-left">
                                <div className="row">
                                    <div className="col-12">
                                        <h4>{translations.amortizationPeriodSummary}</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-8">{translations.totalPrincipalPaid}</div>
                                    <div className="col-4 text-black">{ '$' + Util.formatMoney( Util.roundTo(amount-downPayment, 2) ) }</div>
                                </div>

                                <hr className="mp-results-line" />

                                <div className="row">
                                    <div className="col-8">{translations.totalInterestPaid}</div>
                                    <div className="col-4 text-black">{'$' + Util.formatMoney( Util.roundTo(mortgageTotals.interestPaid, 2) ) }</div>
                                </div>

                                <hr className="mp-results-line" />

                                { this.state.mortgageTotals.earlyPayments > 0 && (
                                    <div className="row">
                                        <div className="col-8">{translations.totalEarlyPayments}</div>
                                        <div className="col-4 text-black">{'$' + Util.formatMoney( Util.roundTo(mortgageTotals.earlyPayments, 2) ) }</div>
                                    </div>
                                )}
                            </div>

                            <div className="text-left">
                                <div className="row">
                                    <div className="col-12">
                                        <h4>{translations.fixedTermSummary}</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-8">{translations.totalPaid}</div>
                                    <div className="col-4 text-black">{ termTotals.payment }</div>
                                </div>

                                <hr className="mp-results-line" />

                                <div className="row">
                                    <div className="col-8">{translations.totalPrincipalPaid}</div>
                                    <div className="col-4 text-black">{ termTotals.principalPaid }</div>
                                </div>

                                <hr className="mp-results-line" />

                                <div className="row">
                                    <div className="col-8">{translations.totalInterestPaid}</div>
                                    <div className="col-4 text-black">{ termTotals.interestPaid }</div>
                                </div>

                                <hr className="mp-results-line" />

                                { termTotals.earlyPayments > 0 && (
                                    <div className="row">
                                        <div className="col-8">{translations.totalEarlyPayments}</div>
                                        <div className="col-4 text-black">{ '$' + Util.formatMoney( Util.roundTo(termTotals.earlyPayments, 2) ) }</div>
                                    </div>
                                )}
                            </div>
                            <button className="btn loan-btn-go-table" onClick={this.handleAmortizationAction}>
                                {showAmortization ? translations.hideAmortizationBtnText : translations.showAmortizationBtnText }
                                <i className={showAmortization ? "arrow up" : "arrow down"}></i>
                            </button>
                        </div>
                    )}

                    { this.state.showResults && (
                        <div className="col-xs-12 col-xl-10 mt-4 mb-5">
                            <div className="Collapsible">
                                <div className="Collapsible__trigger" onClick={this.handleExtraPaymentFields} >
                                    { this.state.showExtraPayments ?
                                        (<span>{translations.hideExtraPayments} <i className="arrow up"></i></span>) :
                                        (<span>{translations.showExtraPayments} <i className="arrow down"></i></span>)
                                    }
                                </div>

                                <div className={ `container pb-4 Collapsible__contentOuter ${this.state.showExtraPayments ? "is-open" : "is-closed"}` }>
                                    <div className="row">
                                        <div className="col-xs-12 mt-3 mb-3">
                                            <p className="extra-fields-label">{translations.extraPaymentsText1}</p>
                                            {/* <p>Note: <em>Choose one option below or any combination of options</em> to calculate the impact of extra mortgage loan payments. If you fill in all of the options, the amounts shown will be recalculated with the assumption you are choosing to use all three repayment options together.</p> */}
                                        </div>
                                    </div>
                                    <div className="row form-group no-gutters extra-payments-row trbg-lblue">
                                        <Tooltip content={ translations.extraPaymentHelp1 } />
                                        <div className="col-md-3">
                                            <InputGroup
                                                id='extraMonthlyAmount'
                                                name='extraMonthlyAmount'
                                                value={extraMonthlyAmount}
                                                icon='$'
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-sm-8 p-15">
                                            <label htmlFor="extraMonthlyAmount" className="extra-fields-label dark-label">{translations.extraPaymentLabel1}</label>
                                        </div>
                                    </div>
                                    <div className="row form-group no-gutters extra-payments-row mt-4 trbg-lsky">
                                        <Tooltip content={ translations.extraPaymentHelp2 } />
                                        <div className="col-md-3">
                                            <InputGroup
                                                id='extra_yearly_amount'
                                                name='extra_yearly_amount'
                                                value={extra_yearly_amount}
                                                icon='$'
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6 p-15">
                                            <label htmlFor="extra_yearly_amount" className="extra-fields-label dark-label">{translations.extraPaymentLabel2}</label>
                                        </div>
                                        <div className="col-md-3">
                                            <Dropdown
                                                name="extraYearlyMonths"
                                                list={extraYearlyMonths}
                                                handleBPSelect={this.handleBPSelect}
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group no-gutters extra-payments-row mt-4 trbg-lgreen">
                                        <Tooltip content={ translations.extraPaymentHelp3 } />
                                        <div className="col-md-3">
                                            <InputGroup
                                                id='extra_lump_amount'
                                                name='extra_lump_amount'
                                                value={extra_lump_amount}
                                                icon='$'
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4 p-15">
                                            <label htmlFor="extra_lump_amount" className="extra-fields-label dark-label">{translations.extraPaymentLabel3}</label>
                                        </div>
                                        <div className="col-md-3">
                                            <Dropdown
                                                name="extraLumpMonths"
                                                list={extraLumpMonths}
                                                handleBPSelect={this.handleBPSelect}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Dropdown
                                                name="extraLumpYears"
                                                list={extraLumpYears}
                                                handleBPSelect={this.handleBPSelect}
                                            />
                                        </div>
                                    </div>

                                    <div className={ `row form-group no-gutters ${this.state.showEPayError ? 'show' : 'hide'}` }>
                                        <div className="col-xs-12 text-right">
                                            <small className="inputErrorText">{translations.extraLumpError}</small>
                                        </div>
                                    </div>

                                    <div className="row form-group no-gutters extra-payments-row mt-3">
                                        <div className="col-xs-12 offset-lg-4 col-sm-12 col-lg-8">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-block btn-extra-fields"
                                                onClick={this.calculateAmortization}
                                                disabled={ Number(amount)    < 1 || Number(amount)   > 1000000 || amount === ''   ||
                                                Number(years)     < 1 || Number(years)    > 100     || years === ''    ||
                                                Number(months)    < 1 || Number(months)   > 1200    || months === ''   ||
                                                Number(interest) <= 0 || Number(interest) > 100     || interest === '' }
                                            >
                                                {translations.addExtraBtnTitle}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {this.state.showResults && this.state.showAmortization && (
                    <div id="mortgagePaymentResults">
                        <div className="row form-group mb-3">
                            <div className="col-xs-12 col-sm-6">
                                <label htmlFor="loan-start-date" className="loan-label">
                                    <Tooltip content={ translations.startDateHelpText } /> {translations.startDateText} *
                                </label>

                                <DatePicker
                                    id="loan-start-date"
                                    className="form-control"
                                    locale={this.state.lan} //could be "es"
                                    minDate={new Date()}
                                    maxDate={Util.getEndLimitDate(90)}
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    isClearable
                                    placeholderText={translations.selectDatePlaceholder}
                                />
                                <small><i>{translations.dateHelpMessage}</i></small>
                            </div>

                            <div className={this.state.startDate ? 'col-xs-12 col-sm-6 text-right' : 'hide' }>
                                <div className="pr-4">
                                    <h3 className="loan-titles">{translations.estimatedPayoffDate}</h3>
                                    <div className="end-date-result">
                                        { translations.fullMonths[this.state.dateToFinish.getMonth()]+' '+this.state.dateToFinish.getDate()+', '+this.state.dateToFinish.getFullYear() }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-8 relative-loan-wrapper"><Tooltip content={ translations.amortizationTableHelp } />
                                <h3>{ translations.amortizationSchedule }</h3>
                            </div>
                            <div className="col-sm-4">
                                <div className="with-extrapayment-text">
                                    { (this.state.extraMonthlyAmount || this.state.extra_yearly_amount || this.state.extra_lump_amount) ? translations.withExtraPayments : translations.withoutExtraPayments }
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive scrolling-table underlined-tbody">
                            { this.state.startDate && <Table columns={this.state.tableColumns} data={this.state.tableResults} /> }
                        </div>
                        <p className={this.state.startDate ? 'hide' : 'show' }>{ translations.startingDateEmptyText }</p>

                    </div>
                )}

            </div>
        );

    }//End of render

}
export default App;
