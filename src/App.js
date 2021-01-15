import "./App.css";
import Timeslot from "./components/Timeslot";
import Button from "./components/Button";
import Status from "./components/Status";
import PopupAddTodo from "./components/PopupAddTodo";
import PopupEdit from "./components/PopupEdit";
import { useState, useEffect } from "react";
import PopupClear from "./components/PopupClear";
import { CreateTodoContext } from "./context/CreateTodoContext";
import uuid from "react-uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");
  const [inputDur, setInputDur] = useState(30);
  const [inputDesc, setInputDesc] = useState("");
  const [duration, setDuration] = useState(false);
  const [popup, setPopup] = useState(false);

  const [sortedTodos, setSortedTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(0);

  const [clear, setClear] = useState(false);
  const [edit, setEdit] = useState(false);

  // useEffect()
  useEffect(() => {
    getLocal();
  }, []);

  const saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocal = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todosFromLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todosFromLocal);
    }
  };

  useEffect(() => {
    function compare(a, b) {
      return Number(a.start) - Number(b.start);
    }
    setSortedTodos(todos.sort(compare));
    saveLocal();
  }, [todos]);

  useEffect(() => {
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

    setCurrentTime();
  }, [popup]);

  // Handler
  const popupHandler = (e) => {
    e.preventDefault();
    setInputTitle("");
    setInputDesc("");
    setInputStart("");
    setInputEnd("");
    setDuration(false);
    setPopup(!popup);
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    setEdit(!edit);
    setCurrentTodo(id);
  };

  const clearHandler = () => {
    setClear(!clear);
  };

  const clearAllHandler = () => {
    const uncompleteTodos = todos.filter((todo) => todo.complete === false);
    setTodos([]);
    setTodos(uncompleteTodos);
    setClear(!clear);
  };

  const createTodoHandler = (e) => {
    e.preventDefault();
    let inputEndDur;

    if (duration) {
      const hours = inputStart.substring(0, 2);
      const mins = inputStart.substring(2, 4);
      let hoursNum = Number(hours);
      let minsNum = Number(mins);
      minsNum += inputDur;
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
        id: uuid(),
        title: inputTitle,
        desc: inputDesc,
        start: inputStart,
        end: duration ? inputEndDur : inputEnd,
        dur: inputDur,
        duration: duration,
        complete: false,
      },
    ]);

    setInputTitle("");
    setInputDesc("");
    setInputStart("");
    setInputEnd("");
    setDuration(false);
    setPopup(!popup);
  };

  return (
    <CreateTodoContext.Provider
      value={{
        todos,
        setTodos,
        inputTitle,
        setInputTitle,
        inputStart,
        setInputStart,
        inputEnd,
        setInputEnd,
        inputDur,
        setInputDur,
        inputDesc,
        setInputDesc,
        duration,
        setDuration,
        popupHandler,
        popup,
        edit,
        editHandler,
        clear,
        clearHandler,
        createTodoHandler,
        currentTodo,
        clearAllHandler,
      }}
    >
      <div className="App">
        <div className="container main">
          <Status
            num={todos.filter((todo) => todo.complete === false).length}
          />
          {sortedTodos.map((todo) => (
            <Timeslot key={todo.id} todo={todo} />
          ))}
          <div className="container addTodo">
            <Button action={popupHandler} text="Add Todo" />
          </div>
          <PopupAddTodo />
          <PopupEdit />
          <PopupClear />
          <div className="bottom"></div>
        </div>
      </div>
    </CreateTodoContext.Provider>
  );
}

export default App;
