import React, { useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";

const Menu = () => {
  const { menuHandler } = useContext(CreateTodoContext);
  return (
    <div className="menu" onClick={menuHandler}>
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

export default Menu;
