import React, { Component } from 'react';
import axios from 'axios';
import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import './App.css';

class App extends Component {
    constructor(props){
    super(props);

    this.translations = getTranslations(this.props.lan);
        this.state = {
        debt: "-",
        phoneNumber: props.phoneNumber,
        loading: false,
        tableResults: [],
        debtManagementResults: null,
        apiError: false,
        }
    }

    handlerDebtChange = e => {
        const debt = Util.removeMoneyTrash(e.target.value);

        if( Util.valueIsInteger(debt) && debt < 1000000 ){
            this.setState({debt, tableResults: [], debtManagementResults: null});
        }
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {debt} = this.state;
        const perc = (this.props.lan === 'ca' || this.props.lan === 'fr') ? '2.5' : '3';

        if(!debt){ return; }

        const apiUrl = 'https://calculator-api-bk.debt.com/api/v1';
        const checkInfinityPaymentUrl = apiUrl + '/validatePayments/' + debt + '/18/'+ perc +'/25';
        const noDebtManagementURL = apiUrl + '/getPayments/' + debt + '/18/'+ perc +'/25';
        const debtManagementURL = apiUrl + '/debtmanagement/'+ debt + '/8/1';

        this.setState({loading : true, tableResults: [], debtManagementResults: null}, ()=>{
            axios.get(checkInfinityPaymentUrl)
            .then(({data}) => {

                if(!data.payments){
                this.setState({ tableResults: [], debtManagementResults: null, apiError: true, loading : false });
                }else{

                    axios.all([
                    axios.get(noDebtManagementURL),
                    axios.get(debtManagementURL)
                    ])
                    .then(axios.spread((paymentSchedule, debtManagement) => {
                        // Working with both responses
                        let phones_found = this.state.phoneNumber;
                        if(document.getElementsByClassName('tracking-phone').length){
                            phones_found = document.getElementsByClassName('tracking-phone')[0].innerText;
                        }else{
                            if(document.getElementsByClassName('ShowPhoneNumber').length){
                                phones_found = document.getElementsByClassName('ShowPhoneNumber')[0].innerText;
                            }
                        }

                        if(document.getElementsByClassName('notracking-phone').length){
                            phones_found = document.getElementsByClassName('notracking-phone')[0].innerText;
                        }

                        this.setState({ tableResults: paymentSchedule.data, debtManagementResults: debtManagement.data, phoneNumber: phones_found, apiError: false, loading : false });
                    }))
                    .catch((e) => {
                        //In case of Ex.: "Non Reachable Server"
                        console.log(e);
                        this.setState({ tableResults: [], debtManagementResults: null, loading : false });
                    });

                }

            })
            .catch((error) => {
                console.log(error);
                this.setState({ tableResults: [], debtManagementResults: null, loading : false });
                return { success: false };
            });

        });

    }

    renderSpiner(){
        return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        );
    }

    calculateSaving = () => {
        const { tableResults, debtManagementResults } = this.state;
        let estimatedSavings = 0;
        if(tableResults.length && debtManagementResults){
            estimatedSavings = parseFloat(tableResults[0].minimumPayment) - parseFloat(debtManagementResults.monthlyPayment);
            estimatedSavings = Util.roundTo(estimatedSavings, 2);
        }

        return estimatedSavings;
    }

    renderResult = () => {
        const { debt, tableResults, debtManagementResults } = this.state;
        const difMonths = parseInt(tableResults[tableResults.length-1].month) - parseInt(debtManagementResults.numberOfMonths);
        let difPayment = 0;
        const DMPpayments = parseFloat(debtManagementResults.totalAmountPaid);
        const noDMPpayments = parseFloat(tableResults[tableResults.length-1].totalInterest) + parseFloat(debt);
        difPayment = Util.roundTo(noDMPpayments - DMPpayments, 2);

        const estimatedSavings = this.calculateSaving();//Util.roundTo(estimatedSavings);

        if(difMonths <= 0 || difPayment <= 0){
            return false;
        }else{

            return (
                <table className="dmp-table-result">
                    <tbody>
                        <tr>
                            <td className="text-right td-left">{this.translations.onlyMinimumPaymentsText}</td>
                            <td className="text-left td-right">
                                ${tableResults.length ? Util.formatMoney(tableResults[0].minimumPayment) : 0 }
                                {tableResults.length && Util.countDecimalPlaces(tableResults[0].minimumPayment) === 1 && '0'}
                                {tableResults.length && Util.countDecimalPlaces(tableResults[0].minimumPayment) === 0 ? '.00': ''}
                                / {this.translations.monthtext}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right td-left">{this.translations.newDMPText}*</td>
                            <td className="text-left td-right">
                                ${ debtManagementResults !== null ? Util.formatMoney(debtManagementResults.monthlyPayment) : 0 } / {this.translations.monthtext}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right td-left"><strong>{this.translations.estimatedMonthlySavingsText}</strong></td>
                            <td className="text-left td-right">
                                <strong>
                                    $ {tableResults.length ? Util.formatMoney(estimatedSavings) : 0 }
                                    {tableResults.length && Util.countDecimalPlaces(estimatedSavings) === 1 && '0'}
                                    {tableResults.length && Util.countDecimalPlaces(estimatedSavings) === 0 ? '.00': ''} / {this.translations.monthtext}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right td-left">{this.translations.timeSavedText}</td>
                            <td className="text-left td-right">{Util.getDateFromNumberOfMonths(difMonths, this.props.lan)}</td>
                        </tr>
                        <tr className="bg-color-lightblue overall-row-result">
                            <td className="text-right td-left">{this.translations.overallSaving}</td>
                            <td className="text-left td-right">${Util.formatMoney(difPayment)}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }

  render() {
    const {tableResults, debtManagementResults} = this.state;

    return (
        <div className="container">
            <div className="dmp-calc-heading">
                <h2 className="fancy-title color-white mb-4">
                    <span className="color-white">{this.translations.sectionTitletext}</span>
                </h2>

                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <p>{this.translations.sectionSubtitletext}</p>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form name="formDebt" id="dmp_v3_comparison" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} >

                        <InputGroup
                            id="dmpV3InputID"
                            label={this.translations.inputDebtLabel}
                            value={this.state.debt !== '-' ? Util.formatMoney(this.state.debt) : '' }
                            placeholder={this.translations.inputDebtPlaceholder}
                            errorOccur={(Number(this.state.debt) < 1 || Number(this.state.debt) > 999999 || this.state.debt === '') ? 1 : 0}
                            errorMsg={this.translations.debtInputError}
                            onChange={this.handlerDebtChange}
                        />

                        <div className="text-center">
                            <button id="dmpSubmitDebt" type="submit" className="btn btn-primary pl-4 pr-4" aria-label={this.translations.btnAriaLabel} disabled={(Number(this.state.debt) < 1 || Number(this.state.debt) > 999999 || this.state.debt === '' || this.state.debt === '-') ? 1 : 0}>
                                {this.translations.btnTitle}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <div className="loader-spiner-dmp" style={{display: this.state.loading ? 'block': 'none'}}>
                {this.renderSpiner()}
                <p>{this.translations.loadingText}</p>
            </div>

            <div id="debtV3ResultWrap" className={debtManagementResults !== null ? 'active' : '' }>
                <div className="dmp-bg dmp-nobg">
                    <div className="row">
                        <div className="col text-center">
                            <div className="dmp-cred-logos">
                                <div className="logos-parent cred-uw-parent">
                                    <span className="sprite cred-uw" aria-label={this.translations.credUWText} title={this.translations.credUWText}></span>
                                    <span className="sr-only">{this.translations.credUWText}</span>
                                </div>
                                <div className="logos-parent cred-bbb-parent">
                                    <span className="sprite cred-bbb" aria-label={this.translations.credBBBText} title={this.translations.credBBBText}></span>
                                    <span className="sr-only">{this.translations.credBBBText}</span>
                                </div>
                            </div>

                            <div className="savings-head">{this.translations.youCanSaveText}</div>

                            <p>{this.translations.withThisDebtText}</p>
                            <div className="savings-per-month">
                                ${tableResults.length ? Util.formatMoney( this.calculateSaving() ) : 0 }
                                {tableResults.length && Util.countDecimalPlaces( this.calculateSaving() ) === 1 && '0'}
                                {tableResults.length && Util.countDecimalPlaces( this.calculateSaving() ) === 0 ? '.00': ''} {this.translations.perMonth}
                            </div>

                            <p><strong>{this.translations.dmpComparisonText}</strong></p>

                            <div className="dmp-quilify-help-text">{this.translations.forQualifiedHelpedText}</div>

                            {/* API Results */}
                            <div className="row justify-content-center no-gutters debt-analyzer-results text-center">
                                { debtManagementResults !== null ? this.renderResult() : '' }
                                {/* console.log(debtManagementResults) */}
                            </div>
                            {/* End of Results */}

                        </div>

                        <div className="col-12">
                            <div id="debtSavings" className="text-center">
                                <div className="dmp-lead-button ml-0 p-0">
                                    { this.props.ctaOpenModal ? (<a id="dmpFormStart" href={this.props.ctaID} data-toggle="modal" className="btn btn-primary">{this.translations.ctaLabel} <i className="far fa-arrow-circle-right" /></a>) : (<a href={this.props.ctaID} className="btn btn-primary">{this.translations.ctaLabel} <i className="far fa-arrow-circle-right" /></a>) }
                                </div>

                                <div className="text-center mt-2">
                                    {this.translations.dontwait1}
                                    <br/><strong className="bigstrong">{this.translations.callText} <a className="bigPhoneBlock" href={`tel:+1${this.state.phoneNumber}`}>{this.state.phoneNumber}</a> {this.translations.nowText}!</strong><br/>
                                    {this.translations.dontwait2}
                                </div>

                            </div>
                            <div className="disclaimer">
                                {this.translations.disclaimer}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
  }
}

export default App;
