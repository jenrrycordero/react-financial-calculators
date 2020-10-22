import React from "react";
import TableHeader from "./tableHeader.jsx";
import TableBody from "./tableBody.jsx";

const Table = ({ columns, data }) => {
  return (
    <table className="table table-bordered table-hover">
      <TableHeader columns={columns}/>
      <TableBody data={data} />
    </table>
  );
};

export default Table;