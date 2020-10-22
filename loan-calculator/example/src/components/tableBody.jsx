import React from "react";
import Util from '../Utils'

const TableBody = ({data}) => {
    /* let aux_data = data;
    aux_data = aux_data.map(row => {
        return row.splice(-1,1);
    } );
    arr.splice(-1,1) */

    return (
      <tbody>
        {data.map((row, index)  => {
                return (
                    <tr key={index+'_row'} className={row.bg_class}>
                    { Object.keys(row).map((columnKeyName, i) => ( columnKeyName !== 'bg_class' &&
                        <td key={index+'_'+i+'cell'}>
                        { row[columnKeyName] }
                        { i > 0 && Util.countDecimalPlaces(row[columnKeyName]) === 1 && '0' }
                        </td>
                    )) }
                    </tr>
                );
            }

        )}
      </tbody>
    );
}

export default TableBody;
