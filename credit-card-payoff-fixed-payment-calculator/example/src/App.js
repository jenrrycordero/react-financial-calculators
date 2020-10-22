import React, { Component } from 'react'
import Parser from 'html-react-parser'
import axios from 'axios'
import Util from './Utils'
import getTranslations from './language'
import Table from './components/table.jsx'
import Tooltip from './components/tooltip.jsx'
import NumberFormat from 'react-number-format';
import { scroller } from 'react-scroll'

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        const languages = getTranslations(props.lan);
        this.renderResults = this.renderResults.bind(this);

        this.renderCard = this.renderCard.bind(this);
        this.state = {
            lan : props.lan,
            currentBalance : '',
            currentBalanceEmpty : 0,
            apr: 1,
            aprEmpty : 0,
            balancePercentage : 3,
            minimumPayment : '',
            fixedPayment: '',
            translations : languages,
            showResults : false,
            showTableResults: false,
            tableColumns : [
                languages.monthtext,
                languages.minimumPaymentText,
                languages.principalPaidText,
                languages.interestPaidText,
                languages.remainingBalanceText,
                languages.totalInterestText,
            ],
            tableResults : [],
            tableFixedPaymentResults: [],
            debtManagementResults : [],
            phoneNumber : props.phoneNumber,
            apiError : false,
            fixedApiError: false,
            loading: false,
            paymentType: 'minim'
        };
    }//End of Constructor

    scrollTo(selector) {
        scroller.scrollTo(selector, {
            duration: 800,
            delay: 0,
            offset: -100,
            smooth: 'easeInOutQuart',
        })
    }

    handleChange (e) {
        const {name, value} = e.target;

        const val_percent = (name === 'apr') ? Util.percentToValue(value) : value;
        const parsedValue = (name === 'currentBalance' || name === 'fixedPayment') ? Util.moneyToValue(val_percent, true) : val_percent;


        let auxForm = {...this.state};
        auxForm[name] = parsedValue;

        auxForm.tableResults = [];
        auxForm.showResults = false;
        auxForm.showTableResults = false;

        this.setState(auxForm, () => { this.calculateMinimumPayment() } );
    }

    changeFixedPayment(e) {
        const {name, value} = e.target;
        const parsed_value = value.replace(/\,/g, "");

        this.setState({
            tableResults: [],
            showResults: false,
            showTableResults: false,
            [name]: parseFloat(parsed_value)
        }, () => { this.calculateMinimumPayment() } );
    }


    calculateMinimumPayment(){
        const { currentBalance, balancePercentage } = this.state;
        const result = (currentBalance * balancePercentage / 100);

        this.setState({minimumPayment : result});
    }

    handleSubmit(e){
        e.preventDefault();
        const {currentBalance, apr, balancePercentage, minimumPayment, fixedPayment, paymentType} = this.state;

        if(!minimumPayment){
            return;
        }

        let fixedPaymentAttr = 25;

        if (paymentType === 'fixed') {
            fixedPaymentAttr = fixedPayment;
        }

        const apiUrl = 'https://calculator-api-bk.debt.com/api/v1';
        let checkInfinityPaymentUrl = apiUrl + '/validatePayments/' + currentBalance + '/' + apr + '/' + balancePercentage + '/' + 25;
        const paymentScheduleUrl = apiUrl + '/getPayments/' + currentBalance + '/' + apr + '/' + balancePercentage + '/' + 25;
        const fixedPaymentScheduleUrl = apiUrl + '/getPayments/' + currentBalance + '/' + apr + '/' + balancePercentage + '/' + fixedPaymentAttr;

        const debtManagementURL = apiUrl + '/debtmanagement/'+ currentBalance + '/8/1';

        this.setState({loading : true}, ()=>{
            axios.get(checkInfinityPaymentUrl)
                .then(({data}) => {

                    if(!data.payments){
                        this.setState({
                            tableResults: [],
                            tableFixedPaymentResults: [],
                            debtManagementResults: [],
                            showResults: true,
                            apiError: true,
                            loading : false
                        });
                    }
                    else {
                        axios.all([
                            axios.get(paymentScheduleUrl),
                            axios.get(debtManagementURL),
                            axios.get(fixedPaymentScheduleUrl),
                        ])
                        .then(axios.spread((paymentSchedule, debtManagement, fixedPaymentManagement) => {

                            let phones_found = this.state.phoneNumber;
                            if(document.getElementsByClassName('tracking-phone').length){
                                phones_found = document.getElementsByClassName('tracking-phone')[0].innerText;
                            }else{
                                if(document.getElementsByClassName('ShowPhoneNumber').length){
                                    phones_found = document.getElementsByClassName('ShowPhoneNumber')[0].innerText;
                                }
                            }
                            if(document.getElementsByClassName('notracking-phone-click').length){
                                phones_found = document.getElementsByClassName('notracking-phone-click')[0].innerText;
                            }

                            this.setState({
                                tableResults: paymentSchedule.data,
                                debtManagementResults: debtManagement.data,
                                tableFixedPaymentResults: fixedPaymentManagement.data,
                                showResults: true,
                                apiError: false,
                                loading : false,
                                phoneNumber: phones_found
                            });

                        }))
                        .catch((e) => {
                            //In case of Ex.: "Non Reachable Server"
                            console.log(e);
                            this.setState({ tableResults: [], debtManagementResults: [], showResults: false, loading : false });
                        });
                    }

                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ tableResults: [], debtManagementResults: [], showResults: false, loading : false });
                    return { success: false };
                });

            checkInfinityPaymentUrl = apiUrl + '/validatePayments/' + currentBalance + '/' + apr + '/' + balancePercentage + '/' + fixedPaymentAttr;

            if (paymentType === 'fixed') {
                axios.get(checkInfinityPaymentUrl)
                    .then(({data}) => {

                        if (!data.payments) {
                            this.setState({
                                tableResults: [],
                                tableFixedPaymentResults: [],
                                debtManagementResults: [],
                                showResults: true,
                                fixedApiError: true,
                                loading: false
                            });
                        } else {
                            axios.all([
                                axios.get(debtManagementURL),
                                axios.get(fixedPaymentScheduleUrl),
                            ])
                                .then(axios.spread((debtManagement, fixedPaymentManagement) => {

                                    let phones_found = this.state.phoneNumber;
                                    if(document.getElementsByClassName('tracking-phone').length){
                                        phones_found = document.getElementsByClassName('tracking-phone')[0].innerText;
                                    }else{
                                        if(document.getElementsByClassName('ShowPhoneNumber').length){
                                            phones_found = document.getElementsByClassName('ShowPhoneNumber')[0].innerText;
                                        }
                                    }
                                    if(document.getElementsByClassName('notracking-phone-click').length){
                                        phones_found = document.getElementsByClassName('notracking-phone-click')[0].innerText;
                                    }

                                    this.setState({
                                        debtManagementResults: debtManagement.data,
                                        tableFixedPaymentResults: fixedPaymentManagement.data,
                                        showResults: true,
                                        fixedApiError: false,
                                        loading: false,
                                        phoneNumber: phones_found
                                    });

                                }))
                                .catch((e) => {
                                    //In case of Ex.: "Non Reachable Server"
                                    console.log(e);
                                    this.setState({debtManagementResults: [], showResults: false, loading: false});
                                });
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            tableResults: [],
                            debtManagementResults: [],
                            showResults: false,
                            loading: false
                        });
                        return {success: false};
                    });
            }

            this.scrollTo('ccpayoffResults');
        });
    }

    renderResults(colors){
        const {lan, tableResults, translations, minimumPayment, apiError, loading} = this.state;
        let results = '';

        let payment = minimumPayment;

        if(tableResults.length){
            const lastRow = tableResults[ tableResults.length - 1 ];
            const months = lastRow.month;

            let today = new Date();
            today.setMonth(today.getMonth() + months);

            let stringResult = Util.getDateFromNumberOfMonths(months, lan);
            stringResult += ' ('+months+' '+translations.paymentText+')';

            results = (
                <div>
                    <h5>{translations.resultsMinimumPaymentHeader}</h5>
                    <div>{this.translationsStringReplace({
                        'term': `<span class="months-amount">${stringResult}</span>`,
                        'amount': `<div class="payment-amount">${Util.moneyValue(lastRow.totalInterest, true)}</div>`
                    }, translations.resultsFixedPaymentContent)}</div>
                </div>
            );
        }
        else {
            if(apiError){
                results = !loading && (
                    <div className="alert alert-warning shadowBox" role="alert">
                        {translations.apiErrorText1}
                        <strong>{Util.moneyValue(payment)}</strong>
                        {translations.apiErrorText2}
                    </div>
                );
            }
        }

        return results;
    }

    renderFixedPaymentResults() {
        const {lan, tableFixedPaymentResults, translations, paymentType, fixedPayment, apiError, fixedApiError, loading} = this.state;
        let results = '';

        let payment = fixedPayment;

        if (tableFixedPaymentResults.length){
            const lastRow = tableFixedPaymentResults[ tableFixedPaymentResults.length - 1 ];
            const months = lastRow.month;

            let today = new Date();
            today.setMonth(today.getMonth() + months);

            let stringResult = Util.getDateFromNumberOfMonths(months, lan);
            stringResult += ' ('+months+' '+translations.paymentText+')';

            results = (
                <div>
                    <h5>{this.state.translations.resultsFixedPaymentHeader} <span className="monthly-payment">{Util.moneyValue(payment, true)}</span></h5>
                    <div>{this.translationsStringReplace({
                        'term': `<span class="months-amount">${stringResult}</span>`,
                        'amount': `<div class="payment-amount">${Util.moneyValue(lastRow.totalInterest, true)}</div>`
                    }, translations.resultsFixedPaymentContent)}</div>
                </div>
            );
        }
        else {
            if (apiError && fixedApiError && paymentType === 'fixed') {
                return false;
            }
            if (fixedApiError){
                results = !loading && (
                    <div className="alert alert-warning shadowBox" role="alert">
                        {translations.apiErrorText1}
                        <strong>{Util.moneyValue(payment)}</strong>
                        {translations.apiErrorText2}
                    </div>
                );
            }
        }

        return results;
    }

    renderSpiner(){
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        );
    }

    renderCard(params){
        let cardBody = '';
        let lastMessage = '';
        const {currentBalance, debtManagementResults} = this.state;
        const {cardContent, btnLabel, btnUrl, openModal, phoneMessage} = params;

        let btn = '';
        if(btnUrl !== '' && btnLabel !== ''){
            btn = openModal ? <a href={btnUrl} data-toggle="modal" className='btn btn-primary ctaCCPayOff'>{btnLabel}</a> : <a href={btnUrl} className='btn btn-primary ctaCCPayOff'>{btnLabel}</a>;
        }

        if(debtManagementResults.defaultPayment.length){
            const monthlyPayments = Util.moneyValue(debtManagementResults.totalMonthlyPayment, true);
            const totalPayment = Util.moneyValue(debtManagementResults.totalAmountPaid, true);
            cardBody = Parser(Util.parseCardContent(cardContent, currentBalance, monthlyPayments, totalPayment, debtManagementResults.numberOfMonths, debtManagementResults.totalInterestPaid, this.state.phoneNumber));
            lastMessage = Parser(Util.parseCardContent(phoneMessage, currentBalance, monthlyPayments, totalPayment, debtManagementResults.numberOfMonths, debtManagementResults.totalInterestPaid, this.state.phoneNumber));
        }

        const card = (
            <div className="cardDidYouKnowContainer">
                { cardBody }
                {btn}
                <p>{lastMessage}</p>
            </div>
        );
        return card;
    }

    handleOptionChange = (event) => {
        const {value} = event.target;

        this.setState({
            tableResults: [],
            showResults: false,
            showTableResults: false,
            paymentType: value
        });
    }

    translationsStringReplace(keys, translation) {
        let newTranslation = translation;
        Object.keys(keys).forEach((key) =>  {
            newTranslation = newTranslation.replace(`##${key}##`, keys[key])
        });

        let result = {__html: newTranslation};

        return (<div dangerouslySetInnerHTML={result}></div>);
    }


    render() {
        //Style's class initializations:
        const inputIconBalanceError = (this.state.minimumPayment === 0 || this.state.currentBalance > 1000000) ? 'inputIconError' : '';
        const inputIconBalanceClasses = 'input-group-text '+inputIconBalanceError;
        const balanceHelpText = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'inputHelpText hide' : 'inputHelpText';
        const inputBalanceError = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'inputError' : '';
        const inputBalanceErrorClasses = 'form-control '+inputBalanceError;
        const inputBalanceTextError = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'show' : 'hide';
        const inputBalanceTextErrorClasses = 'inputErrorText '+inputBalanceTextError;

        const inputIconAPRError = !this.state.apr ? 'inputIconError' : '';
        const inputIconAPRClasses = 'input-group-text '+inputIconAPRError;
        const inputAPRError = !this.state.apr ? 'inputError' : '';
        const inputAPRErrorClasses = 'form-control '+inputAPRError;
        const inputAPRTextError = !this.state.apr ? 'show' : 'hide';
        const inputAPRTextErrorClasses = 'inputErrorText '+inputAPRTextError;

        const {title, showCard, colors} = this.props;

        return (
            <div className="container ccpayoff-calculator-wrapper">
                <div className="row justify-content-center">
                    <div className="col-lg-6">

                        <div className="card shadowBox">
                            <div className="card-header" style={{background: colors.card_header_BgC }} role="tab" id="heading-CCPayOff">
                                <h2 className="mb-0" style={{color: colors.card_header_FontC}} >{title}</h2>
                            </div>

                            <div className="card-body" style={{ color: colors.card_content_FontC, background: colors.card_content_BgC }}>
                                {/* Form begins here */}
                                <form id="credit-card-payoff-calculator" className="" onSubmit={this.handleSubmit.bind(this)} >

                                    <div className="mb-3">

                                        <label htmlFor="current_balance">
                                            <Tooltip className="" content={this.state.translations.currentBalanceTooltip} />
                                            {this.state.translations.currentBalanceLabel}
                                        </label>

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className={inputIconBalanceClasses}>$</span>
                                            </div>
                                            <NumberFormat
                                                className={inputBalanceErrorClasses}
                                                name="currentBalance"
                                                id="current_balance"
                                                value={this.state.currentBalance}
                                                onChange={this.handleChange.bind(this)}
                                                placeholder="Ex: 1000"
                                                thousandSeparator={true}
                                                allowNegative={false}
                                            />
                                        </div>
                                        <small className={balanceHelpText}>{this.state.translations.balanceHelpText}</small>
                                        <span className={inputBalanceTextErrorClasses}>{this.state.translations.balanceFieldError}</span>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="interest_payoff1" className="label-minimum-payment">
                                            <Tooltip content={this.state.translations.aprTooltip} />
                                            {this.state.translations.aprLabel}
                                        </label>
                                        <div className="input-group">
                                            <input className={inputAPRErrorClasses} name="apr" id="interest_payoff1" value={this.state.apr} onChange={this.handleChange.bind(this)} />
                                            <div className="input-group-append">
                                                <span className={inputIconAPRClasses}>%</span>
                                            </div>
                                        </div>
                                        <span className={inputAPRTextErrorClasses}>{this.state.translations.requiredFieldError}</span>
                                    </div>

                                    <div className="mb-3">
                                        <h4>{this.state.translations.minimumPaymentLabel1}</h4>

                                        <fieldset className="fieldset-minimum">
                                            <div className="form-group">
                                                <label htmlFor="percentage_of_balance" className="col-xs-10 offset-xs-2 control-label mt-2">
                                                    <Tooltip content={this.state.translations.balancePercentageTooltip} />
                                                    {this.state.translations.balancePercentageLabel}
                                                </label>

                                                <div className="input-group">
                                                    <select className="form-control" name="balancePercentage" id="percentage_of_balance" value={this.state.balancePercentage} onChange={this.handleChange.bind(this)} >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="2.5">2.5</option>
                                                        <option value="3">3</option>
                                                        <option value="3.5">3.5</option>
                                                        <option value="4">4</option>
                                                        <option value="4.5">4.5</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                { this.state.minimumPayment > 0 && (
                                                    <div>
                                                        <label htmlFor="minimum_dollar_amount" className="col-xs-12 offset-xs-2 control-label mt-2">
                                                            <Tooltip content={this.state.translations.minimumPaymentTooltip} />
                                                            {this.state.translations.minimumPaymentLabel2}:
                                                        </label>

                                                        <p className="number-populated" id="minimum_payment" >
                                                            { Util.moneyValue(this.state.minimumPayment, true) }
                                                        </p>
                                                    </div>
                                                )}

                                                <input type="hidden" value={this.state.minimumPayment} name="minimumPayment" id="minimum_dollar_amount" />
                                            </div>
                                        </fieldset>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="interest_payoff2" className="label-minimum-payment">
                                            {this.state.translations.paymentTypeLabel}
                                        </label>
                                        <div className="input-group radio-button">
                                            <div className="item payment-type">
                                                <label><input type="radio" name="payment_type" value="minim" onChange={this.handleOptionChange} checked={this.state.paymentType === 'minim'}/>{this.state.translations.paymentTypeMinim}</label>
                                                <label><input type="radio" name="payment_type" value="fixed" onChange={this.handleOptionChange} checked={this.state.paymentType === 'fixed'}/>{this.state.translations.paymentTypeFixed}</label>
                                            </div>
                                        </div>
                                        <span className={inputAPRTextErrorClasses}>{this.state.translations.requiredFieldError}</span>
                                    </div>

                                    {this.state.paymentType === 'fixed' && (
                                        <div className="mb-3">
                                            <label htmlFor="fixed_payment" className="label-minimum-payment">
                                                <Tooltip content={this.state.translations.paymentTypeLabelTooltip} />
                                                {this.state.translations.fixedPaymentLabel}
                                            </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className={`input-group-text ${ this.state.fixedPayment < this.state.minimumPayment ? `inputIconError` : ``}`}>$</span>
                                                </div>
                                                <NumberFormat
                                                    className={inputBalanceErrorClasses}
                                                    name="fixedPayment"
                                                    id="fixed_payment"
                                                    value={this.state.fixedPayment}
                                                    onChange={this.changeFixedPayment.bind(this)}
                                                    placeholder="Ex: 1000"
                                                    thousandSeparator={true}
                                                    allowNegative={false}
                                                />
                                            </div>
                                            {this.state.fixedPayment < this.state.minimumPayment && (<div className="payment-type-fixed-disclaimer inputErrorText">{this.state.translations.fixedPaymentDisclaimer}</div>)}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!this.state.minimumPayment || !this.state.apr || this.state.currentBalance > 1000000 || (
                                                this.state.paymentType === 'fixed' && this.state.fixedPayment < this.state.minimumPayment
                                            )}
                                        >
                                            { this.state.translations.calculateText }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div id="ccpayoffResults" className="col-lg-6 text-center rightResults" style={{display: this.state.loading || this.state.showResults ? 'block' : 'none' }} >

                        <div className="loader-spiner" style={{display: this.state.loading ? 'block': 'none'}}>
                            {this.renderSpiner()}

                            <p>{this.state.translations.loadingText}</p>
                        </div>

                        <div className="minimum-payment-results">
                            {this.state.showResults && this.renderResults(colors)}
                        </div>

                        { this.state.showResults && this.state.paymentType === 'fixed' && this.state.fixedPayment > 0 && (
                            <div className="fixed-payment-results">
                                {this.renderFixedPaymentResults()}
                            </div>
                        )}

                        { (!this.state.apiError || (this.state.paymentType === 'fixed' && !this.state.fixedApiError && this.state.fixedPayment > 0)) && (<div className="scroll-to-table">
                            <a onClick={() => {
                                this.setState({showTableResults: true}, () => {
                                    setTimeout(() => {
                                        this.scrollTo('paymentResults')
                                    }, 300)
                                });
                            }}>
                                {this.state.translations.goToPaymentScheduleText}
                            </a>

                            {showCard && !this.state.apiError && this.state.showTableResults && this.renderCard(this.props)}
                        </div>)}

                    </div>
                </div>{/* End of row */}

                { ((this.state.showTableResults && this.state.paymentType !== 'fixed') || (this.state.showResults && this.state.paymentType === 'fixed' && this.state.fixedPayment > 0)) && (
                    <div className="row">
                        <div className="col-lg-12 mt-5">

                            {this.state.showTableResults && (
                                <div id="paymentResults" className="shadowBox paymentResults">
                                    <h3>{this.state.translations.tableResultsTitle}</h3>
                                    <div className="table-responsive scrolling-table">
                                        <Table columns={this.state.tableColumns} data={this.state.paymentType === 'fixed' ? this.state.tableFixedPaymentResults : this.state.tableResults} />
                                    </div>
                                </div>
                            )}

                            <div className="txt_disclaimer">
                                <p><strong>{this.state.translations.noteText}: </strong>{this.state.translations.disclaimerText}</p>
                                { showCard && (
                                    <p>{this.state.translations.disclaimerText2}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>/* we will replace this div by </React.Fragment> */

        );
    }
}

export default App;
