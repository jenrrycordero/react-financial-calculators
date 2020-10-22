import React from "react";
import Util from '../Utils'

const CalculatorResults = ({state, onChangeAmortization, monthlyPayment, estimateMaximumLoan}) => {

    const {
        amount,
        downPayment,
        mortgageTotals,
        showAmortization,
        translations,
        formType
    } = state;

    let resultTitle = translations.monthlyPaymentsTitle;
    let estimate = monthlyPayment;

    if (formType === 'qualify') {
        resultTitle = translations.estimateMaximumLoan;
        estimate = estimateMaximumLoan;
    }

    return (
        <React.Fragment>
            <div className="mt-5 text-center">
                <h3 className="loan-titles" id="renderResultTitle">{resultTitle}</h3>
            </div>
            <div className="mp-result mb-5">
                <div className="mp-dolar-sign">$</div>
                <div className="mp-dolar-numbers">{ Util.formatMoney( Util.roundTo(estimate,2)) }</div>
            </div>
            <div className="text-left">

                <div className="row">
                    <div className="col-7">{translations.totalPrincipalPaid}</div>
                    <div className="col-5 text-black">{ '$' + Util.formatMoney( Util.roundTo(amount-downPayment, 2) ) }</div>
                </div>

                <hr className="mp-results-line" />

                <div className="row">
                    <div className="col-7">{translations.totalInterestPaid}</div>
                    <div className="col-5 text-black">{'$' + Util.formatMoney( Util.roundTo(mortgageTotals.interestPaid, 2) ) }</div>
                </div>

                <button className="btn loan-btn-go-table" onClick={onChangeAmortization}>
                    {showAmortization ? translations.hideAmortizationBtnText : translations.showAmortizationBtnText }
                    <i className={showAmortization ? "arrow up" : "arrow down"}></i>
                </button>

            </div>
        </React.Fragment>
    );
}

export default CalculatorResults;
