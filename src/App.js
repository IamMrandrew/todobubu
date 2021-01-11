import "./App.css";
import Timeslot from "./components/Timeslot";
import Button from "./components/Button";
import Status from "./components/Status";
import Popup from "./components/Popup";
import Menu from "./components/Menu";
import Edit from "./components/Edit";
import { useState, useEffect } from "react";

function App() {
  const [popup, setPopup] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");
  const [inputDur, setInputDur] = useState("30");
  const [inputDesc, setInputDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [sortedTodos, setSortedTodos] = useState([]);
  const [durationText, setDurationText] = useState(false);
  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(0);

  const popupHandler = (e) => {
    e.preventDefault();
    setPopup(!popup);
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    setEdit(!edit);
    setCurrentTodo(id);
  };

  const menuHandler = () => {
    setMenu(!menu);
  };

  const createTodoHandler = (e) => {
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

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: inputTitle,
        desc: inputDesc ? inputDesc : "Nothing special ...",
        start: inputStart,
        end: durationText ? inputEndDur : inputEnd,
        complete: false,
      },
    ]);
    setInputTitle("");
    setInputDesc("");
    setInputStart("");
    setInputEnd("");
    setPopup(!popup);
  };

  useEffect(() => {
    function compare(a, b) {
      return Number(a.start) - Number(b.start);
    }
    setSortedTodos(todos.sort(compare));
  }, [todos]);

  useEffect(() => {
    setCurrentTime();
  }, [popup]);
  const setCurrentTime = () => {
    const duration = 30;
    const time = new Date();
    const start =
      time.getHours().toString().padStart(2, "0") +
      time.getMinutes().toString().padStart(2, "0");
    const durationTime = new Date(time.getTime() + duration * 1000 * 60);
    const end =
      durationTime.getHours().toString().padStart(2, "0") +
      durationTime.getMinutes().toString().padStart(2, "0");
    setInputStart(start);
    setInputEnd(end);
  };

  return (
    <div className="App">
      <div className="container main">
        <Status num={todos.filter((todo) => todo.complete === false).length} />
        {sortedTodos.map((todo) => (
          <Timeslot
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            editHandler={editHandler}
          />
        ))}
        <div className="container addTodo">
          <Button action={popupHandler} text="Add Todo" />
          {/* <div className="menu-wrap">
            <Button action={menuHandler} text="" />
            <Menu />
            <div className="menu-background active"></div>
          </div> */}
        </div>
        <Popup
          createTodoHandler={createTodoHandler}
          popup={popup}
          popupHandler={popupHandler}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          inputStart={inputStart}
          setInputStart={setInputStart}
          inputEnd={inputEnd}
          setInputEnd={setInputEnd}
          inputDur={inputDur}
          setInputDur={setInputDur}
          inputDesc={inputDesc}
          setInputDesc={setInputDesc}
          durationText={durationText}
          setDurationText={setDurationText}
        />
        <Edit
          createTodoHandler={createTodoHandler}
          edit={edit}
          editHandler={editHandler}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          inputStart={inputStart}
          setInputStart={setInputStart}
          inputEnd={inputEnd}
          setInputEnd={setInputEnd}
          inputDur={inputDur}
          setInputDur={setInputDur}
          inputDesc={inputDesc}
          setInputDesc={setInputDesc}
          durationText={durationText}
          setDurationText={setDurationText}
          currentTodo={currentTodo}
          todos={todos}
          setTodos={setTodos}
        />
        <div className="bottom"></div>
      </div>
    </div>
  );
}

export default App;
