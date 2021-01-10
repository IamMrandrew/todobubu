import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Popup = ({
  createTodoHandler,
  popup,
  popupHandler,
  inputTitle,
  setInputTitle,
  inputDesc,
  setInputDesc,
  inputStart,
  setInputStart,
  inputEnd,
  setInputEnd,
  inputDur,
  setInputDur,
  durationText,
  setDurationText,
}) => {
  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };
  const inputDescHandler = (e) => {
    setInputDesc(e.target.value);
  };
  const inputStartHandler = (e) => {
    setInputStart(e.target.value);
  };
  const inputEndHandler = (e) => {
    setInputEnd(e.target.value);
  };

  const inputDurHandler = (e) => {
    setInputDur(e.target.value);
  };

  return (
    <div className="popup">
      <form className={popup ? "popup-content active" : "popup-content"}>
        <textarea
          onChange={inputTitleHandler}
          className="input-title"
          placeholder="Sleep all day? Fail to wake ..."
          value={inputTitle}
          rows="2"
        ></textarea>
        <div className="field-wrap">
          <div className="field-start">
            <p className="label-start">When to start?</p>
            <input
              onChange={inputStartHandler}
              className="input-start"
              placeholder={
                new Date().getHours().toString() +
                new Date().getMinutes().toString()
              }
              value={inputStart}
              type="text"
              maxLength="4"
            />
          </div>
          <div className="field-end">
            <p className="label-end">
              {durationText ? "How long?" : "When to end?"}
            </p>
            <div className="wrapper">
              <div
                className="button-duration"
                onClick={() => setDurationText(!durationText)}
              >
                <FontAwesomeIcon className="icon" icon={faClock} />
              </div>
              <input
                onChange={durationText ? inputDurHandler : inputEndHandler}
                className={durationText ? "input-dur" : "input-end"}
                placeholder={durationText ? "30" : "1000"}
                value={durationText ? inputDur : inputEnd}
                type="text"
                maxLength="4"
              />
              <div
                className={
                  durationText ? "duration-unit active" : "duration-unit"
                }
              >
                mins
              </div>
            </div>
          </div>
        </div>
        <p className="label-desc">Descriptions</p>
        <textarea
          onChange={inputDescHandler}
          className="input-desc"
          placeholder="Apple, Banana, Carrot ..."
          value={inputDesc}
          rows="5"
        ></textarea>
        <Button action={createTodoHandler} text="Create" />
      </form>
      <div
        onClick={popupHandler}
        className={popup ? "popup-bg active" : "popup-bg"}
      ></div>
    </div>
  );
};

export default Popup;
