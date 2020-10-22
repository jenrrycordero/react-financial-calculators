import React, { Component } from 'react'
import Parser from 'html-react-parser'
import axios from 'axios'
import Util from '../Utils'
import getTranslations from '../language'
import Table from './table.jsx'
import Tooltip from './tooltip.jsx'
import { scroller } from 'react-scroll'

class CCPayOffCalculator extends Component {

  constructor(props) {
      super(props);

      const languages = getTranslations(props.lan);
      this.state = {
        lan : props.lan,
        currentBalance : '',
        currentBalanceEmpty : 0,
        apr: 1,
        aprEmpty : 0,
        balancePercentage : 3,
        minimumPayment : '',
        translations : languages,
        showResults : false,
        showTableResults: true,
        tableColumns : [
          languages.monthtext,
          languages.minimumPaymentText,
          languages.principalPaidText,
          languages.interestPaidText,
          languages.remainingBalanceText,
          languages.totalInterestText,
        ],
        tableResults : [],
        debtManagementResults : [],
        phoneNumber : props.phoneNumber,
        apiError : false,
        loading: false,
      };

      this.renderResults = this.renderResults.bind(this);
      this.renderCard = this.renderCard.bind(this);
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
    const {type, name, value} = e.target;

    const val_percent = (name == 'apr') ? Util.percentToValue(value) : value;
    const parsedValue = (name == 'currentBalance') ? Util.moneyToValue(val_percent) : val_percent;

    let auxForm = {...this.state};
    auxForm[name] = parsedValue;

    auxForm.tableResults = [];
    auxForm.showResults = false;

    this.setState(auxForm, () => { this.calculateMinimumPayment() } );
  }

  calculateMinimumPayment(){
    const { currentBalance, apr, balancePercentage } = this.state;
    const result = (currentBalance * balancePercentage / 100);

    this.setState({minimumPayment : result});
  }

  handleSubmit(e){
      e.preventDefault();
      const {currentBalance, apr, balancePercentage, minimumPayment} = this.state;

      if(!minimumPayment){
        return;
      }

      const apiUrl = 'https://calculator-api-bk.debt.com/api/v1';
      const checkInfinityPaymentUrl = apiUrl + '/validatePayments/' + currentBalance + '/' + apr + '/' + balancePercentage + '/' + 25;
      const paymentScheduleUrl = apiUrl + '/getPayments/' + currentBalance + '/' + apr + '/' + balancePercentage + '/' + 25;

      const debtManagementURL = apiUrl + '/debtmanagement/'+ currentBalance + '/8/1';

      this.setState({loading : true}, ()=>{
          axios.get(checkInfinityPaymentUrl)
            .then(({data}) => {

              if(!data.payments){
                this.setState({ tableResults: [], debtManagementResults: [], showResults: true, apiError: true, loading : false });
              }else{

                  axios.all([
                    axios.get(paymentScheduleUrl),
                    axios.get(debtManagementURL)
                  ])
                  .then(axios.spread((paymentSchedule, debtManagement) => {
                    // do something with both responses
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

                    this.setState({ tableResults: paymentSchedule.data, debtManagementResults: debtManagement.data, showResults: true, phoneNumber: phones_found, apiError: false, loading : false });
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

          this.scrollTo('ccpayoffResults');
      });
  }

  renderResults(colors){
    const {lan, tableResults, translations, currentBalance, minimumPayment, showResults, apiError, loading} = this.state;
    let results = '';

    if(tableResults.length){
      const lastRow = tableResults[ tableResults.length - 1 ];
      const months = lastRow.month;

      let today = new Date();
      const currentYear = today.getFullYear();
      today.setMonth(today.getMonth() + months);
      const nextMonth = translations.month[today.getMonth()];
      const nextYear = today.getFullYear();

      let stringResult = translations.orText +' '+ Util.getDateFromNumberOfMonths(months, lan);
      stringResult += ' ('+months+' '+translations.paymentText+')';

      const totalToPay = lastRow.totalInterest + currentBalance;
      const totalToPayString = Util.moneyValue(totalToPay, true);
      const balancePercent = Util.calculatePercent(totalToPay, currentBalance );
      const interestPercent = Util.calculatePercent(totalToPay, lastRow.totalInterest ) + 1;

      let balancePercShow = balancePercent;
      let interestPercShow = interestPercent;
      if(balancePercent > interestPercent){
        balancePercShow = balancePercent - 5;
        interestPercShow = interestPercent + 5;
      }else{
        balancePercShow = balancePercent + 5;
        interestPercShow = interestPercent - 5;
      }

      const styles1 = {
        width: balancePercShow +'%',
        background: colors.grafLeftSide_BgC,
        color: colors.grafLeftSide_FontC,
      }
      const styles2 = {
        width: interestPercShow+'%',
        background: colors.grafRightSide_BgC,
        color: colors.grafRightSide_FontC,
      }

      results = (
        <div style={{display: showResults ? 'block' : 'none' }}>
          <p className='result_p'>{translations.debtFreeByText}</p>
          <div className="debtFreeMY">{nextMonth +' '+ nextYear}</div>
          <p className='result_p'>{stringResult}</p>
          <div class='graphResults'>
              <div className='graphLeftResult' style={styles1}>{balancePercent+'%'}</div>
              <div className='graphRightResult' style={styles2}>{interestPercent+'%'}</div>

              <div className="distance15Pixels"></div>

              <div className="leftResultLable">
                <span>{translations.principalText}</span>
                <br/>
                {Util.moneyValue(currentBalance, true)}
              </div>
              <div className="rightResultLable">
              <span>{translations.interestText}</span>
                <br/>
                {Util.moneyValue(lastRow.totalInterest, true)}
              </div>
          </div>
          <p className='result_p'>{translations.totalAmountText}</p>
          <div className="totalToPay">{totalToPayString}</div>
        </div>
      );
    }else{
      if(apiError){
        results = (
            <div className="alert alert-warning shadowBox" role="alert" style={{display: loading ? 'none' : 'block' }}>
              {translations.apiErrorText1}
                <strong>{Util.moneyValue(minimumPayment)}</strong>
              {translations.apiErrorText2}
            </div>
        );
      }
    }

    return results;
  }

  renderSpiner(){
    return (
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    );
  }

  renderCard(params){
    let cardBody = '';
    let lastMessage = '';
    const {currentBalance, debtManagementResults} = this.state;
    const {cardContent, btnLabel, btnUrl, openModal, phoneMessage} = params;

    let btn = '';
    if(btnUrl != '' && btnLabel != ''){
      btn = openModal ? <a href={btnUrl} data-toggle="modal" class='btn btn-primary ctaCCPayOff'>{btnLabel}</a> : <a href={btnUrl} class='btn btn-primary ctaCCPayOff'>{btnLabel}</a>;
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

  render() {
    //Style's class initializations:
    const inputIconBalanceError = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'inputIconError' : '';
    const inputIconBalanceClasess = 'input-group-text '+inputIconBalanceError;
    const balanceHelpText = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'inputHelpText hide' : 'inputHelpText';
    const inputBalanceError = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'inputError' : '';
    const inputBalanceErrorClasess = 'form-control '+inputBalanceError;
    const inputBalanceTextError = (this.state.minimumPayment===0 || this.state.currentBalance > 1000000) ? 'show' : 'hide';
    const inputBalanceTextErrorClasess = 'inputErrorText '+inputBalanceTextError;

    const inputIconAPRError = !this.state.apr ? 'inputIconError' : '';
    const inputIconAPRClasess = 'input-group-text '+inputIconAPRError;
    const inputAPRError = !this.state.apr ? 'inputError' : '';
    const inputAPRErrorClasess = 'form-control '+inputAPRError;
    const inputAPRTextError = !this.state.apr ? 'show' : 'hide';
    const inputAPRTextErrorClasess = 'inputErrorText '+inputAPRTextError;

    const {title, showCard, cardContent, btnLabel, btnUrl, colors} = this.props;
    return (
      <div className="container ccpayoff-calculator-wrapper">   {/* <React.Fragment> */}
          <div className="row justify-content-center">
              <div className="col-lg-6">

                  <div className="card shadowBox">
                      <div className="card-header" style={{background: colors.card_header_BgC }} role="tab" id="heading-CCPayOff">
                          <h2 className="mb-0" style={{color: colors.card_header_FontC}} >{title}</h2>
                      </div>

                      <div className="card-body" style={{ color: colors.card_content_FontC, background: colors.card_content_BgC }}>
                          {/* Form begins here */}
                          <form id="credit-card-payoff-calculator" onSubmit={this.handleSubmit.bind(this)} >

                              <div className="mb-3">

                                  <label htmlFor="current_balance">
                                    <Tooltip content={this.state.translations.currentBalanceTooltip} />
                                    {this.state.translations.currentBalanceLabel}
                                  </label>

                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className={inputIconBalanceClasess}>$</span>
                                    </div>
                                    <input className={inputBalanceErrorClasess} name="currentBalance" id="current_balance" value={this.state.currentBalance} onChange={this.handleChange.bind(this)} placeholder="Ex: 1000" />
                                  </div>
                                  <small className={balanceHelpText}>{this.state.translations.balanceHelpText}</small>
                                  <span className={inputBalanceTextErrorClasess}>{this.state.translations.balanceFieldError}</span>
                              </div>

                              <div className="mb-3">
                                  <label htmlFor="interestCCPOFF" className="label-minimum-payment">
                                      <Tooltip content={this.state.translations.aprTooltip} />
                                      {this.state.translations.aprLabel}
                                  </label>
                                  <div className="input-group">
                                      <input className={inputAPRErrorClasess} name="apr" id="interestCCPOFF" value={this.state.apr} onChange={this.handleChange.bind(this)} />
                                      <div className="input-group-append">
                                        <span className={inputIconAPRClasess}>%</span>
                                      </div>
                                  </div>
                                  <span className={inputAPRTextErrorClasess}>{this.state.translations.requiredFieldError}</span>
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
                                                  <option value="1">Interest + 1%</option>
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
                                          <label htmlFor="minimum_dollar_amount" className="col-xs-12 offset-xs-2 control-label mt-2" style={{display: this.state.minimumPayment ? 'block' : 'none' }}>
                                              <Tooltip content={this.state.translations.minimumPaymentTooltip} />
                                              {this.state.translations.minimumPaymentLabel2}:
                                          </label>

                                          <p className="number-populated" id="minimum_payment" style={{display: this.state.minimumPayment ? 'block' : 'none' }} >
                                              ${this.state.minimumPayment}
                                              { Util.countDecimalPlaces(this.state.minimumPayment) == 1 && '0'}
                                          </p>

                                          <input type="hidden" value={this.state.minimumPayment} name="minimumPayment" id="minimum_dollar_amount" />
                                      </div>
                                  </fieldset>
                              </div>

                              <div className="mb-3">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!this.state.minimumPayment || !this.state.apr || this.state.currentBalance > 1000000}
                                  >
                                    { this.state.translations.calculateText }
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>

              <div id="ccpayoffResults" className="col-lg-6 text-center rightResults" style={{display: this.state.loading || this.state.showResults ? 'block' : 'none' }} >

                  <div class="loader-spiner" style={{display: this.state.loading ? 'block': 'none'}}>
                    {this.renderSpiner()}

                    <p>{this.state.translations.loadingText}</p>
                  </div>

                  {this.renderResults(colors)}

                  <a href='#' onClick={ ()=>{ this.setState({showTableResults : true}, ()=>{ this.scrollTo('paymentResults')} ) } }
                     style={{display: !this.state.apiError && this.state.showResults ? 'block' : 'none' }}>
                      {this.state.translations.goToPaymentScheduleText}
                  </a>

                  {showCard && !this.state.apiError && this.state.showResults && this.renderCard(this.props)}

              </div>
          </div>{/* End of row */}

          <div className="row" style={{display: this.state.showResults ? 'block' : 'none' }} >
              <div className="col-lg-12 mt-5">

                <div id="paymentResults" className="shadowBox paymentResults" style={{display: !this.state.apiError && this.state.showTableResults ? 'block' : 'none' }}>
                  <h3>{this.state.translations.tableResultsTitle}</h3>
                  <div className="table-responsive scrolling-table">
                    <Table columns={this.state.tableColumns} data={this.state.tableResults} />
                  </div>
                </div>

                <p class="txt_disclaimer">
                  <p><strong>{this.state.translations.noteText}: </strong>{this.state.translations.disclaimerText}</p>
                  <p>{this.state.translations.disclaimerText2}</p>
                </p>
              </div>
          </div>

      </div>/* we will replace this div by </React.Fragment> */

    );
  }
}

export default CCPayOffCalculator;