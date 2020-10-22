import React from 'react';
import Util from "./Utils";
import getTranslations from './language';
import getRates from './rates';
import getLoanTypes from './loanTypes';
import InputGroup from './components/inputGourp';
import Table from './components/table.jsx'
import Tooltip from './components/tooltip.jsx';
import _ from 'underscore';

import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);

        const region = props.region ? props.region : 'us';
        const lan = props.lan ? props.lan : 'en';

        const languages = getTranslations(lan);
        const loanTypes = getLoanTypes(region, lan);

        this.state = {
            region,
            lan,
            translations : languages,
            title: props.title,

            amount: '-',
            deposit: '0',
            interest: 0,
            years: '-',
            loanTypes,
            ficoRates: [],
            showResults : false,
            tableHeadings : [
                languages.ficoScoreLabel,
                languages.aprLabel,
                languages.monthlyPaymentLabel,
                languages.totalInterestLabel,
                languages.amountSavedLabel,
            ],
            tableResults : [],
            loading: false,
            formLoanType: 0,
            formFicoRate: 0,
            formPrincipalAmount: 1
        };

    }//End of Constructor

    componentDidMount() {
        this.setState({formLoanType: _.first(this.state.loanTypes).id}, () => {
            const currentLoanRates = this.getCurrentLoanRates();
            this.setState({formFicoRate: _.first(currentLoanRates).value});
        });
    }

    getCurrentLoanRates() {

        const rates = getRates(this.state.region);
        let currentLoanType = this.state.loanTypes.filter(item => item.id === this.state.formLoanType)[0].id;
        let currentLoanRates = _.map(rates[currentLoanType].rates, (rate, title) => {
            return {
                title: title,
                value: rate
            }
        });

        this.setState({ficoRates: currentLoanRates});
        this.setState({formFicoRate: _.first(currentLoanRates).value});


        return currentLoanRates;
    }

    handleAmountChange = (properties) => {
        let boxModel = {...this.state};
        boxModel[properties.name] = properties.value;

        let inputValue = properties.value;
        inputValue = Math.min(Number(inputValue), 1000000);

        this.setState({formPrincipalAmount: inputValue});
    }

    handleSelectChange = fieldName => e => {
        const {value} = e.target;
        this.setState({[fieldName]: value}, () => {
            if (fieldName !== 'formFicoRate') {
                this.getCurrentLoanRates();
            }
        });
    }

    handleSubmit(e){
        e.preventDefault();
        //
        const loanTerm = this.state.loanTypes.filter(item => item.id === this.state.formLoanType)[0].value;
        const ficoRate = Number(this.state.formFicoRate);
        const principalAmount = Number(this.state.formPrincipalAmount);
        const {ficoRates} = this.state;

        const user_monthly_payment = pmt(ficoRate,(loanTerm*12),principalAmount);
        const user_total_interest = (user_monthly_payment * (loanTerm * 12)) - principalAmount;

        let aux_tableResults = [];
        _.each(ficoRates, (rate) => {
            const monthlyPayment = pmt(rate.value, loanTerm*12, principalAmount);
            const totalInterest = (monthlyPayment * (loanTerm * 12)) - principalAmount;
            const amountSaved = totalInterest - user_total_interest;

            let suffix = amountSaved < 0 ? this.state.translations.calc_saved : this.state.translations.calc_added;

            aux_tableResults.push({
                rate: rate.title,
                apr: `${rate.value}%`,
                pmt: '$' + Util.formatMoney( Util.roundTo(monthlyPayment, 2) ),
                total_interest: '$' + Util.formatMoney( Util.roundTo(totalInterest, 2) ),
                amount_saved: `$ ${Util.formatMoney( Util.roundTo(amountSaved, 2) )} ${suffix}`,
            });
        });

        this.setState({
            showResults: true,
            tableResults: aux_tableResults
        });

    }

    submitButtonStatus() {
        const {formPrincipalAmount} = this.state;

        return (Number(formPrincipalAmount) < 1 || Number(formPrincipalAmount) > 1000000 || formPrincipalAmount === '')
    }

    render() {
        const {formPrincipalAmount, ficoRates, loanTypes, translations} = this.state;
        const {title, btnLabel} = this.props;

        return (
            <div className="container credit-score-calculator-wrapper">

                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-12">
                        {title && (<h2 className="text-center mb-4">{title}</h2>)}
                        <form id="simple-savings-calculator" onSubmit={this.handleSubmit.bind(this)} >

                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor='loan_type' className="col-form-label">
                                            <Tooltip content={translations.help_loan_type}/>
                                            {`${translations.loanType}:`}
                                        </label>

                                        <div className="">
                                            <select
                                                id='loan_type'
                                                name='loanType'
                                                value={this.state.formLoanType}
                                                onChange={this.handleSelectChange('formLoanType')}
                                                className='form-control'
                                                aria-controls="loanType"
                                            >
                                                { loanTypes.map( item => <option key={item.id} value={item.id} >{item.title}</option>) }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <InputGroup
                                        id='principal_amount'
                                        label={`${translations.principalAmount}:`}
                                        name='formPrincipalAmount'
                                        icon='$'
                                        value={this.state.formPrincipalAmount}
                                        showTooltip={true}
                                        tooltipContent={translations.help_principal_amount}
                                        errorOccur={(Number(formPrincipalAmount) < 1 || Number(formPrincipalAmount) > 1000000 || formPrincipalAmount === '') ? 1 : 0}
                                        errorMsg={translations.moneyFieldError}
                                        aria-controls="principalAmount"
                                        onChange={this.handleAmountChange}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor='fico_score' className=" col-form-label">
                                            <Tooltip content={translations.help_fico_core}/>
                                            {`${translations.ficoScoreLabel}:`}
                                        </label>

                                        <div className="">
                                            <select
                                                id='fico_score'
                                                name='ficoScore'
                                                value={this.state.formFicoRate}
                                                className='form-control'
                                                aria-controls="ficoScore"
                                                onChange={this.handleSelectChange('formFicoRate')}
                                            >
                                                { ficoRates.map( (item, index) => <option key={index} value={item.value} >{item.title}</option>) }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3">
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-block"
                                            disabled={ this.submitButtonStatus() ? 'disabled' : false }
                                        >
                                            { btnLabel }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                { this.state.showResults && (<div className="row">
                    <div className="col-lg-12 mt-3">
                        <div id="paymentResults">
                            <div className="table-responsive scrolling-table underlined-tbody">
                                <Table headings={this.state.tableHeadings} data={this.state.tableResults} />
                            </div>
                        </div>
                    </div>
                </div>)}

                <div className="col-sm-12 col-lg-12 disclaimer">
                    <p>*{this.state.translations.help_general}</p>
                </div>

            </div>
        );
    }

}

function pmt(rate, loanLength, loanAmount) {
    const apr =  rate/1200;
    return (apr * -loanAmount * Math.pow((1 + apr), loanLength) / (1 - Math.pow((1 + apr), loanLength)));
}


export default App;
