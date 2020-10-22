import React from "react";
import TableHeader from "./tableHeader.jsx";
import TableBody from "./tableBody.jsx";
import Tooltip from "./tooltip";
import DatePicker from "react-datepicker";
import Util from "../Utils";

const Table = ({ columns, data }) => {
  return (
    <table className="table table-bordered table-hover">
      <TableHeader columns={columns}/>
      <TableBody data={data} />
    </table>
  );
};

const TableResults = ({state, onHandleDateChange}) => {

    const {
        lan,
        translations,
        startDate,
        dateToFinish,

        tableColumns,
        tableResults

    } = state;

    return (
        <div className="container row results-container">
            <hr className="mp-results-line"/>
            <div id="autoLoanPaymentResults" className="col-sm-12">
                <div className="row form-group mb-3">
                    <div className="col-xs-12 col-sm-6">
                        <label htmlFor="loan-start-date" className="col-12 loan-label p-0">
                            <Tooltip content={ translations.startDateHelpText } /> {translations.startDateText} *
                        </label>

                        <DatePicker
                            id="loan-start-date"
                            className="form-control"
                            locale={lan} //could be "es"
                            minDate={new Date()}
                            maxDate={Util.getEndLimitDate(90)}
                            selected={startDate}
                            onChange={onHandleDateChange}
                            isClearable
                            placeholderText={translations.selectDatePlaceholder}
                        />
                        <small><i>{translations.dateHelpMessage}</i></small>
                    </div>

                    <div className={startDate ? 'col-xs-12 col-sm-6 text-right' : 'hide' }>
                        <div className="pr-4">
                            <h3 className="loan-titles">{translations.estimatedPayoffDate}</h3>
                            <div className="end-date-result">
                                { translations.fullMonths[dateToFinish.getMonth()]+' '+dateToFinish.getDate()+', '+dateToFinish.getFullYear() }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8 relative-loan-wrapper">
                        <Tooltip content={ translations.amortizationTableHelp } />
                        <h3>{ translations.amortizationSchedule }</h3>
                    </div>
                </div>

                <div className="table-responsive scrolling-table underlined-tbody">
                    { startDate && <Table columns={tableColumns} data={tableResults} /> }
                </div>
                <p className={startDate ? 'hide' : 'show' }>{ translations.startingDateEmptyText }</p>

            </div>
        </div>
    );
}

export default TableResults;
