import React, { Component } from 'react';
import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import Table from './components/table.jsx'

import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        const languages = getTranslations(props.lan);
        this.state = {
            lan : props.lan,
            translations : languages,

            amount: 5000,
            years: 3,
            months: 36,
            interest: 3,
            tableColumns : [
                languages.yearPluralTextCaipal,
                languages.payments,
                languages.balance,
                languages.payments+' ',
                languages.balance+' ',
            ],
            showResults  : false,
            mainResults  : {},
            tableResults : [],
            moneySaved: 0,
            loading: false,
        };

    }//End of Constructor


    handleChange = (properties) => {
        let boxModel = {...this.state};
        boxModel[properties.name] = properties.value;

        this.setState(boxModel);
    }

    handleTimeChange = (e) => {
        const {name, value} = e.target;
        let int_val = Math.trunc(value);
        let time_value = 0;
        if(name === 'years') {
            time_value = Util.calculateMonthsYears(int_val, false);
            this.setState( {years: int_val, months: time_value} );
        }else{
            time_value = Util.calculateMonthsYears(int_val);
            let rest = time_value - Math.floor(time_value);
            let str_number = time_value.toString();
            if(rest === 0){
                str_number = str_number.split(".")[0];
            }
            this.setState( {months: int_val, years: str_number} );
        }
    }

    keyUpHandlerTime = (e) => {
        const {name, value} = e.target;
        let int_val = Math.trunc(value);
        this.setState( {[name]: int_val} );
        console.log('Name: '+name+', Value: '+int_val);
    }

    handleSubmit(e){
        e.preventDefault();

        const lan      = this.state.lan;
        const amount   = Number(this.state.amount);
        const interest = Number(this.state.interest);
        const months   = Number(this.state.months);

        let monthly_interest = interest / 100 / 12;
        let biweekly_interest = interest / 100 / 26;

        let monthly_payment = ( (monthly_interest * amount ) * Math.pow(1 + monthly_interest, months) ) / ( Math.pow((1+monthly_interest), months ) - 1 );

        monthly_payment = Util.roundTo(monthly_payment, 2);
        let biweekly_payment = Util.roundTo(monthly_payment / 2, 2);

        let monthly_payment_orig = '$' + Util.formatMoney(monthly_payment);
        let biweekly_payment_orig = '$' + Util.formatMoney(biweekly_payment);

        let total_interest_monthly = 0;
        let total_interest_biweekly = 0;
        let total_monthly = amount;
        let total_biweekly = amount;

        let num_monthly_payments = 0;
        let num_biweekly_payments = 0;
        let total_monthly_payment = 0;
        let interest_paid = 0;
        let principal_paid = 0;
        let year = 0;
        let total_biweekly_payment = 0;
        let aux_tableResults = [];
        for(let x = 0; x < months/12; x++) {
            year = x+1;

            total_monthly_payment = 0;
            for(let y = 1; y <= 12; y++){
                if(total_monthly <= 0){
                    break;
                }
                interest_paid = Number(total_monthly) * Number(monthly_interest);
                total_interest_monthly += Number(interest_paid);
                principal_paid = Number(monthly_payment) - Number(interest_paid);

                if(total_monthly < principal_paid){
                    principal_paid = total_monthly;
                    monthly_payment = Number(principal_paid) + Number(interest_paid);
                }

                total_monthly -= Number(principal_paid);
                total_monthly_payment += Number(monthly_payment);
                num_monthly_payments++;
            }

            total_biweekly_payment = 0;
            for(let y = 1; y <= 26; y++){
                if(total_biweekly <= 0){
                    break;
                }
                interest_paid = Number(total_biweekly) * Number(biweekly_interest);
                total_interest_biweekly += Number(interest_paid);
                principal_paid = Number(biweekly_payment) - Number(interest_paid);

                if(total_biweekly < principal_paid){
                    principal_paid = total_biweekly;
                    biweekly_payment = Number(principal_paid) + Number(interest_paid);
                }

                total_biweekly -= Number(principal_paid);
                total_biweekly_payment += Number(biweekly_payment);
                num_biweekly_payments++;
            }

            aux_tableResults.push({
                years: year,
                total_b_payment: '$' + Util.formatMoney( Util.roundTo(total_biweekly_payment, 2) ),
                total_biweekley: '$' + Util.formatMoney( Util.roundTo(total_biweekly, 2) ),
                total_m_payment: '$' + Util.formatMoney( Util.roundTo(total_monthly_payment, 2) ),
                total_monthly:   '$' + Util.formatMoney( Util.roundTo(total_monthly, 2) ),
            });
        }

        let biweekly_years = Math.floor(num_biweekly_payments / 26);
        let biweekly_months = num_biweekly_payments % 26;

        if(biweekly_months === 0){
            biweekly_months = '';
        }else if(biweekly_months === 13){
            biweekly_months = 6;
        }else if(biweekly_months < 13 && biweekly_months > 7){
            biweekly_months = Math.floor(biweekly_months -1 );
        }else{
            biweekly_months = Math.floor((biweekly_months - 1) / 2);
        }

        let biweekly_term = '';
        if(lan === 'es'){
            biweekly_term = (biweekly_years ? (biweekly_years+' año'+(biweekly_years > 1 ? 's' : '')) : '')+(biweekly_months && biweekly_years ? ' ' : '')+(biweekly_months ? biweekly_months+' mes'+(biweekly_months > 1 ? 'es' : '') : '');
        }else if(lan === 'fr'){
            biweekly_term = (biweekly_years ? (biweekly_years+' année'+(biweekly_years > 1 ? 's' : '')) : '')+(biweekly_months && biweekly_years ? ' ' : '')+(biweekly_months ? biweekly_months+' mois' : '');
        }else{
            biweekly_term = (biweekly_years ? (biweekly_years+' year'+(biweekly_years > 1 ? 's' : '')) : '')+(biweekly_months && biweekly_years ? ' ' : '')+(biweekly_months ? biweekly_months+' month'+(biweekly_months > 1 ? 's' : '') : '');
        }

        const savings = total_interest_monthly - total_interest_biweekly;
        const auxMainResults = {
            b_payment_orig   : biweekly_payment_orig,
            total_interest_b : '$' + Util.formatMoney( Util.roundTo(total_interest_biweekly, 2) ),
            biweekly_term    : biweekly_term, //Util.getDateFromNumberOfMonths( biweekly_months, lan),

            m_payment_orig   : monthly_payment_orig,
            total_interest_m : '$' + Util.formatMoney( Util.roundTo(total_interest_monthly, 2) ),
            monthly_term     : Util.getDateFromNumberOfMonths( num_monthly_payments, lan)
        };

        this.setState({
            loading : false,
            showResults: true,
            moneySaved: '$' + Util.formatMoney( Util.roundTo(savings, 2)),
            mainResults : auxMainResults,
            tableResults: aux_tableResults
        });
    }

    renderResults = (colors) => {
        const {mainResults, translations} = this.state;

        return (
            <div className="row justify-content-center no-gutters mbp-results text-center">
                <div className="col-xs-12 col-sm-6 p-1" id="dmp_block">
                    <div className="card mb-4 shadow">
                        <div className="card-header bg-color-blue"><h4>{translations.biweeklyText} {translations.paymentLower}</h4></div>
                        <div className="card-subheader bg-color-lightblue"><h5><span>{mainResults['b_payment_orig']}</span> / {translations.biweeklyLowerText}</h5></div>
                        <div className="card-intro">
                            <small>{translations.TimeToRepayText}:</small>
                            <div className="card-results">{mainResults['biweekly_term']}</div>
                        </div>
                        <div className="card-body">
                            <small>{translations.totalInterestText}:</small>
                            <div className="card-results">{mainResults['total_interest_b']}</div>
                        </div>
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6 p-1" id="not_dmp_block">
                    <div className="card mb-4">
                        <div className="card-header bg-color-gray narrow-padding"><h4>{translations.monthlyText} {translations.paymentLower}</h4></div>
                        <div className="card-subheader bg-color-lightgray pb-1"><span>{mainResults['m_payment_orig']}</span> / {translations.monthly}</div>
                        <div className="card-intro" id="savings_Time_block">
                            <small>{translations.TimeToRepayText}:</small>
                            <div id="savings_Time" className="card-results">{mainResults['monthly_term']}</div>
                        </div>
                        <div className="card-body">
                            <small>{translations.totalInterestText}:</small>
                            <div id="savings_fees" className="card-results">{mainResults['total_interest_m']}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {amount, interest, years, months, translations} = this.state;
        const {title, btnLabel, colors} = this.props;
        return (
            <div className="container mbp-calculator-wrapper">

                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-7 col-md-5 col-lg-4">
                        <h2 className="mb-0">{title}</h2>

                        <form id="mbp-calculator" onSubmit={this.handleSubmit.bind(this)} >

                            <InputGroup
                                id='biweekly_amount'
                                label={translations.loanAmount}
                                name='amount'
                                value={amount}
                                icon='$'
                                iconPosition='left'
                                errorOccur={(Number(amount) < 1 || Number(amount) > 1000000 || amount === '') ? 1 : 0}
                                errorMsg={translations.moneyFieldError}
                                onChange={this.handleChange}
                            />

                            <div className="row no-gutters">
                                <div className="col-6 form-group mt-3">
                                    <label htmlFor="biweekly_years" className="biweekly-label">{translations.termInYears}</label>
                                    <div className="pr-2">
                                        <input
                                            id = "biweekly_years"
                                            name = "years"
                                            className = {`form-control ${ (years < 1 || years > 100 || years === '') ? 'inputError' : '' }`}
                                            value = {years >= 1 ? years : ''}
                                            onChange = {this.handleTimeChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-6 form-group mt-3">
                                    <label htmlFor="biweekly_months" className="biweekly-label pl-1">{translations.termInMonths}</label>
                                    <div className="pl-1">
                                        <input
                                            id = "biweekly_months"
                                            name = "months"
                                            className = {`form-control ${ (months < 1 || months > 1200 || months === '') ? 'inputError' : '' }`}
                                            value = {months >= 1 ? months : ''}
                                            onChange = {this.handleTimeChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <small className={`inputErrorText ${ (years < 1 || years > 100 || years === '' || months < 1 || months > 1200 || months === '') ? 'show' : 'hide' }`}>{translations.timeError}</small>
                                </div>
                            </div>

                            <InputGroup
                                id='ssc_interest'
                                label={translations.interestLabel}
                                name='interest'
                                value={interest}
                                icon='%'
                                iconPosition='right'
                                tooltipContent={translations.interestRateHelpText}
                                errorOccur={(Number(interest) <= 0 || Number(interest) > 100 || interest === '') ? 1 : 0}
                                errorMsg={translations.percentageFieldError}
                                onChange={this.handleChange}
                            />

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

                    <div className="mt-4 col-sm-12 col-md-7 col-lg-8 text-center" style={{display: this.state.loading || this.state.showResults ? 'block' : 'none' }} >
                        {this.state.showResults && this.renderResults(colors)}
                    </div>
                </div>{/* End of row */}

                <div id="paymentResults" style={{display: this.state.showResults ? 'block' : 'none' }} >
                    <p className="inWordsResults">
                        <strong>Summary:</strong> When picking the Bi-weekly option you are splitting your anual 12 payments to 26 bi-weekly payments. Which means in your case you will pay off your loan in <i>{this.state.mainResults.biweekly_term}</i> instead of the current <i>{this.state.mainResults.monthly_term}</i>. In essence, you are saving yourself <i>{this.state.moneySaved}</i> in loan interest.
                    </p>

                    <h3>{this.state.translations.tableResultsTitle}</h3>
                    <div className="table-responsive scrolling-table underlined-tbody">
                        <Table
                            hparam1={translations.biweeklyText+' '+translations.paymentLower}
                            hparam2={translations.monthlyText+' '+translations.paymentLower}
                            columns={this.state.tableColumns}
                            data={this.state.tableResults}
                        />
                    </div>
                </div>

            </div>
        );

    }//End of render

}
export default App;