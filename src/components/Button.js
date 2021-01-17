import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Button = ({ text, action, provider }) => {
  return (
    <button onClick={action} className="button">
      {text ? (
        text
      ) : provider == "Google" ? (
        <>
          <FontAwesomeIcon className="icon" icon={faGoogle} /> Sign in with
          {" " + provider}
        </>
      ) : (
        <>
          <FontAwesomeIcon className="icon" icon={faGithub} /> Sign in with
          {" " + provider}
        </>
      )}
    </button>
  );
};

export default Button;
