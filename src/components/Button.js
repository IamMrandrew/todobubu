import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Button = ({ text, action }) => {
  return (
    <button onClick={action} className="button">
      {text ? text : <FontAwesomeIcon className="icon" icon={faEllipsisV} />}
    </button>
  );
};

export default Button;
