import React, { useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";
import Todo from "./Todo";

const Timeslot = ({ todo }) => {
  return (
    <div className="timeslot">
      <div className="time">
        <h2 className={todo.postponed ? "time-start postponed" : "time-start"}>
          {todo.start}
        </h2>
        <h2 className={todo.postponed ? "time-end postponed" : "time-end"}>
          {todo.end}
        </h2>
      </div>
      <Todo todo={todo} />
    </div>
  );
};

export default Timeslot;
