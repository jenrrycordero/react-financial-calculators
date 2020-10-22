import React from "react";
import Util from '../Utils'

const TableBody = ({data}) => {
    return (
      <tbody>
        {data.map((row, index)  => (
          <tr key={index+'_row'}>
            { Object.keys(row).map((columnKeyName, i) => (
              <td key={index+'_'+i+'cell'}>
                {i > 0 && '$'}
                { row[columnKeyName] }
                {i > 0 && Util.countDecimalPlaces(row[columnKeyName]) == 1 && '0'}
              </td>
            )) }
          </tr>
        ))}
      </tbody>
    );
}

export default TableBody;
