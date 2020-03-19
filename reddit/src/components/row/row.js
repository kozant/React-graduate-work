import React from "react";

import "./row.css";

const Row = ({ left, right }) => {
  return (
    <div className="container row mb2">
      <div className="col-md-9">{left}</div>
      <div className="col-md-3">{right}</div>
    </div>
  );
};

export default Row;
