import React from 'react'
import Todo from './Todo'

const Timeslot = ({todo}) => {
  return (
    <div className="timeslot">
      <div className="time">
        <h2 className="time-start">{todo.start}</h2>
        <h2 className="time-end">{todo.end}</h2>
      </div>
      <Todo todo={todo} />
    </div>
  )
}

export default Timeslot;