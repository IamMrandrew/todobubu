import React from 'react';
import Button from './Button';

const Popup = ({popup}) => {
  return (    
    <div className={popup ? "popup active" : "popup"}>
      <textarea className="input-title" placeholder="Sleep all day? Fail to wake? Type here ..." name="" id="" cols="30" rows="5"></textarea>
      <div className="field-wrap">
        <div className="field-start">
          <p className="label-start">When to start?</p>
          <input className="input-start" placeholder="0900" type="text" maxLength="4"/>
        </div>
        <div className="field-end">
          <p className="label-end">When to end?</p>
          <input className="input-end" placeholder="1000" type="text" maxLength="4"/>
        </div>
      </div>
      <p className="label-desc">Descriptions</p>
      <textarea className="input-desc" name="" id="" cols="30" rows="5"></textarea>
      <Button text="Create" />
    </div>
  )
}

export default Popup;