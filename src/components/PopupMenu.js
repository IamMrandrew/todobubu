import React, { useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";
import Button from "./Button";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const PopupMenu = () => {
  const { menu, menuHandler, clearAllHandler, auth, user } = useContext(
    CreateTodoContext
  );
  return (
    <div className="popup-menu">
      <div
        className={menu ? "popup-menu-wrapper active" : "popup-menu-wrapper"}
      >
        <p className="title">Connect to cloud?</p>
        {user ? <SignOut auth={auth} /> : <SignIn auth={auth} />}
        <p className="title">New day, new beginning?</p>
        <p className="subtitle">
          This move will clear all completed todo. Uncompleted todos will moved
          the next day
        </p>
        <div className="wrapper">
          <Button action={clearAllHandler} text="Clear all?" />
          <Button action={menuHandler} text="Cancel" />
        </div>
      </div>
      <div
        onClick={menuHandler}
        className={menu ? "popup-bg active" : "popup-bg"}
      ></div>
    </div>
  );
};

export default PopupMenu;
