import React, { useState, useEffect, useContext } from "react";
import { CreateTodoContext } from "../context/CreateTodoContext";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
// import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

const PopupEdit = () => {
  const {
    createTodoHandler,
    edit,
    editHandler,
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
    currentTodo,
    todos,
    setTodos,
  } = useContext(CreateTodoContext);

  // Handler
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
    setInputDur(e.target.value.toString());
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (inputTitle) {
        createTodoHandler(e);
      }
    }
  };

  const editedHandler = (e) => {
    e.preventDefault();
    let inputEndDur;
    if (duration) {
      const hours = inputStart.substring(0, 2);
      const mins = inputStart.substring(2, 4);
      let hoursNum = Number(hours);
      let minsNum = Number(mins);
      minsNum += Number(inputDur);
      let offset = Math.floor(minsNum / 60);
      minsNum %= 60;
      hoursNum += offset;
      setInputEnd(
        hoursNum.toString().padStart(2, "0") +
          minsNum.toString().padStart(2, "0")
      );
      inputEndDur =
        hoursNum.toString().padStart(2, "0") +
        minsNum.toString().padStart(2, "0");
    }

    setTodos(
      todos.map((item) => {
        if (item.id === currentTodo) {
          return {
            ...item,
            title: inputTitle,
            desc: inputDesc ? inputDesc : "Nothing special ...",
            start: inputStart,
            end: duration ? inputEndDur : inputEnd,
            dur: inputDur,
            duration: duration,
          };
        }
        return item;
      })
    );

    setInputTitle("");
    setInputDesc("");
    setInputStart("");
    setInputEnd("");

    editHandler(e);
  };

  const deleteHandler = (e) => {
    setTodos(todos.filter((item) => item.id !== currentTodo));
    editHandler(e);
  };

  // useEffect()
  useEffect(() => {
    todos.forEach((todo) => {
      if (todo.id === currentTodo) {
        setInputTitle(todo.title);
        setInputStart(todo.start);
        setInputEnd(todo.end);
        setInputDesc(todo.desc);
        setInputDur(todo.dur);
        setDuration(todo.duration);
      }
    });
  }, [edit]);

  return (
    <div className="edit">
      <form className={edit ? "edit-content active" : "edit-content"}>
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
        <div className="buttons">
          <Button action={editedHandler} text="Done" />
          <Button action={deleteHandler} text="Delete" />
        </div>
      </form>
      <div
        onClick={editHandler}
        className={edit ? "edit-bg active" : "edit-bg"}
      ></div>
    </div>
  );
};

export default PopupEdit;
