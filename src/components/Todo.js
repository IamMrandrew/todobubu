import React, { useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";

const Todo = ({ todo, myid }) => {
  const {
    todos,
    setTodos,
    editHandler,
    user,
    cloudTodosRef,
    setCurrentTodo,
  } = useContext(CreateTodoContext);

  const completeHandler = async () => {
    if (user) {
      await cloudTodosRef.doc(todo.id).update({
        complete: !todo.complete,
      });
    } else {
      setTodos(
        todos.map((item) => {
          if (item.id === todo.id) {
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        })
      );
    }
  };

  return (
    <div className={todo.complete ? "todo completed" : "todo"}>
      <div
        className="wrapper"
        onClick={(e) => {
          editHandler(e, todo.id);
          setCurrentTodo(todo.id);
        }}
      >
        <h3 className={todo.complete ? "todo-title completed" : "todo-title"}>
          {todo.title}
        </h3>
        <p className={todo.complete ? "todo-desc completed" : "todo-desc"}>
          {todo.desc ? todo.desc : "Nothing special ..."}
        </p>
      </div>
      <div
        onClick={completeHandler}
        className={todo.complete ? "todo-complete completed" : "todo-complete"}
      ></div>
    </div>
  );
};

export default Todo;
