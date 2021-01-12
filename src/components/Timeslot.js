import React from "react";
import Todo from "./Todo";

const Timeslot = ({ todo, todos, setTodos, editHandler }) => {
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
      <Todo
        todo={todo}
        todos={todos}
        setTodos={setTodos}
        editHandler={editHandler}
      />
    </div>
  );
};

export default Timeslot;
