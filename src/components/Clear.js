import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStopwatch } from "@fortawesome/free-solid-svg-icons";

const Clear = ({ clearHandler }) => {
  return (
    <div className="clear" onClick={clearHandler}>
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

export default Clear;
