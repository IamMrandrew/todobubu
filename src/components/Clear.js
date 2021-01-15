import React, { useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";

const Clear = () => {
  const { clearHandler } = useContext(CreateTodoContext);
  return (
    <div className="clear" onClick={clearHandler}>
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

export default Clear;
