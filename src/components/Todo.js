import React from 'react';

const Todo = ({todo}) => {
  return (
    <div className="todo">
      <h3 className="todo-title">{todo.title}</h3>
      <p className="todo-desc">{todo.desc}</p>
      <div className="todo-complete"></div>
    </div>
  )
}

export default Todo;