import React from 'react';
import Table from './Table';
import '../styles/BPResult.css';
import Util from "../Utils.js";

const BPResult = ({cat, lan}) => {

    const translation = {
        en: 'Cost',
        es: 'Costo',
        ca: 'Cost',
        fr: 'Cost'
    }

    const tableHead = [...cat.columns, translation[lan] ];
    const tableBody = cat.rows.filter(row => row.amount > 0);
    let subTotal = 0;
    tableBody.forEach( row => {
        subTotal += parseFloat(row.amount);
    });

    return (
        <div className="table-responsive result-wrapper">
            <h3 style={{color:cat.color}}><i className={cat.icon} style={{color:cat.color, border:`3px solid ${cat.color}`, marginRight:10}}></i> {cat.title}</h3>

            <Table dataHead={tableHead} dataBody={tableBody} color={cat.color}/>

            <div className="mt-2 mb-2">
                <h4 className="label-results text-right" style={{textAlign:'right', marginRight:'5px'}}>Subtotal: <span>${ Util.formatMoney(Util.roundTo(subTotal, 2)) }</span></h4>
            </div>
        </div>
    );
}

export default BPResult;