import React, { Component } from 'react';
import { scroller } from 'react-scroll';

import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import Tooltip from './components/tooltip.jsx';
import Dropdown from "./components/select";
import DoughnutChart from "./components/doughnutChart";
import NumberFormat from 'react-number-format';

import homePriceIcon from './images/homePriceIcon.png';
import homeBankLender from './images/bankLenderIcon.png';
//import homeDownPayment from './images/homeDownPaymentIcon.png';
import homeDownPayment from './images/homeDownPayment-icon.png';
import mortgagePaymentIcon from './images/mortgagePaymentIcon.png';
import homeWarningMessage from './images/warningMessageIcon.png';

import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        const languages = getTranslations(props.lan);

        this.state = {
            lan: props.lan,
            region: props.region,
            translations: languages,
            income: 5000,
            monthlyDebt: 500,
            //downPayment: 53200,
            downPayment: [
                {
                    id: 0,
                    title: '20% ('+languages.traditionaltext+')',
                    value: 20,
                    selected: true
                },
                {
                    id: 1,
                    title: '10% (FHA, FICO '+languages.lessThanText+' 580)',
                    value: 10,
                    selected: false
                },
                {
                    id: 2,
                    title: '3.5% (FHA, FICO '+languages.moreThanText+' 580)',
                    value: 3.5,
                    selected: false
                },
            ],

            term: [
                {
                    id: 0,
                    title: '15',
                    selected: false
                },
                {
                    id: 1,
                    title: '20',
                    selected: false
                },
                {
                    id: 2,
                    title: '25',
                    selected: false
                },
                {
                    id: 3,
                    title: '30',
                    selected: true
                }
            ],
            interest: 3.75,

            showResults: false,
            showChartResults: false,
            negativeValues: false,

            maxLoanExpected: 0,
            maxPurchasePrice: 0,
            downPaymentMoney: 0,

            homeInsurance: 325,
            //taxes: 0,
            monthlyPprincipal: 975,
            totalMonthlyPayment: '1,300.00',
        };

    }//End of Constructor

    handleChange = (properties) => {
        let boxModel = {...this.state};
        boxModel[properties.name] = parseFloat( isNaN(properties.value) ? 0 : properties.value );

        if(properties.name !== 'homeInsurance' && properties.name !== 'taxes'){
            boxModel['showChartResults'] = false;
            boxModel['showResults'] = false;
            boxModel['negativeValues'] = false;
        }

        this.setState(boxModel, ()=>{
            const principal = parseFloat( isNaN(this.state.monthlyPprincipal) ? 0 : this.state.monthlyPprincipal );
            const insurance = parseFloat( isNaN(this.state.homeInsurance) ? 0 : this.state.homeInsurance );
            //const taxes = parseFloat( isNaN(this.state.taxes) ? 0 : this.state.taxes );
            //const total = Util.formatMoney( Util.roundTo(principal + insurance + taxes, 0) );
            const total = Util.formatMoney( Util.roundTo(principal + insurance, 0) );

            this.setState({totalMonthlyPayment:total});
        });
    }

    handleOpenChart = () =>{
        this.setState({showChartResults: !this.state.showChartResults});
    }

    //Updating Dropdown
    handleBPSelect = (id, name) => {
        console.log(name+": "+id);
        let tempPer = JSON.parse(JSON.stringify(this.state[name]));
        tempPer.forEach(item => (item.selected = false));
        tempPer[id].selected = true;

        this.setState({ [name]: tempPer, showResults:false, showChartResults:false });
    };

    handleSubmit(e){
        e.preventDefault();

        const {lan, income, monthlyDebt, downPayment, term, interest} = this.state;

        //The ltv_factor = 100 - downpayment
        const ltv_factor = 100 - Number(downPayment.filter(obj => obj.selected)[0].value);
        const aux_downPayment = Number(downPayment.filter(obj => obj.selected)[0].value);

        const estimated_taxes_and_insurance = 25;
        const factors = {
            '15': {
                '0': 5.129, //5.608,       OK
                '0.25': 5.192, //5.701,    OK
                '0.5': 5.255, //5.796,     OK
                '0.75': 5.319, //5.896,    OK
                '1': 5.383, //6.001,       OK
                '1.25': 5.449, //6.108,    OK
                '1.5': 5.515, //6.216,     OK
                '1.75': 5.582, //6.326,    OK
                '2': 5.649, //6.438,       OK
                '2.25': 5.718, //6.552,    OK
                '2.5': 5.787, //6.667,     OK
                '2.75': 5.857, //6.784,    OK
                '3': 5.927, //6.905,       OK
                '3.25': 5.999, //7.026,    OK
                '3.5': 6.071, //7.148,     OK
                '3.75': 6.144, //7.272,    OK
                '4': 6.217, //7.396,       OK
                '4.25': 6.292, //7.522,    OK
                '4.5': 6.367, //7.649,     OK
                '4.75': 6.443, //7.778,    OK
                '5': 6.519, //7.907,       OK
                '5.25': 6.597, //8.038,    OK
                '5.5': 6.675, //8.170,     OK
                '5.75': 6.754, //8.304,    OK
                '6': 6.833, //8.438,       OK
                '6.25': 6.913, //8.574,    OK
                '6.5': 6.994, //8.710,     OK
                '6.75': 7.076, //8.848,    OK
                '7': 7.158, //8.986,       OK
            },
            '20': {
                '0': 4.159, //             OK
                '0.25': 4.264, //          OK
                '0.5': 4.372, //           OK
                '0.75': 4.445, //4.442,    OK
                '1': 4.564, //4.593,       OK
                '1.25': 4.631, //4.706,    OK
                '1.5': 4.698, //4.821,     OK
                '1.75': 4.767, //4.937,    OK
                '2': 4.836, //5.055,       OK
                '2.25': 4.906, //5.175,    OK
                '2.5': 4.978, //5.296,     OK
                '2.75': 5.050, //5.419,    OK
                '3': 5.124, //5.545,       OK
                '3.25': 5.198, //5.671,    OK
                '3.5': 5.273, //5.799,     OK
                '3.75': 5.350, //5.340,    OK
                '4': 5.4275, //6.059,      OK
                '4.25': 5.5056, //6.192,   OK
                '4.5': 5.585, //6.326,     OK
                '4.75': 5.665, //6.462,    OK
                '5': 5.7463, //6.599,      OK
                '5.25': 5.8285, //6.738,   OK
                '5.5': 5.9114, //6.878,    OK
                '5.75': 5.9953, //7.020,   OK
                '6': 6.080, //7.164,       OK
                '6.25': 6.1657, //7.785,   OK
                '6.5': 6.2522, //7.931,    OK
                '6.75': 6.340, //8.079,    OK
                '7':  6.428, //8.228,      OK
            },
            '25': {
                '0': 3.890, //3.231,       OK
                '0.25': 3.956, //3.336,    OK
                '0.5': 4.022, //3.642,     OK
                '0.75': 4.153, //3.553,    OK
                '1': 4.225, //3.666,       OK
                '1.25': 4.303, //3.781,    OK
                '1.5': 4.4120, //3.885,    OK
                '1.75': 4.5140, // 4.017,  OK
                '2': 4.5950, //4.4228,     OK
                '2.25': 4.685, //4.361,    OK
                '2.5': 4.720, //4.486,     OK
                '2.75': 4.783, //4.613,    OK
                '3': 4.881, //4.742,       OK
                '3.25': 4.979, //4.873,    OK
                '3.5': 5.085, //5.006,     OK
                '3.75': 5.189, //5.141,    OK
                '4': 5.305, //5.278,       OK
                '4.25': 5.425, //5.457,    OK
                '4.5': 5.552, //5.558,     OK
                '4.75': 5.701, //5.701,    OK
                '5': 5.855, //5.845,       OK
                '5.25': 5.999, //5.992,    OK
                '5.5': 6.140, //6.140,     OK
                '5.75': 6.291, //6.291,    OK
                '6': 6.480, //6.443,       OK
                '6.25': 6.655, //6.598,    OK
                '6.5': 6.843, //6.750,     OK
                '6.75': 6.850, //6.713,    OK
                '7': 7.065, //6.873,       OK
            },
            '30': {
                '0': 3.481, //2.766,       OK
                '0.25': 3.546, //2.874,    OK
                '0.5': 3.612, //2.984,     OK
                '0.75': 3.679, //3.097,    OK
                '1': 3.747, //3.212,       OK
                '1.25': 3.816, //3.329,    OK
                '1.5': 3.886, //3.449,     OK
                '1.75': 3.958, //3.571,    OK
                '2': 4.031, //3.695,       OK
                '2.25': 4.105, //3.822,    OK
                '2.5': 4.181, //3.951,     OK
                '2.75': 4.259, //4.082,    OK
                '3': 4.338, //4.216,       OK
                '3.25': 4.418, //4.352,    OK
                '3.5': 4.500, //4.490,     OK
                '3.75': 4.583, //4.631,    OK
                '4': 4.668, //4.774,       OK
                '4.25': 4.754, //4.919,    OK
                '4.5': 4.841, //5.066,     OK
                '4.75': 4.929, //5.216,    OK
                '5': 5.019, //5.368,       OK
                '5.25': 5.110, //5.522,    OK
                '5.5': 5.202, //5.677,     OK
                '5.75': 5.295, //5.835,    OK
                '6': 5.389, //5.995,       OK
                '6.25': 5.485, //6.157,    OK
                '6.5': 5.582, //6.321,     OK
                '6.75': 5.679, //6.486,    OK
                '7': 5.778, //6.654        OK
            }
        };

        // income; //Gross Monthly Income (GMI)

        //if region = us
        const housing_ratio = 28; //GMI x housing_ratio (28)
        const dti_ratio = 36; //GMI x debt-to-income ratio (36)

        //monthlyDebt : car payments, student loan payments, etc...
        //interest : Annual Percentage Rate (APR)

        //years: term of the loan in years, exp.: 25
        const years = Number(term.filter(obj => obj.selected)[0].title);

        //LTV refers to loan-to-value ratio factor (def.: 80%)
        //const ltv_factor = 100 - parseFloat(downPayment);  //This will be the result of substract (downpayment %) to 100

        //Maximum Mortgage Loan Amount = 1000 * (maximum principal and interest payment allowed (8) / factor)
        //Maximum Purchase Price = Maximum Mortgage Loan Amount / ltv_factor

        let housing_ratio_amount = (housing_ratio / 100) * income;
        let dti_ratio_amount = (dti_ratio / 100) * income;

        dti_ratio_amount = dti_ratio_amount - monthlyDebt;

        let available_amount = housing_ratio_amount;
        if (dti_ratio_amount < housing_ratio_amount) {
            available_amount = dti_ratio_amount;
        }

        const taxes_and_insurance_amount = (estimated_taxes_and_insurance / 100) * available_amount;
        const max_payment_allowed = available_amount - taxes_and_insurance_amount;

        let factor = 0;
        const auxInterest = parseFloat(interest);
        switch(true) {
            case auxInterest >= 0.25 && auxInterest < 0.5  : factor = parseFloat(factors[years]['0.25']); break;
            case auxInterest >= 0.5  && auxInterest < 0.75 : factor = parseFloat(factors[years]['0.5']); break;
            case auxInterest >= 0.75 && auxInterest < 1    : factor = parseFloat(factors[years]['0.75']); break;
            case auxInterest >= 1    && auxInterest < 1.25 : factor = parseFloat(factors[years]['1']); break;
            case auxInterest >= 1.25 && auxInterest < 1.5  : factor = parseFloat(factors[years]['1.25']); break;
            case auxInterest >= 1.5  && auxInterest < 1.75 : factor = parseFloat(factors[years]['1.5']); break;
            case auxInterest >= 1.75 && auxInterest < 2    : factor = parseFloat(factors[years]['1.75']); break;
            case auxInterest >= 2    && auxInterest < 2.25 : factor = parseFloat(factors[years]['2']); break;
            case auxInterest >= 2.25 && auxInterest < 2.5  : factor = parseFloat(factors[years]['2.25']); break;
            case auxInterest >= 2.5  && auxInterest < 2.75 : factor = parseFloat(factors[years]['2.5']); break;
            case auxInterest >= 2.75 && auxInterest < 3    : factor = parseFloat(factors[years]['2.75']); break;
            case auxInterest >= 3    && auxInterest < 3.25 : factor = parseFloat(factors[years]['3']); break;
            case auxInterest >= 3.25 && auxInterest < 3.5  : factor = parseFloat(factors[years]['3.25']); break;
            case auxInterest >= 3.5  && auxInterest < 3.75 : factor = parseFloat(factors[years]['3.5']); break;
            case auxInterest >= 3.75 && auxInterest < 4    : factor = parseFloat(factors[years]['3.75']); break;
            case auxInterest >= 4    && auxInterest < 4.25 : factor = parseFloat(factors[years]['4']); break;
            case auxInterest >= 4.25 && auxInterest < 4.5  : factor = parseFloat(factors[years]['4.25']); break;
            case auxInterest >= 4.5  && auxInterest < 4.75 : factor = parseFloat(factors[years]['4.5']); break;
            case auxInterest >= 4.75 && auxInterest < 5    : factor = parseFloat(factors[years]['4.75']); break;
            case auxInterest >= 5    && auxInterest < 5.25 : factor = parseFloat(factors[years]['5']); break;
            case auxInterest >= 5.25 && auxInterest < 5.5  : factor = parseFloat(factors[years]['5.25']); break;
            case auxInterest >= 5.5  && auxInterest < 5.75 : factor = parseFloat(factors[years]['5.5']); break;
            case auxInterest >= 5.75 && auxInterest < 6    : factor = parseFloat(factors[years]['5.75']); break;
            case auxInterest >= 6    && auxInterest < 6.25 : factor = parseFloat(factors[years]['6']); break;
            case auxInterest >= 6.25 && auxInterest < 6.5  : factor = parseFloat(factors[years]['6.25']); break;
            case auxInterest >= 6.5  && auxInterest < 6.75 : factor = parseFloat(factors[years]['6.5']); break;
            case auxInterest >= 6.75 && auxInterest < 7    : factor = parseFloat(factors[years]['6.75']); break;
            case auxInterest === 7                         : factor = parseFloat(factors[years]['7']); break;
            default                                        : factor = parseFloat(factors[years]['0']); break;
        }

        let factor_amount = max_payment_allowed / factor;

        if (factor_amount === 'Infinity') {
            factor_amount = 0;
        }

        let max_loan_amount = Util.roundTo( factor_amount * 1000, 3);
        let max_purchase_price = Util.roundTo( max_loan_amount / (ltv_factor / 100), 3 );
        //let max_purchase_price = Util.roundTo( parseFloat(downPayment) + parseFloat(max_loan_amount), 3 );

        let down_payment_money = Util.roundTo( parseFloat(aux_downPayment) * max_purchase_price / 100, 3 );

        let flag = true;
        if(max_purchase_price <= 0){
            flag = false;
        }

        this.setState({ maxLoanExpected: max_loan_amount, maxPurchasePrice: max_purchase_price, downPaymentMoney: down_payment_money, homeInsurance: Util.roundTo(taxes_and_insurance_amount, 0), totalMonthlyPayment: available_amount, showResults: flag, negativeValues:!flag }, () => {
            if(this.state.showResults){
                this.monthlyPayment();
            }
        });
    }


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
        return this.state.interest/100/12;
    }

    monthlyPayment() {
        const years = Number(this.state.term.filter(obj => obj.selected)[0].title);
        const monthlyP = Util.roundTo( this.pmt(this.rate(), years * 12, -this.state.maxLoanExpected), 2 );

        const principal = parseFloat(monthlyP);
        const insurance = parseFloat(this.state.homeInsurance) ? parseFloat(this.state.homeInsurance) : 0;
        //const taxes = parseFloat(this.state.taxes) ? parseFloat(this.state.taxes) : 0;
        //const totalM = Util.formatMoney( Util.roundTo(principal + insurance + taxes, 0) );
        const totalM = Util.formatMoney( Util.roundTo(principal + insurance, 0) );

        this.setState({ monthlyPprincipal: monthlyP, showResults:true, totalMonthlyPayment: totalM });
    }


    renderPricesResults() {
        const {maxLoanExpected, maxPurchasePrice, downPayment, downPaymentMoney, totalMonthlyPayment, showChartResults, translations} = this.state;

		return (
            <React.Fragment>
                <h3 className="text-center mb-5 mpq-H3">{translations.howMuchHomeCanYouAffordText}</h3>
                <div className="row justify-content-center">
                    <div className="col-5 col-sm-4">
                        <img src={homePriceIcon} alt="Home price icon" className="loanIcons" />
                    </div>
                    <div className="col-7 npl-xs">
                        <h5>{translations.estimatedHomePriceText}</h5>
                        <span className="moneyLabelData">${Util.formatMoney(Util.roundTo(maxPurchasePrice, 0))}</span>
                    </div>
                    <hr className="mpq-line" />
                </div>

                <div className="row justify-content-center">
                    <div className="col-5 col-sm-4">
                        <img src={homeBankLender} alt="Home bank lender" className="loanIcons" />
                    </div>
                    <div className="col-7 npl-xs">
                        <h5>{translations.maximumMortgageLoanAmountText}</h5>
                        <span className="moneyLabelData">${Util.formatMoney(Util.roundTo(maxLoanExpected, 0))}</span>
                    </div>
                    <hr className="mpq-line" />
                </div>

                <div className="row justify-content-center">
                    <div className="col-5 col-sm-4">
                        <img src={homeDownPayment} alt="Home down payment" className="loanIcons loanIconsB" />
                    </div>
                    <div className="col-7 npl-xs">
                        <h5>{translations.downPaymentText} </h5>
                        <span className="moneyLabelData">${Util.formatMoney(Util.roundTo(downPaymentMoney, 2))} </span>({Number(downPayment.filter(obj => obj.selected)[0].value)}%)
                    </div>
                    <hr className="mpq-line" />
                </div>

                <div className="row justify-content-center">
                    <div className="col-5 col-sm-4">
                        <img src={mortgagePaymentIcon} alt="Estimated Monthly Payment" className="loanIcons loanIconsB" />
                    </div>
                    <div className="col-7 npl-xs">
                        <h5>{translations.estimatedMonthlyPaymentText} </h5>
                        <span className="moneyLabelData">${totalMonthlyPayment}</span>
                    </div>

                    <button className="btn btn-open-table" onClick={this.handleOpenChart}>
                        {!showChartResults ? translations.viewEstimatedMonthlyPaymentSummaryText : translations.hideExtraInformation }
                        <i className={showChartResults ? "arrow up" : "arrow down"}></i>
                    </button>
                </div>
            </React.Fragment>
        );
    }

    renderWarningMessage(){
        return (
            <div className="row justify-content-center">
                <div className="col-xs-12">
                    <h3 className="text-center mb-5 mpq-H3">{this.state.translations.howMuchHomeCanYouAffordText}</h3>
                </div>
                <div className="col-12">
                    <img src={homeWarningMessage} alt="home payments warning image" className="loanWarningIcon" />
                </div>
                <div className="col-xs-12 col-sm-10 pt-4">
                    <h3>Opps!</h3>
                    {/* <p>With this combination of Income and Debt monthly payment you are not in a good condition to qualify for a new House.</p> */}
                    <p>{this.state.translations.resultError}</p>
                </div>
            </div>
        );
    }

    renderChart(){
        const {translations, lan, monthlyPprincipal, homeInsurance, totalMonthlyPayment } = this.state;

        return (
        <div className={ this.state.showChartResults ? 'row mt-4' : 'hide' }>
            <div className="col-xs-12 col-md-7 col-lg-5">
                <h3 className="mpq-H3 mb-4">
                    <Tooltip className="special-tooltip" content={translations.estimatedMonthlyPaymentTooltip} />

                    {translations.estimatedMonthlyPaymentText}
                </h3>

                <div className="row">
                    <div className="col-8">
                        <label className="monthly-label blue-square">{translations.principal_InterestText}</label>
                    </div>

                    <div className="col-4 text-right">
                        <span className="monthly-principal-text">{`$${Util.roundTo(monthlyPprincipal)}`}</span>
                    </div>
                    <hr className="mpq-solid-line" />
                </div>

                <div className="row">
                    <div className="col-9 cus-col-9">
                        <label htmlFor="homeInsurance" className="monthly-label red-square">{translations.estimatedTaxesAndInsuranceText}</label>
                    </div>

                    <div className="col-3 cus-col-3 p-relative">
                        {/* <span className="plusIcon">+</span> */}
                        <span className="dolarIcon">$</span>

                        <NumberFormat
                            id="homeInsurance2"
                            name="homeInsurance"
                            value={homeInsurance}
                            className="monthly-input"
                            thousandSeparator={false}
                            allowNegative={false}
                            onValueChange={ (values) => {
                                //values is an object that contains:
                                // formattedValue = $2,223
                                // value ie, 2223
                                const {value} = values;

                                this.handleChange({name: "homeInsurance", value: value});
                            }}
                        />
                    </div>
                    <hr className="mpq-solid-line" />
                </div>

                {/* <div className="row">
                    <div className="col-9">
                        <label htmlFor="taxes" className="monthly-label green-square">Property taxes</label>
                    </div>

                    <div className="col-3 p-relative">
                        <span className="plusIcon">+</span>
                        <span className="dolarIcon">$</span> */}
                        {/* <input
                            id="taxes"
                            name="taxes"
                            type="number"
                            value={ isNaN(taxes) ? 0 : taxes }
                            className="monthly-input"
                            onChange={(e) => {
                                this.handleChange(e.target);
                            }}
                        /> */}

                        {/* <NumberFormat
                            id="taxes2"
                            name="taxes"
                            value={taxes}
                            className="monthly-input"
                            thousandSeparator={false}
                            allowNegative={false}
                            onValueChange={ (values) => {
                                //values is an object that contains:
                                // formattedValue = $2,223
                                // value ie, 2223
                                const {value} = values;

                                this.handleChange({name: "taxes", value: value});
                            }}
                        />
                    </div>
                    <hr className="mpq-solid-line" />
                </div> */}

                <div className="row">
                    <div className="col-8 col-sm-9 total-mp-label">
                        <label className="monthly-label">{translations.totalMonthlyPaymentText}</label>
                    </div>

                    <div className="col-4 col-sm-3 pr-0 pl-0 text-right">
                        <span className="total-monthly-principal-text">{`$${totalMonthlyPayment}`}</span>
                    </div>
                </div>

            </div>
            <div className="col-xs-12 col-md-5 col-lg-7 d-none d-md-block">
                {/* <DoughnutChart lan={lan} principal={monthlyPprincipal} insurance={homeInsurance} taxes={taxes} total={totalMonthlyPayment}/> */}
                <DoughnutChart lan={lan} principal={monthlyPprincipal} insurance={homeInsurance} total={totalMonthlyPayment}/>
            </div>
        </div>
        );
    }

    scrollTo(selector) {
        scroller.scrollTo(selector, {
            duration: 800,
            delay: 0,
            offset: -100,
            smooth: 'easeInOutQuart',
        })
    }

    render() {

        const {income, interest, term, monthlyDebt, downPayment, translations, lan, maxLoanExpected, maxPurchasePrice, downPaymentMoney, monthlyPprincipal, homeInsurance, taxes, totalMonthlyPayment } = this.state;

        const {title, btnLabel} = this.props;
        return (
            <div className="container mortgage-prequalifying-calculator-wrapper">

                <div className="row justify-content-center mortgage-prequalifying-form-container">
                    <div className="col-xs-12 col-md-7 col-lg-5">
                        {title && <h3 className="mortgage-prequalifying-titles">{title}</h3>}

                        <form id="mbp-calculator" onSubmit={this.handleSubmit.bind(this)} >

                            <div className="row form-group mt-3">
                                <InputGroup
                                    id='mprequalifying_income'
                                    label={translations.monthlyIncomeText}
                                    name='income'
                                    value={income}
                                    icon='$'
                                    iconPosition='left'
                                    tooltipContent={translations.monthlyIncomeTooltip}
                                    errorOccur={(Number(income) < 1 || Number(income) > 10000000 || Number(income) < Number(monthlyDebt) || isNaN(income) ) ? 1 : 0}
                                    errorMsg={translations.monthlyIncomeError}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="row form-group mt-3">
                                <InputGroup
                                    id='mprequalifying_monthly_debt'
                                    label={translations.monthlyDebtText}
                                    name='monthlyDebt'
                                    value={monthlyDebt}
                                    icon='$'
                                    iconPosition='left'
                                    tooltipContent={translations.monthlyDebtTooltip}
                                    errorOccur={(Number(monthlyDebt) < 1 || Number(monthlyDebt) > 10000000 || isNaN(monthlyDebt) || monthlyDebt > income) ? 1 : 0}
                                    errorMsg={translations.monthlyDebtError}
                                    onChange={this.handleChange}
                                />
                            </div>

                           {/*  <div className="row form-group mt-3">
                                <InputGroup
                                    id='mprequalifying_down_payment'
                                    label="Down Payment"
                                    name='downPayment'
                                    value={downPayment}
                                    icon='$'
                                    iconPosition='left'
                                    tooltipContent="A representation of the money you are able to pay as a downpayment for your house"
                                    errorOccur={(Number(downPayment) < 0 || Number(downPayment) > 1000000 || downPayment === '' || isNaN(downPayment)) ? 1 : 0}
                                    errorMsg="Invalid number. Insert a value between 0 and 1000000."
                                    onChange={this.handleChange}
                                />
                            </div> */}
                            <div className="row form-group no-gutters mt-3">
                                <div className="col-12 loan-term-label-wrap">
                                    <Tooltip content={translations.downPaymentTooltip} />
                                    <label className="extra-fields-label loan-label">{translations.downPaymentText}</label>
                                </div>
                                <div className="col-12">
                                    <Dropdown
                                        name="downPayment"
                                        list={downPayment}
                                        handleBPSelect={this.handleBPSelect}
                                    />
                                </div>
                            </div>

                            <div className="row form-group no-gutters mt-3">
                                <div className="col-12 loan-term-label-wrap">
                                    <Tooltip content={translations.loanTermTooltip} />
                                    <label className="extra-fields-label loan-label">{translations.loanTermText}</label>
                                </div>
                                <div className="col-12">
                                    <Dropdown
                                        lan={lan}
                                        name="term"
                                        list={term}
                                        handleBPSelect={this.handleBPSelect}
                                    />
                                </div>
                            </div>

                            <div className="row form-group mt-3">
                                <InputGroup
                                    id='mprequalifying_interest'
                                    label={translations.anualInterestRateText}
                                    name='interest'
                                    value={interest}
                                    icon='%'
                                    iconPosition='right'
                                    tooltipContent={translations.anualInterestRateTooltip}
                                    errorOccur={(Number(interest) < 0 || Number(interest) > 7 || isNaN(interest)) ? 1 : 0}
                                    errorMsg={translations.anualInterestRateError}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="mt-4 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block"
                                    disabled={ Number(income)      < 1 || Number(income)        > 1000000 || isNaN(income)      ||
                                               Number(monthlyDebt) < 1 || Number(monthlyDebt)   > Number(income)                || isNaN(monthlyDebt) ||
                                               Number(interest)    < 0 || Number(interest)      > 10      || isNaN(interest)
                                             }
                                >
                                    { btnLabel }
                                </button>
                            </div>

                        </form>
                    </div>

                    <div className={`${!this.state.showResults && !this.state.negativeValues ? 'hide' : ''} col-xs-12 col-md-5 col-lg-7`}>
                        {this.state.showResults && this.renderPricesResults()}
                        {this.state.negativeValues && this.renderWarningMessage()}
                    </div>

                </div>{/* End of row */}

                { this.state.showChartResults && this.renderChart() }

            </div>
        );

    }//End of render

}
export default App;