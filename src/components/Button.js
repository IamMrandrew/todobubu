import React from 'react';

const Button = ({text, action}) => {
  return (
    <button onClick={action} className="button">
      {text}
    </button>
  )
}

export default Button;