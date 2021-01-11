import React from "react";
import Button from "./Button";

const PopupClear = ({ clear, clearHandler, clearAllHandler }) => {
  return (
    <div className="popup-clear">
      <div
        className={clear ? "popup-clear-wrapper active" : "popup-clear-wrapper"}
      >
        <p className="title">Clear all todo?</p>
        <p className="subtitle">This moves cannot be undo</p>
        <div className="wrapper">
          <Button action={clearAllHandler} text="Clear all?" />
          <Button action={clearHandler} text="Cancel" />
        </div>
      </div>
      <div
        onClick={clearHandler}
        className={clear ? "popup-bg active" : "popup-bg"}
      ></div>
    </div>
  );
};

export default PopupClear;
