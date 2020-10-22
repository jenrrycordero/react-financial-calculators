import React from "react";

const Table = ({dataHead, dataBody, color}) => {

    return (
        <table className="table table-bordered cat-table" style={{width:'100%'}} >
            <thead>
                <tr>
                    {
                        dataHead.map( (cell, index) => (
                            <th key={`thead_td_${index}`} style={{background: color, color:'#ffffff', padding:10, textAlign: (dataHead.length-1 === index) ? 'right' : 'left' }} className={ (index === dataHead.length-1) ? 'td-amount' : '' }>{cell}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>{
                dataBody.map( (row, index) => (
                    <tr key={'tr'+index} >
                        {
                            row.td.map( (item, i) => (
                                <td key={`tbody_td_${index}_${i}`} style={{border: '1px solid #dee2e6', padding:10}}>
                                    <label>{item}</label>
                                </td>
                            ))
                        }

                        <td key={`tbody_td_${index}_${row.td.length+1}`} className="td-amount" style={{border: '1px solid #dee2e6', textAlign:'right', padding:10}}>
                            <label>${row.amount}</label>
                        </td>
                    </tr>
                ))
            }</tbody>
        </table>
    );

};

export default Table;