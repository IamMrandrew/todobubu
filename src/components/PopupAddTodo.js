import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const PopupAddTodo = ({
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
  duration,
  setDuration,
}) => {
  //Handler
  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };
  const inputDescHandler = (e) => {
    setInputDesc(e.target.value);
  };
  const inputStartHandler = (e) => {
    setInputStart(e.target.value.toString());
  };
  const inputEndHandler = (e) => {
    setInputEnd(e.target.value.toString());
  };

  const inputDurHandler = (e) => {
    setInputDur(e.target.value);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (inputTitle) {
        createTodoHandler(e);
      }
    }
  };

  return (
    <div className="popup">
      <form className={popup ? "popup-content active" : "popup-content"}>
        <textarea
          onChange={inputTitleHandler}
          onKeyPress={keyPressHandler}
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
                new Date().getHours().toString().padStart(2, "0") +
                new Date().getMinutes().toString().padStart(2, "0")
              }
              value={inputStart}
              type="number"
              inputMode="numeric"
              maxLength="4"
            />
          </div>
          <div className="field-end">
            <p className="label-end">
              {duration ? "How long?" : "When to end?"}
            </p>
            <div className="wrapper">
              <div
                className="button-duration"
                onClick={() => setDuration(!duration)}
              >
                <FontAwesomeIcon className="icon" icon={faClock} />
              </div>
              <input
                onChange={duration ? inputDurHandler : inputEndHandler}
                className={duration ? "input-dur" : "input-end"}
                placeholder={duration ? "30" : "1000"}
                value={duration ? inputDur : inputEnd}
                type="number"
                inputMode="numeric"
                maxLength="4"
              />
              <div
                className={duration ? "duration-unit active" : "duration-unit"}
              >
                mins
              </div>
            </div>
          </div>
        </div>
        <p className="label-desc">Descriptions</p>
        <textarea
          onChange={inputDescHandler}
          onKeyPress={keyPressHandler}
          className="input-desc"
          placeholder="Apple, Banana, Carrot ..."
          value={inputDesc}
          rows="5"
        ></textarea>
        <Button
          action={inputTitle ? createTodoHandler : popupHandler}
          text={inputTitle ? "Create" : "Cancel"}
        />
      </form>
      <div
        onClick={popupHandler}
        className={popup ? "popup-bg active" : "popup-bg"}
      ></div>
    </div>
  );
};

export default PopupAddTodo;
