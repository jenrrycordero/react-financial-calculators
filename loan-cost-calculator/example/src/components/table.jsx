import React from "react";
import TableHeader from "./tableHeader.jsx";
import TableBody from "./tableBody.jsx";

const Table = ({ headings, data }) => {
  return (
    <table className="table" border="1">
      <TableHeader columns={headings}/>
      <TableBody data={data} />
    </table>
  );
};

export default Table;