import React, { useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";
import Button from "./Button";

const PopupClear = () => {
  const { clear, clearHandler, clearAllHandler } = useContext(
    CreateTodoContext
  );
  return (
    <div className="popup-clear">
      <div
        className={clear ? "popup-clear-wrapper active" : "popup-clear-wrapper"}
      >
        <p className="title">New day, new beginning?</p>
        <p className="subtitle">
          This move will clear all completed todo. Uncompleted todos will moved
          the next day
        </p>
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
