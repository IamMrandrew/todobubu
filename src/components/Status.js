import React from "react";
import Clear from "./Clear";

const Status = ({ num }) => {
  return (
    <div className="status">
      <div className="wrapper">
        <h1 className="main-status">Today</h1>
        <p className="tasks-status">{num} tasks remaining</p>
      </div>
      <Clear />
    </div>
  );
};

export default Status;
