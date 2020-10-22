import React from "react";

const TableHeader = ({ hparam1, hparam2, columns}) => {
  return (
        <thead>
            <tr>
                <th><span className="sr-only">Properties</span></th>
                <th colSpan="2" className="text-center">{hparam1}</th>
                <th colSpan="2" className="text-center">{hparam2}</th>
            </tr>
            <tr>
                { columns.map(column => <th key={column}>{column}</th>) }
            </tr>
        </thead>
  );
}

export default TableHeader;
