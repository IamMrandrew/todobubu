import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStopwatch } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu-list">
        <li className="menu-trash">
          <FontAwesomeIcon icon={faTrash} />
        </li>
        <li className="menu-delay">
          <FontAwesomeIcon icon={faStopwatch} />
        </li>
      </ul>
    </div>
  );
};

export default Menu;
