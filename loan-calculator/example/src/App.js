import React, { Component } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { scroller } from 'react-scroll';

//Setting Up Location
import es from 'date-fns/locale/es';

import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import Table from './components/table.jsx'
import Tooltip from './components/tooltip.jsx';
import Dropdown from "./components/select";

import './App.css';

registerLocale('es', es);

class App extends Component {
    constructor(props){
        super(props);

        /* const aux_dates = new Date();
        const currentNextDate = new Date( aux_dates.setMonth(aux_dates.getMonth() + 1) ); */
        const possibleYears = Util.getPossibleYears(50);
        const languages = getTranslations(props.lan);
        const listOfMonths = Util.getMonthds( languages.fullMonths );

        this.state = {
            lan : props.lan,
            translations : languages,
            startDate: new Date(),
            amount: 5000,
            years: 3,
            months: 36,
            interest: 3,
            extra_monthly_amount: 0,
            extra_yearly_amount: 0,
            extra_lump_amount: 0,
            extraYearlyMonths: listOfMonths,
            extraLumpMonths: listOfMonths,
            extraLumpYears: possibleYears,

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
        };

    }//End of Constructor

    handleChange = (properties) => {
        let boxModel = {...this.state};
        boxModel[properties.name] = properties.value;

        if((properties.name === 'extra_monthly_amount' || properties.name === 'extra_yearly_amount' || properties.name === 'extra_lump_amount') && boxModel.showResults === true ){
            boxModel.showResults = true;
        }else{
            boxModel.showResults = false;
        }

        this.setState(boxModel);
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

    handleTimeChange = (e) => {
        const {name, value} = e.target;
        let int_val = Math.floor(value);
        let time_value = 0;
        if(name === 'years') {
            time_value = Util.calculateMonthsYears(int_val, false);
            this.setState( {years: int_val, months: time_value, showResults: false } );
        }else{
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

    calculateAmortization = () => {
        let { amount,
            interest,
            months,
            startDate,
            extra_monthly_amount,
            extra_yearly_amount,
            extra_lump_amount,
            extraYearlyMonths,
            extraLumpMonths,
            extraLumpYears,
            translations } = this.state;

        let extra_yearly_month = extraYearlyMonths.findIndex(obj => obj.selected);
        let extra_lump_month = extraLumpMonths.findIndex(obj => obj.selected);
        let extra_lump_year = Number(extraLumpYears.filter(obj => obj.selected)[0].title);

        let monthly_interest = Number(interest) / 100 / 12;
        let monthly_payment = ( (monthly_interest * Number(amount) ) * Math.pow(1 + monthly_interest, Number(months)) ) / ( Math.pow((1+monthly_interest), Number(months) ) - 1 );
        let monthly_payment_without_extra = monthly_payment;

        let total_interest = 0;
        let default_color = 'trbg-default';
        let tr_bg_color = default_color;

        if(extra_monthly_amount){
            monthly_payment += Number(extra_monthly_amount);
            default_color = 'trbg-lblue';
        }

        let payment = Number(monthly_payment);
        let temp_payment = payment;

        let term = months;
        let term_date = '';
        let aux_dates = '';
        let next_month = '';
        let next_year = '';
        let interest_paid = '';
        let principal_paid = 0;
        let amortizationTable = [];

	    for(let n=0; n<term; n++) {
            tr_bg_color = default_color;

            aux_dates = new Date(startDate);
            term_date = new Date( aux_dates.setMonth(aux_dates.getMonth() + n+1) );
            next_month = term_date.getMonth();
            next_year = term_date.getFullYear();

		    if( extra_yearly_amount && extra_yearly_month === next_month ){
                payment += Number(extra_yearly_amount);

                if( extra_lump_amount && extra_lump_amount !== "0" && extra_lump_month === next_month && extra_lump_year === next_year ){
                    tr_bg_color = "trbg-lgreen";
                }else{
                    tr_bg_color = "trbg-lsky";
                }
            }else{
                if( extra_lump_amount && extra_lump_month === next_month && extra_lump_year === next_year ){
                    payment += Number(extra_lump_amount);
                    tr_bg_color = "trbg-lgreen";
                }else{
                    payment = temp_payment;
                }
            }

            interest_paid = amount * monthly_interest;
            principal_paid = Number(payment) - Number(interest_paid);

		    if(amount < principal_paid){
			    principal_paid = amount;
			    payment = principal_paid + Number(interest_paid);
		    }

		    amount -= principal_paid;
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

		    if(amount <= 0){
			    break;
            }

        }


        const currDate = new Date();
        const currYear = currDate.getFullYear();
        const currentMonth = currDate.getMonth();

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
        }, () => {
            if(this.state.showAmortization){
                this.scrollTo('loanPaymentResults');
            }
        });

    }

    handleSubmit(e){
        e.preventDefault();
        this.calculateAmortization();
    }

    handleAmortizationAction = () => {
        let aux_showAmortization = this.state.showAmortization;
        aux_showAmortization = !aux_showAmortization;

        this.setState({showAmortization : aux_showAmortization}, () => this.scrollTo('loanPaymentResults') );
    }

    handleExtraPaymentFields = () => {
        let auxTableResults = JSON.parse(JSON.stringify(this.state.tableResults));

        let aux_showExtraPayments = this.state.showExtraPayments;
        aux_showExtraPayments = !aux_showExtraPayments;
        if(aux_showExtraPayments){
            this.setState({showExtraPayments : aux_showExtraPayments});
        }else{
            auxTableResults.forEach(row => (row.bg_class = 'trbg-default'));

            this.setState({showExtraPayments : aux_showExtraPayments, extra_monthly_amount: 0, extra_yearly_amount: 0, extra_lump_amount: 0, tableResults: auxTableResults }, () => {
                this.scrollTo('renderResultTitle');
                this.calculateAmortization();
            });
        }
    }

    renderResults = () => {
        const {amount, monthlyPayment, tableResults, translations, showAmortization} = this.state;

        return (
            <div className="mt-3 col-sm-5 col-lg-7 col-xl-5 text-center">
                <h3 className="loan-titles" id="renderResultTitle">{translations.monthlyPayments}</h3>
                <div className="mp-result mb-5">
                    <div className="mp-dolar-sign">$</div>
                    <div className="mp-dolar-numbers">{Util.formatMoney( Util.roundTo(monthlyPayment, 2) )}</div>
                </div>

                <div className="row">
                    <div className="col-8">{translations.totalPrincipalPaid}</div>
                    <div className="col-4 text-black">{ '$' + Util.formatMoney( Util.roundTo(amount, 2) ) }</div>
                </div>

                <hr className="mp-results-line" />

                <div className="row">
                    <div className="col-8">{translations.totalInterestPaid}</div>
                    <div className="col-4 text-black">{ tableResults[tableResults.length-1].totalInterest }</div>
                </div>
                <button className="btn loan-btn-go-table" onClick={this.handleAmortizationAction}>
                    {showAmortization ? translations.hideAmortizationBtnText : translations.showAmortizationBtnText }
                    <i className={showAmortization ? "arrow up" : "arrow down"}></i>
                </button>
            </div>
        );
    }

    handleDateChange = date => {
        console.log(date);

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

        const {amount, interest, years, months, translations, extra_monthly_amount, extra_yearly_amount, extra_lump_amount, extraYearlyMonths, extraLumpMonths, extraLumpYears} = this.state;
        const {title, btnLabel} = this.props;
        return (
            <div className="container loan-calculator-wrapper">

                <div className="row justify-content-center loan-form-container">
                    <div className="col-xs-12 col-sm-7 col-lg-5">
                        <h3 className="loan-titles">{title ? title : translations.calculatorTitle}</h3>

                        <form id="mbp-calculator" onSubmit={this.handleSubmit.bind(this)} >

                            <div className="row form-group mt-3">
                                <InputGroup
                                    id='biweekly_amount'
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
                                <div className="col-6 form-group mt-3">
                                    <Tooltip content={ translations.dateHelpText } />
                                    <label htmlFor="biweekly_years" className="year-label">{translations.termInYears}</label>
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
                                    <label htmlFor="biweekly_months" className="month-label pl-1">{translations.termInMonths}</label>
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

                            <div className="row form-group mt-3">
                                <InputGroup
                                    id='ssc_interest'
                                    label={translations.interestLabel}
                                    name='interest'
                                    value={interest}
                                    icon='%'
                                    iconPosition='right'
                                    tooltipContent={translations.interestHelpText}
                                    errorOccur={(Number(interest) <= 0 || Number(interest) > 100 || interest === '') ? 1 : 0}
                                    errorMsg={translations.percentageFieldError}
                                    onChange={this.handleChange}
                                />
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
                    {this.state.showResults && this.state.monthlyPayment && this.renderResults()}

                    <div className="col-xs-12 col-xl-10 mt-2">
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
                                            id='extra_monthly_amount'
                                            name='extra_monthly_amount'
                                            value={extra_monthly_amount}
                                            icon='$'
                                            iconPosition='left'
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-sm-8 p-15">
                                        <label htmlFor="extra_monthly_amount" className="extra-fields-label dark-label">{translations.extraPaymentLabel1}</label>
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
                                    <div className="col-xs-12 offset-lg-5 col-sm-7 offset-lg-7 col-lg-5">
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
                </div>{/* End of row */}

                <div id="loanPaymentResults" style={{display: this.state.showResults && this.state.showAmortization ? 'block' : 'none' }} >

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
                                { (this.state.extra_monthly_amount || this.state.extra_yearly_amount || this.state.extra_lump_amount) ? translations.withExtraPayments : translations.withoutExtraPayments }
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive scrolling-table underlined-tbody">
                        { this.state.startDate && <Table columns={this.state.tableColumns} data={this.state.tableResults} /> }
                    </div>
                    <p className={this.state.startDate ? 'hide' : 'show' }>{ translations.startingDateEmptyText }</p>

                </div>

            </div>
        );

    }//End of render

}
export default App;