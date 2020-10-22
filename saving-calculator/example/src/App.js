import React, { Component } from 'react';
import Util from "./Utils";
import getTranslations from './language';
import InputGroup from './components/inputGourp';
import Table from './components/table.jsx'
import Tooltip from './components/tooltip.jsx'

import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        const languages = getTranslations(props.lan);
        this.state = {
            lan : props.lan,
            translations : languages,

            amount: '-',
            deposit: '0',
            interest: 0,
            years: '-',
            compound: [
                {
                    id: 0,
                    title: languages.monthlyText,
                    value: 12,
                    selected: true
                },
                {
                    id: 1,
                    title: languages.quarterlyText,
                    value: 4,
                    selected: false
                },
                {
                    id: 2,
                    title: languages.semianuallyText,
                    value: 2,
                    selected: false
                },
                {
                    id: 3,
                    title: languages.anuallyText,
                    value: 1,
                    selected: false
                }
            ],
            showResults : false,
            tableColumns : [
                languages.yearPluralTextCaipal,
                languages.yearlyDepositText,
                languages.totalInterestText,
                languages.totalDepositText,
                languages.depositPlusInterestText,
                languages.totalBalanceText,
            ],
            tableResults : [],
            loading: false,
        };

    }//End of Constructor


    handleChange = (properties) => {
        let boxModel = {...this.state};
        boxModel[properties.name] = properties.value;

        this.setState(boxModel);
    }

    handleSelectChange = e => {
        const {value} = e.target;

        //Updating List of Percentages
        let tempCompound = JSON.parse(JSON.stringify(this.state.compound));
        tempCompound.forEach(item => (item.selected = false));
        tempCompound.filter(item => item.value === Number(value))[0].selected = true;

        this.setState({ compound: tempCompound });
    }

    handleSubmit(e){
        e.preventDefault();

        const amount   = Number(this.state.amount);
        const deposit  = this.state.deposit === '' ? 0 : Number(this.state.deposit);
        const interest = Number(this.state.interest);
        const compoun  = Number(this.state.compound.filter(item=>item.selected)[0].value);
        const years    = Number(this.state.years);

        let balance = amount;
        let interest_rate = 0;
        let yearly_deposit = 0;
        //let result = 0;
        let returns = 0;
        let year_interest = 0;
        let total_deposit = 0;
        let total_interest = 0;
        //let aux_balance = 0;
        let aux_tableResults = [];
        for (let year = 1; year <= years; year++) {
            // Doing Math
/*             aux_balance = 0;
            yearly_deposit = deposit * 12;
            interest_rate = Math.pow(1 + ((interest / 100) / compoun), compoun * year );
            //interest_rate = Math.pow(1 + (interest / 100) / compoun, compoun );

            result = parseFloat(balance) * parseFloat(interest_rate);
            total_interest = result - balance;
            total_deposit += parseFloat(yearly_deposit);
            aux_balance = parseFloat(result) + parseFloat(total_deposit); */

            yearly_deposit = parseFloat(deposit) * 12;
            balance += parseFloat(yearly_deposit);
            interest_rate = Math.pow(1 + (interest / 100) / compoun, compoun);
            returns = parseFloat(balance) * parseFloat(interest_rate);
            year_interest  = parseFloat(returns - balance);
            total_deposit += parseFloat(yearly_deposit);
            total_interest += parseFloat(year_interest);
            balance += parseFloat(year_interest);

            /* aux_tableResults.push({
                year: year,
                yearly_deposit: '$' + Util.formatMoney( Util.roundTo(yearly_deposit, 2) ),
                year_interest: '$' + Util.formatMoney( Util.roundTo(total_interest, 2) ),
                total_deposit: '$' + Util.formatMoney( Util.roundTo(total_deposit, 2) ),
                total_interest: '$' + Util.formatMoney( Util.roundTo(result, 2) ),
                balance: '$' + Util.formatMoney( Util.roundTo(aux_balance, 2) ),
            }); */

            aux_tableResults.push({
                year: year,
                yearly_deposit: '$' + Util.formatMoney( Util.roundTo(yearly_deposit, 2) ),
                year_interest: '$' + Util.formatMoney( Util.roundTo(year_interest, 2) ),
                total_deposit: '$' + Util.formatMoney( Util.roundTo(total_deposit, 2) ),
                total_interest: '$' + Util.formatMoney( Util.roundTo(total_interest, 2) ),
                balance: '$' + Util.formatMoney( Util.roundTo(balance, 2) ),
            });

        }

        this.setState({
            showResults: true,
            tableResults: aux_tableResults,
            loading : false
        });

    }

    renderResults = colors => {
        const {amount, tableResults, translations} = this.state;
        const auxResults = [...tableResults];
        const lastRow = auxResults.pop();

        return (
            <React.Fragment>
                <h2>{translations.savingsBreakdownText}:</h2>
                <table className="table text-right ssavings-right-table">
                    <tbody>
                        <tr>
                            <td>
                                <div className="savings-result-value">{translations.initialDepositText}</div>
                            </td>
                            <td>
                                <div className="savingsR3">
                                    + ${Util.formatMoney(amount)} {Util.countDecimalPlaces(amount) === 1 && '0'}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="savings-result-value">{translations.totalContributionsText}</div>
                            </td>
                            <td>
                                <div className="savings-result-value savingsR2">+ {lastRow.total_deposit}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="savings-result-value">{translations.interestEarnedtext}</div>
                            </td>
                            <td>
                                <div className="savings-result-value savingsR1">+ {lastRow.total_interest}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-right pr-3">
                    <span>{translations.totalSavingstext}</span>
                    <span className="savings-general-result">{lastRow.balance}</span>
                </div>
            </React.Fragment>
        );
    }

    renderSentenceResults = () => {
        const {lan, amount, deposit, interest, compound, years, tableResults} = this.state;
        const auxResults = [...tableResults];
        const lastRow = auxResults.pop();

        if(lan === 'en' || lan === 'ca'){
            return (<p className="inWordsResults">
                {/* <strong>Summary:</strong> With an initial deposit of <i>{'$'+Util.formatMoney(amount)}</i> and a monthly deposit of <i>{'$' + Util.formatMoney(deposit)}</i> you will be paying <i>{interest + '%'}</i> annual interest compounded <i>{compound.filter(item=>item.selected)[0].title}</i> for <i>{years} {years>1 ? 'years' : 'year'}</i> , you will be saving a total of <i>{lastRow.balance}</i> */}
                <strong>Summary:</strong> If you save <i>{'$' + Util.formatMoney(deposit)}</i> every month with an initial deposit of <i>{'$'+Util.formatMoney(amount)}</i> and <i>{interest + '%'}</i> as APR from the bank compounded <i>{compound.filter(item=>item.selected)[0].title}</i>, in <i>{years} {years>1 ? 'years' : 'year'}</i> you would be saving a total of <i>{lastRow.balance}</i>.
            </p>);
        }else{
            return (<p className="inWordsResults">
                <strong>Resumen:</strong> Si deposita <i>{'$' + amount}</i> y luego <i>{'$' + Util.formatMoney(deposit)}</i> mensualmente en una cuenta que paga un interés anual del {interest + '%'} compuesto <i>{compound.filter(item=>item.selected)[0].title}</i> durante <i>{years} {years>1 ? 'años' : 'año'}</i>, ahorrará un total de <i>{lastRow.balance}</i>
            </p>);
        }
    }

    render() {
        const {amount, deposit, interest, years, compound, translations} = this.state;
        const {title, btnLabel, colors} = this.props;
        return (
            <div className="container ssavings-calculator-wrapper">

                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-7">
                        <h2 className="mb-0">{title}</h2>

                        <form id="simple-savings-calculator" onSubmit={this.handleSubmit.bind(this)} >

                            <InputGroup
                                id='ssc_amount'
                                label={translations.amountLabel}
                                name='amount'
                                icon='$'
                                iconPosition='left'
                                tooltipContent={translations.amountHelpText}
                                errorOccur={(Number(amount) < 1 || Number(amount) > 1000000 || amount === '') ? 1 : 0}
                                errorMsg={translations.moneyFieldError}
                                onChange={this.handleChange}
                            />

                            <InputGroup
                                id='ssc_deposit'
                                label={translations.monthlyDepositLabel}
                                name='deposit'
                                icon='$'
                                iconPosition='left'
                                tooltipContent={translations.monthlyDepositHelpText}
                                errorOccur={( (Number(deposit) < 1 && Number(deposit) !== 0) || Number(deposit) > 1000000 ) ? 1 : 0}
                                errorMsg={translations.moneyFieldError}
                                onChange={this.handleChange}
                            />

                            <InputGroup
                                id='ssc_interest'
                                label={translations.interestLabel}
                                name='interest'
                                icon='%'
                                iconPosition='right'
                                tooltipContent={translations.interestRateHelpText}
                                errorOccur={(Number(interest) < 0 || Number(interest) > 100 || interest === '') ? 1 : 0}
                                errorMsg={translations.percentageFieldError}
                                onChange={this.handleChange}
                            />

                            <div className="row form-group">
                                <label htmlFor='ssc_compounding' className="col-sm-5 col-xl-4 col-form-label">
                                    <Tooltip content={translations.compoundingHelpText} /> {translations.compoundingLabel}
                                </label>

                                <div className="col-sm-7 col-xl-8">
                                    <select
                                        id='ssc_compounding'
                                        name='compounding'
                                        value={compound.filter(item => item.selected)[0].value}
                                        className='form-control'
                                        onChange={this.handleSelectChange.bind(this)}
                                    >
                                        { compound.map( item => <option key={item.id} value={item.value} >{item.title}</option>) }
                                    </select>
                                </div>
                            </div>

                            <InputGroup
                                id='ssc_years'
                                label={translations.NoOfYearsLabel}
                                name='years'
                                icon={false}
                                tooltipContent={translations.NoOfYearsHelpText}
                                errorOccur={ (!Util.valueIsInteger(years) || Number(years) < 0 || Number(years) > 100 || years === '' ) ? 1 : 0}
                                errorMsg={translations.yearsError}
                                onChange={this.handleChange}
                            />

                            <div className="mt-3 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block"
                                    disabled={ Number(amount)    < 1 || Number(amount)   > 1000000 || amount === ''   || amount === '-'  ||
                                             ( Number(deposit)   < 1 && Number(deposit) !== 0 )    || Number(deposit)  > 1000000 ||
                                               Number(interest) <= 0 || Number(interest) > 100     || interest === '' || Number(years) <= 0 ||
                                               Number(years)   > 100 || years === '' || years === '-' || !Util.valueIsInteger(years) }
                                >
                                    { btnLabel }
                                </button>
                            </div>
                        </form>
                    </div>

                    <div id="ssavingsResults" className="col-sm-12 col-md-8 col-lg-5 text-right rightResults" style={{display: this.state.loading || this.state.showResults ? 'block' : 'none' }} >
                        {this.state.showResults && this.renderResults(colors)}
                    </div>
                </div>{/* End of row */}

                <div className="row" style={{display: this.state.showResults ? 'block' : 'none' }} >
                    <div className="col">{this.state.showResults && this.renderSentenceResults()}</div>

                    <div className="col-lg-12 mt-3">
                        <div id="paymentResults">
                            <h3>{this.state.translations.tableResultsTitle}</h3>
                            <div className="table-responsive scrolling-table underlined-tbody">
                                <Table columns={this.state.tableColumns} data={this.state.tableResults} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

    }//End of render

}
export default App;
