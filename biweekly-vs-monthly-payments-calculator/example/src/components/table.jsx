import React from "react";
import TableHeader from "./tableHeader.jsx";
import TableBody from "./tableBody.jsx";

const Table = ({ hparam1, hparam2, columns, data }) => {
  return (
    <table className="table table-bordered table-hover">
      <TableHeader hparam1={hparam1} hparam2={hparam2} columns={columns}/>
      <TableBody data={data} />
    </table>
  );
};

export default Table;