import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";

const Edit = ({
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
  durationText,
  setDurationText,
  currentTodo,
  todos,
  setTodos,
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

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (inputTitle) {
        createTodoHandler(e);
      }
    }
  };

  useEffect(() => {
    todos.forEach((todo) => {
      if (todo.id === currentTodo) {
        setInputTitle(todo.title);
        setInputStart(todo.start);
        setInputEnd(todo.end);
        setInputDesc(todo.desc);
      }
    });
  }, [edit]);

  const editedHandler = (e) => {
    e.preventDefault();
    let inputEndDur;
    if (durationText) {
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
            end: durationText ? inputEndDur : inputEnd,
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
        <p className="label-delay">Quick delay</p>
        <div className="field-wrap">
          <div
            className="button-duration"
            onClick={() => setDurationText(!durationText)}
          >
            <FontAwesomeIcon className="icon" icon={faClock} />
          </div>
          <input
            onChange={durationText ? inputDurHandler : inputEndHandler}
            className="input-delay"
            placeholder="0"
            value={inputDur}
            type="text"
            maxLength="4"
          />
          <div className="delay-unit">mins</div>
        </div>
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

export default Edit;
