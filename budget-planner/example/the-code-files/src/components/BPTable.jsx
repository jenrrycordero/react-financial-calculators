import React, {Component} from "react";
import { Row, Col } from 'react-bootstrap';
import Util from '../Utils';

class Table extends Component {
    constructor(props){
        super(props);

        this.languages = {
            en: {
                remove : "Remove",
                cost: "Cost",
                noData: "There is no Data on this table",
                add: "Add",
                newExpense: "New Expense",
                inputError: "This field can not be empty",
            },
            es: {
                remove : "Eliminar",
                cost: "Costo",
                noData: "No hay datos disponibles",
                add: "Agregar",
                newExpense: "Nuevos Gastos",
                inputError: "Este campo no puede estar vacío",
            },
            ca: {
                remove : "Remove",
                cost: "Cost",
                noData: "There is no Data on this table",
                add: "Add",
                newExpense: "New Expense",
                inputError: "This field can not be empty",
            },
            fr: {
                remove : "Remove",
                cost: "Cost",
                noData: "There is no Data on this table",
                add: "Add",
                newExpense: "New Expense",
                inputError: "This field can not be empty",
            }
        }

        this.translations = this.languages[this.props.lan];

        this.state = {
            category: this.props.cat,
            activeteError: false,
        }

        this.props.cat.rows.forEach( (item, index) => {
            this[`${this.props.cat.id}_${index}_amount`] = React.createRef();
        });
    }

    handleClickEvent = e =>{
        const category = this.state.category;
        category.focusInput = e.target.id;

        this.setState({category}/* , this.props.onChange(this.state.category) */);
    }

    handleInputFocus = e =>{
        const category = this.state.category;
        category.focusInput = e.target.id;

        var temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;

        this.setState({category});
    }

    moveCaretAtEnd(e) {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    handleTableInputChange = e =>{
        const {id, value} = e.target;

        const strArrId = id.split("_");
        const rowId = strArrId[1];
        const cellId = strArrId[2];

        const category = this.state.category;
        category.rows[rowId].td[cellId] = value;

        this.setState({category});
    }

    handleAmountChange = e => {
      const {id, value} = e.target;

      if( (/^\d*[.]?\d{0,2}$/.test(String(value))) ){
        const strArrId = id.split("_");
        const rowId = strArrId[1];

        const category = this.state.category;
        category.rows[rowId].amount = value.replace(/^0+/, '');

        let auxSum = 0;
        category.rows.forEach(item => {
            const a_val = item.amount==='' ? 0 : item.amount;
            auxSum += parseFloat(a_val);
        });

        const resultSum = parseFloat(category.moneyValue) - auxSum;
        category.moneyBudget = isNaN(resultSum) ? 0 : Util.roundTo(resultSum, 2);

        this.setState({category}, this.props.onChange(this.state.category));
      }
    }

    handleRowRemove = index =>{
        const category = this.state.category;
        category.rows = category.rows.filter( row => row.id !== index );

        let auxSum = 0;
        category.rows.forEach((item, i) => {
            item.id = i;
            auxSum += parseFloat(item.amount);
        });

        const resultSum = parseFloat(category.moneyValue) - auxSum;
        category.moneyBudget = isNaN(resultSum) ? 0 : Util.roundTo(resultSum, 2);

        delete this[`${category.id}_${index}_amount`];

      this.setState({category}, this.props.onChange(this.state.category));
    }

    handleBlurEvent = e => {
      const {id, value} = e.target;

      const strArrId = id.split("_");
      const rowId = strArrId[1];

      const category = this.state.category;
      category.rows[rowId].amount = value === '' ? 0 : value;
      category.focusInput = null;

      this.setState({category}/* , this.props.onChange(this.state.category) */);
    }

    handleRowAdd = () =>{
        let activeteError = false;
        const catId = this.state.category.id;
        const auxId = catId+'_label';

        const aux_value = document.getElementById(auxId).value;

        if(aux_value !== ''){
            const category = this.state.category;

            let auxObj = {
                id : category.tableHasRows ? category.rows.length : 0,
                td : [aux_value],
                amount : 0,
            }

            if(category.columns.length > 1){
                category.columns.forEach( (th, i) => {
                    if(i !== 0)
                        auxObj.td.push('');
                });
            }

            if(!category.tableHasRows){
                category.rows = [];
            }

            category.rows.push(auxObj);
            category.tableHasRows = true;

            const index = category.rows.length + 1
            this[`${category.id}_${index}_amount`] = React.createRef();

            this.setState({category, activeteError}, ()=>document.getElementById(auxId).value='' );
        }else{
            activeteError = true;
            this.setState({activeteError});
        }
    }

    render() {

        //variables
        const {category} = this.state;
        const tableId = category.id;

        const dataHead = category.columns;
        const dataBody = category.rows;

        return (
            <React.Fragment>
                <div className="table-responsive cat-table-wrapper">
                    <table className="table table-bordered table-hover cat-table">
                        <thead>
                            <tr>
                                {dataHead.map( (cell, index) => (<th key={`thead${tableId + index}`} >{cell}</th>))}
                                <th key={`thead${tableId + dataHead.length+1}`}>{this.translations.cost}</th>
                                <th key={`thead${tableId + dataHead.length+2}`} className="text-center">{this.translations.remove}</th>
                            </tr>
                        </thead>
                        { category.tableHasRows ? (<tbody>
                                {
                                    dataBody.map( (row, index) => {
                                        return (
                                            <tr key={'tr'+index} >
                                                {
                                                    row.td.map( (item, i) => ( i===0 ? <td key={tableId+''+index+''+i}><label>{item}</label></td> : <td key={tableId+''+index+''+i}><input id={tableId+'_'+index+'_'+i} value={item} onChange={this.handleTableInputChange} /></td> ) )
                                                }

                                                <td key={'InputGroup'+tableId+''+index+''+row.td.length+1} className="amount-inside">
                                                    <i className="far fa-dollar-sign d-none d-sm-block"/>
                                                    <input type="number"
                                                        id={tableId+'_'+index+'_amount'}
                                                        value={row.amount}
                                                        onChange={this.handleAmountChange}
                                                        onBlur={this.handleBlurEvent}
                                                        onFocus={this.handleInputFocus}
                                                        ref={ this[`${tableId}_${index}_amount`] }
                                                    />
                                                </td>

                                                <td key={tableId+''+index+''+row.td.length+2} className="text-center remove-cell">
                                                    <button className="btn-action delete" title="Remove" onClick={() => this.handleRowRemove(index)}><i className="fal fa-trash-alt"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>) : (<tbody><tr><td className="text-center" colSpan={category.columns.length + 2} >{this.translations.noData}</td></tr></tbody>)}
                    </table>
                </div>

                <Row className="mt-4 mb-4 add-row-wraper">

                    <Col sm={8}>
                        <div className={ this.state.activeteError ? "form-group form-group-danger" : "form-group"} id={`div4${tableId}Label`}>
                            <label className="sr-only"
                                htmlFor={`${tableId}_label`}
                                aria-label="New Expense"
                                aria-describedby={`div4${tableId}Label`}
                            >
                                {this.translations.newExpense}
                            </label>
                            <input
                                className="form-control add-row-input"
                                id={`${tableId}_label`}
                                name={`${tableId}_label`}
                                placeholder={this.translations.newExpense}
                                onChange={()=>{
                                    const activeteError = false;
                                    this.setState({activeteError});
                                } }
                            />
                            <small className="danger">{this.translations.inputError}.</small>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <button className="btn form-control btn-add-row" onClick={this.handleRowAdd}><i className="fal fa-plus"></i> {this.translations.add}</button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    componentDidMount(){
        if(this.state.category.focusInput !== null && this[this.state.category.focusInput] !== null){
            if(this[this.state.category.focusInput].current !== null ){
                this[this.state.category.focusInput].current.focus();
            }
        }
    }

};

export default Table;