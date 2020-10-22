import React, { Component } from 'react';
import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import PieChart from "./components/PieChart/PieChart";

import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        const languages = getTranslations(props.lan);
        this.state = {
            lan : props.lan,
            translations : languages,
            incomeFields: [
                {
                    id : "i_yourMonthlyIncome",
                    label : languages.yourMonthlyIncome,
                    value : '-',
                },
                {
                    id : "i_partnerMonthlyIncome",
                    label : languages.partnerMonthlyIncome,
                    value : '-',
                },
                {
                    id : "i_alimoneyChildSupport",
                    label : languages.alimoneyChildSupport,
                    value : '-',
                },
                {
                    id : "i_pensionRetirementReceived",
                    label : languages.pensionRetirementReceived,
                    value : '-',
                },
                {
                    id : "i_socialSecurityReceived",
                    label : languages.socialSecurityReceived,
                    value : '-',
                },
                {
                    id : "i_governmentAssistance",
                    label : languages.governmentAssistance,
                    value : '-',
                },
                {
                    id : "i_otherMonthlyIncome",
                    label : languages.otherMonthlyIncome,
                    value : '-',
                },
            ],
            totalIncome: '0',
            debtFields: [
                {
                    id : "d_rentMortgage",
                    label : languages.rentMortgage,
                    value : '-',
                },
                {
                    id : "d_carPayments",
                    label : languages.carPayments,
                    value : '-',
                },
                /* {
                    id : "d_carInsurance",
                    label : languages.carInsurance,
                    value : '-',
                },
                {
                    id : "d_privateHealthInsurance",
                    label : languages.privateHealthInsurance,
                    value : '-',
                }, */
                {
                    id : "d_medicalDentalBillPayments",
                    label : languages.medicalDentalBillPayments,
                    value : '-',
                },
                {
                    id : "d_alimonyChildSupportPayments",
                    label : languages.alimonyChildSupportPayments,
                    value : '-',
                },
                {
                    id : "d_totalMonthlyCreditCardPayments",
                    label : languages.totalMonthlyCreditCardPayments,
                    value : '-',
                },
                {
                    id : "d_studentLoanPayments",
                    label : languages.studentLoanPayments,
                    value : '-',
                },
                {
                    id : "d_applianceFurniturePayments",
                    label : languages.applianceFurniturePayments,
                    value : '-',
                },
                {
                    id : "d_otherLoanPayments",
                    label : languages.otherLoanPayments,
                    value : '-',
                },
            ],
            totalDebt: '0',
            showResults : false,
            ratio: '0',
        };

    }//End of Constructor

    handleChange = (prop) => {
        let incomeModel = [...this.state.incomeFields];
        let debtModel = [...this.state.debtFields];
        let totali = 0;
        let totald = 0;
        let auxVal = 0;
        if( prop.name.charAt(0) === 'i' ){
            totali = 0;
            incomeModel.forEach( current => {
                if(current.id === prop.name){
                    current.value = prop.value;
                }

                auxVal = (current.value === "" || current.value === "-") ? 0 : current.value;
                totali += parseFloat(auxVal);
            } );

            this.setState( {incomeFields: incomeModel, totalIncome: totali, showResults: false} );
        }else{
            totald = 0;
            debtModel.forEach( current => {
                if(current.id === prop.name){
                    current.value = prop.value;
                }

                auxVal = (current.value === "" || current.value === "-") ? 0 : current.value;
                totald += parseFloat(auxVal);
            } );

            this.setState( {debtFields: debtModel, totalDebt: totald, showResults: false} );
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const {totalIncome, totalDebt} = this.state;
        let auxRatio = Math.round((totalDebt / totalIncome) * 100);

        this.setState({showResults: true, ratio: auxRatio});
    }

    renderDTIRBar = () => {
        const ratioResult = Number(this.state.ratio) - 3;
        return (
            <React.Fragment>
                <div className="dti-color-bar">
                    <div className="dti-ratio-number" style={ {marginLeft: ratioResult + "%" }}>{`${this.state.ratio}%`}</div>
                    <div className="dti-pointing-arrow" style={ {marginLeft: ratioResult + "%" }}></div>

                    <div className="dti-safe-percent">{ this.state.translations.safeWord }</div>
                    <div className="dti-ok-percent">{ this.state.translations.okWord }</div>
                    <div className="dti-dangrer-percent">{ this.state.translations.stressfulWord }</div>

                    <div className="dti-breackpoint36">36%</div>
                    <div className="dti-breackpoint50">45%</div>
                </div>
            </React.Fragment>
        );
    }

    renderGeneralResults = () => {
        return (
            <div className="dti-general-results">
                <h4>{ this.state.translations.totalIncomeText }: <span className="money-font">{ '$' + Util.formatMoney( this.state.totalIncome ) }</span></h4>
                <h4>{ this.state.translations.totalDebtText   }: <span className="money-font">{ '$' + Util.formatMoney( this.state.totalDebt ) }</span></h4>
                <h4>{ this.state.translations.debtRatioText   }: <span className="ratio-font">{ this.state.ratio + '%' }</span></h4>
            </div>
        );
    }

    renderSentenceResults = () => {
        const {lan, ratio} = this.state;
        let ratioWords = '';
        const auxRatio = Number(ratio);
        if(lan === 'en' || lan === 'ca'){
            switch(true){
                //If your debt-to-income ratio is 36% or less:
                case auxRatio < 36: ratioWords = 'This is a healthy debt load for most people. As long as your credit score is good, you should be able to get approved for a new loan.';
                break;
                //If your debt-to-income ratio is 36% - 45%:
                case auxRatio >= 36 && auxRatio <= 45: ratioWords = 'You may want to explore options to reduce debt. Your DTI could make it hard to get approved for new financing if you need a loan.';
                break;
                //If your debt-to-income ratio is greater than 45%:
                case auxRatio > 45: ratioWords = 'You have too much debt and need to take immediate action to avoid financial distress. Talk to a credit counselor to explore debt relief options.';
                break;
                default: ratioWords = ''; break;
            }
        }else{
            switch(true){
                //Si la Razón deuda-a-ingreso es 36% o menos:
                case (auxRatio < 36): ratioWords = 'Esta es una carga de deuda saludable para la mayoría de las personas. Mientras tu puntaje de crédito sea bueno, deberías poder obtener la aprobación para un nuevo préstamo.';
                break;
                //Si la Razón deuda-a-ingreso es 36% - 45%:
                case auxRatio >= 36 && auxRatio <= 45: ratioWords = 'Es posible que debas explorar otras opciones para reducir tu deuda. Tu relación deuda-ingreso podría dificultar la aprobación de un nuevo financiamiento si necesitas un préstamo.';
                break;
                //Si la Razón deuda-a-ingreso es 45% o más:
                case auxRatio > 45: ratioWords = 'Usted Tiene demasiada deuda y necesita tomar medidas inmediatas para evitar problemas financieros. Hable con un asesor de crédito para explorar las opciones de alivio de deuda disponibles.';
                break;
                default: ratioWords = ''; break;
            }
        }

        return (<small className="d-block black-p">{ratioWords}</small>);
    }

    renderPiChart = () =>{
        const income = parseFloat(this.state.totalIncome);
        const debt = parseFloat(this.state.totalDebt);
        const remaining = income - debt;

        const deb_per = (debt*100) / income;
        const rem_per = (remaining*100) / income;

        const data = {
            Debts: {
                name: this.state.translations.debtText ,
                percent: Math.round(deb_per),
                price: '$' + Util.formatMoney(this.state.totalDebt).replace('.00', '')
            },
            Remainings: {
                name: this.state.translations.remainingsText ,
                percent: Math.round(rem_per),
                price: '$' + Util.formatMoney(remaining).replace('.00', '')
            },
        };

        return (<PieChart data={data} className="pie-chart-wrapper" />);
    }

    renderHelpText = () => {
        const auxRatio = Number(this.state.ratio);
        switch(true){
            case (auxRatio < 36): return (<div className="dti-chart-help">{this.state.translations.chartHelpAText}</div>) ;
            break;
            case auxRatio >= 36 && auxRatio <= 45: return (<div className="dti-chart-help">{this.state.translations.chartHelpBText}</div>);
            break;
            case auxRatio > 45: return (<div className="dti-chart-help">{this.state.translations.chartHelpCText}</div>);
            break;
            default: return ''; break;
        }

        /* if( Number(this.state.ratio) < 50 ){
            return (<div className="dti-chart-help">{this.state.translations.chartHelpAText}</div>);
        }else{
            return (<div className="dti-chart-help">{this.state.translations.chartHelpBText}</div>);
        } */
    }

    render() {
        const {incomeFields, totalIncome, debtFields, totalDebt, translations} = this.state;
        const {btnLabel, colors} = this.props;
        return (
            <div className="container dti-calculator-wrapper">

                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-10 col-md-9 col-lg-6">

                        <form id="DTI-calculator" onSubmit={this.handleSubmit.bind(this)} >
                            <h4>{translations.monthlyIncomeText}<small>*</small></h4>

                            {   incomeFields.map( item => {
                                    return (<div key={item.id}>
                                        <InputGroup
                                            id={item.id}
                                            label={item.label}
                                            value={item.value}
                                            name={item.id}
                                            errorOccur={totalDebt > totalIncome}
                                            onChange={this.handleChange}
                                        />
                                    </div>);
                                })
                            }

                            <h4 className="mt-4">{translations.monthlyDebtPaymentsText}<small>*</small></h4>

                            {   debtFields.map( item => {
                                    return (<div key={item.id}>
                                        <InputGroup
                                            id={item.id}
                                            label={item.label}
                                            value={item.value}
                                            name={item.id}
                                            errorOccur={totalDebt > totalIncome}
                                            onChange={this.handleChange}
                                        />
                                    </div>);
                                })
                            }

                            <div className={`text-right mt-3 dti-error ${ (totalDebt > totalIncome) ? 'd-block' : 'd-none' }`}>{translations.fieldsErrorMessage}</div>

                            <div className="mt-4 mb-2">
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-dti btn-block"
                                    disabled={ (totalIncome <= 0 || totalIncome === '0') || (totalDebt <= 0 || totalDebt === '0') || totalDebt >= totalIncome }
                                >
                                    { btnLabel }
                                </button>
                            </div>

                        </form>
                        <small><span className="help-asterisk">*</span> { translations.helpText }</small>
                    </div>

                    <div className={`col-xs-12 col-lg-6 dti-results ${this.state.showResults ? 'dti-show' : 'dti-hide'}` }>
                        <h3 className="mt-0 mb-4 text-center dti-results-title">{translations.resultsBreakdown}</h3>
                        { this.state.showResults && this.renderGeneralResults() }
                        { this.state.showResults && this.renderDTIRBar() }
                        { this.state.showResults && this.renderSentenceResults() }
                        <h4 className="dti-chart-title">{translations.monthlyIncomeText}</h4>
                        { this.state.showResults && this.renderPiChart() }
                        { this.state.showResults && this.renderHelpText() }
                    </div>

                </div>{/* End of row */}

                <div className="row" style={{display: this.state.showResults ? 'block' : 'none' }} >
                    <div className="col-lg-12 mt-3">
                        <div id="paymentResults"> </div>
                    </div>
                </div>

            </div>
        );

    }//End of render

}
export default App;
