import React from 'react';

const Status = ({num}) => {
  return (
    <div className="status">
      <h1 className="main-status">Today</h1>
      <p className="tasks-status">{num} tasks remaining</p>
    </div>
  )
}

export default Status;