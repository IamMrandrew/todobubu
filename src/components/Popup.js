import React from 'react';
import Button from './Button';

const Popup = ({createTodoHandler, popup, popupHandler, inputTitle, setInputTitle, inputDesc, setInputDesc, inputStart, setInputStart, inputEnd, setInputEnd}) => {
  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);       
  }
  const inputDescHandler = (e) => {
    setInputDesc(e.target.value);       
  }
  const inputStartHandler = (e) => {
    setInputStart(e.target.value);       
  }
  const inputEndHandler = (e) => {
    setInputEnd(e.target.value);       
  }

  return (    
    <div className="popup">
      <form className={popup ? "popup-content active" : "popup-content"}>
        <textarea onChange={inputTitleHandler} className="input-title" placeholder="Sleep all day? Fail to wake ..." value={inputTitle} rows="2"></textarea>
        <div className="field-wrap">
          <div className="field-start">
            <p className="label-start">When to start?</p>
            <input onChange={inputStartHandler} className="input-start" placeholder="0900" value={inputStart} type="text" maxLength="4"/>
          </div>
          <div className="field-end">
            <p className="label-end">When to end?</p>
            <input onChange={inputEndHandler} className="input-end" placeholder="1000" value={inputEnd} type="text" maxLength="4"/>
          </div>
        </div>
        <p className="label-desc">Descriptions</p>
        <textarea onChange={inputDescHandler} className="input-desc" placeholder="Apple, Banana, Carrot ..." value={inputDesc} rows="5"></textarea>
        <Button action={createTodoHandler} text="Create" />
      </form>
      <div onClick={popupHandler} className={popup ? "popup-bg active" : "popup-bg"}></div>
    </div>
  )
}

export default Popup;