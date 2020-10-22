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

  calculateSavings = () => {

    const { debt, tableResults, debtManagementResults } = this.state;
    const difMonths = parseInt(tableResults[tableResults.length-1].month) - parseInt(debtManagementResults.numberOfMonths);
    let difPayment = 0;
    const DMPpayments = parseFloat(debtManagementResults.totalAmountPaid);
    const noDMPpayments = parseFloat(tableResults[tableResults.length-1].totalInterest) + parseFloat(debt);
    difPayment = Util.roundTo(noDMPpayments - DMPpayments, 2);

    if(difMonths <= 0 || difPayment <= 0){
        return false;
    }else{

        return (
            <div className="order-3 col-md-4 p-1" id="savings_block">
                <div className="card mb-4">
                    <div className="card-header bg-color-blue">
                        <h4>{this.translations.youSaveText}*</h4>
                    </div>
                    <div className="card-subheader bg-color-lightblue pb-1">&nbsp;</div>
                    <div className="card-intro" id="savings_Time_block">
                        <small>{this.translations.timeSavedText}:</small>
                        <div id="savings_Time" className="card-results">{Util.getDateFromNumberOfMonths(difMonths, this.props.lan)}</div>
                    </div>
                    <div className="card-body">
                        <small>{this.translations.totalAmountSaved}:</small>
                        <div id="savings_fees" className="card-results">${Util.formatMoney(difPayment)}</div>
                    </div>
                </div>
            </div>
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
                    <form name="formDebt" id="dmpcomparison" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} >

                        <InputGroup
                            id="dmpInputID"
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

            <div id="debtResultWrap" className={debtManagementResults !==null ? 'active' : '' }>
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
                            <div className="savings-per-month">${debtManagementResults !== null ? Util.formatMoney(debtManagementResults.monthlyPayment) : 0} {this.translations.perMonth}</div>

                            <p><strong>{this.translations.dmpComparisonText}</strong></p>

                            {/* API Results */}
                            <div className="row justify-content-center no-gutters debt-analyzer-results text-center">
                                <div className="order-1 order-md-2 col-md-5 p-1" id="dmp_block">
                                    <div className="card mb-4 shadow">
                                        <div className="card-header bg-color-blue">
                                            <h4>{this.translations.withDMPText}*</h4>
                                        </div>
                                        <div className="card-subheader bg-color-lightblue">
                                            <h5><span>${ debtManagementResults !== null ? Util.formatMoney(debtManagementResults.monthlyPayment) : 0 }</span> / {this.translations.monthtext}</h5>
                                        </div>
                                        <div className="card-intro">
                                            <small>{this.translations.timePayFullText}</small>
                                            <div className="card-results">{debtManagementResults !== null ? Util.getDateFromNumberOfMonths(debtManagementResults.numberOfMonths, this.props.lan) : 0}</div>
                                        </div>
                                        <div className="card-body">
                                            <small>{this.translations.totalCostandIntrestText}:</small>
                                            <div className="card-results">${debtManagementResults !== null ? Util.formatMoney(debtManagementResults.totalAmountPaid) : 0}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-2 order-md-1 col-md-3 p-1" id="not_dmp_block">
                                    <div className="card mt-md-4 mb-4">
                                        <div className="card-header bg-color-gray narrow-padding">
                                            <h4 className="font-small">{this.translations.onlyMinimumPaymentsText}</h4>
                                        </div>
                                        <div className="card-subheader bg-color-lightgray">
                                            <h5>
                                                <span>
                                                    ${ tableResults.length ? Util.formatMoney(tableResults[0].minimumPayment) : 0 }
                                                    {tableResults.length && Util.countDecimalPlaces(tableResults[0].minimumPayment) === 1 && '0'}
                                                    {tableResults.length && Util.countDecimalPlaces(tableResults[0].minimumPayment) === 0 ? '.00': ''}
                                                </span> / {this.translations.monthtext}
                                            </h5>
                                        </div>
                                        <div className="card-intro p10">
                                            <small>{this.translations.timePayFullText}</small>
                                            <div className="card-results font-small">{tableResults.length ? Util.getDateFromNumberOfMonths(tableResults[tableResults.length-1].month, this.props.lan) : 0}</div>
                                        </div>
                                        <div className="card-body p10">
                                            <small>{this.translations.totalCostandIntrestText}:</small>
                                            <div className="card-results font-small">${ tableResults.length ? Util.formatMoney( Util.roundTo(parseFloat(tableResults[tableResults.length-1].totalInterest) + parseFloat(this.state.debt), 2) ) : 0 }</div>
                                        </div>
                                    </div>
                                </div>

                                { debtManagementResults !== null ? this.calculateSavings() : ''}

                            </div>
                            {/* End of Results */}

                        </div>

                        <div className="col-12">
                            <div id="debtSavings" className="text-center">
                                <div className="dmp-lead-button ml-0 p-0">
                                    { this.props.ctaOpenModal ? (<a id="dmpFormStart" href={this.props.ctaID} data-toggle="modal" className="btn btn-primary">{this.translations.ctaLabel} <i className="far fa-arrow-circle-right" /></a>) : (<a href={this.props.ctaID} className="btn btn-primary">{this.translations.ctaLabel} <i className="far fa-arrow-circle-right" /></a>) }
                                </div>

                                {/* <span className="phoneNumber pl-0 ml-0">
                                    <a href={`tel:+1${this.state.phoneNumber}`} className="tracking-phone-click no-animation ml-0 ml-md-2">
                                        <span className="tracking-phone">{this.state.phoneNumber}</span>
                                    </a>
                                </span> */}

                                <div className="text-center mt-2">
                                    {this.translations.dontwait1}
                                    <br/><strong className="bigstrong">{this.translations.callText} <a href={`tel:+1${this.state.phoneNumber}`}>{this.state.phoneNumber}</a> {this.translations.nowText}!</strong><br/>
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
