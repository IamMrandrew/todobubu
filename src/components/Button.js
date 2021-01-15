import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Button = ({ text, action }) => {
  return (
    <button onClick={action} className="button">
      {text ? (
        text
      ) : (
        <>
          <FontAwesomeIcon className="icon" icon={faGoogle} /> Sign in with
          Google{" "}
        </>
      )}
    </button>
  );
};

export default Button;
