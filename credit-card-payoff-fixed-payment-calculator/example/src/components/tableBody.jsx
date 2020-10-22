import React from "react";
import Util from '../Utils'

const TableBody = ({data}) => {
    return (
        <tbody>
        {data.map((row, index) => (
            <tr key={index + '_row'}>
                {Object.keys(row).map((columnKeyName, i) => (
                    <td key={index + '_' + i + 'cell'}>
                        { columnKeyName === 'month' ? row[columnKeyName] : Util.moneyValue(row[columnKeyName], true)}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>
    );
}

export default TableBody;
