import { useState, useEffect } from "react";
import { CreateTodoContext } from "./context/CreateTodoContext";

import Timeslot from "./components/Timeslot";
import Button from "./components/Button";
import Status from "./components/Status";
import PopupAddTodo from "./components/PopupAddTodo";
import PopupEdit from "./components/PopupEdit";
import PopupMenu from "./components/PopupMenu";

import "./App.css";

import uuid from "react-uuid";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAVAWD9wDAS1SM0foL1GMDi99QxNfMuiHc",
  authDomain: "todobubu-c9fa5.firebaseapp.com",
  projectId: "todobubu-c9fa5",
  storageBucket: "todobubu-c9fa5.appspot.com",
  messagingSenderId: "235166346449",
  appId: "1:235166346449:web:434764d66fbd69c8a8e9f0",
  measurementId: "G-Q655C8RR6D",
});

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

  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(false);

  // Firebase
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [user] = useAuthState(auth);

  const cloudTodosRef = firestore.collection("todos");
  const query = cloudTodosRef.orderBy("start");

  const [cloudTodos] = useCollectionData(query, { idField: "id" });

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

  const editHandler = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const menuHandler = () => {
    setMenu(!menu);
  };

  const clearAllHandler = async () => {
    if (user) {
      const ref = await cloudTodosRef
        .where("uid", "==", auth.currentUser.uid)
        .where("complete", "==", true)
        .get();
      ref.docs.forEach((doc) => {
        doc.ref.delete();
      });
    } else {
      const uncompleteTodos = todos.filter((todo) => todo.complete === false);
      setTodos([]);
      setTodos(uncompleteTodos);
    }

    setMenu(!menu);
  };

  const createTodoHandler = async (e) => {
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

    if (user) {
      const { uid } = auth.currentUser;

      await cloudTodosRef.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        title: inputTitle,
        desc: inputDesc,
        start: inputStart,
        end: duration ? inputEndDur : inputEnd,
        dur: inputDur,
        duration: duration,
        complete: false,
      });
    } else {
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
    }

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
        menu,
        menuHandler,
        createTodoHandler,
        currentTodo,
        setCurrentTodo,
        clearAllHandler,
        auth,
        user,
        cloudTodosRef,
        cloudTodos,
      }}
    >
      <div className="App">
        <div className="container main">
          <Status
            num={
              user && cloudTodos
                ? cloudTodos
                    .filter(
                      (cloudTodo) => cloudTodo.uid === auth.currentUser.uid
                    )
                    .filter((cloudTodo) => cloudTodo.complete === false).length
                : todos.filter((todo) => todo.complete === false).length
            }
          />

          {!user &&
            sortedTodos &&
            sortedTodos.map((todo) => <Timeslot key={todo.id} todo={todo} />)}

          {user &&
            cloudTodos &&
            cloudTodos
              .filter((cloudTodo) => cloudTodo.uid === auth.currentUser.uid)
              .map((cloudTodo) => (
                <Timeslot key={cloudTodo.id} todo={cloudTodo} />
              ))}

          <div className="container addTodo">
            <Button action={popupHandler} text="Add Todo" />
          </div>
          <PopupAddTodo />
          <PopupEdit />
          <PopupMenu />
          <div className="bottom"></div>
        </div>
      </div>
    </CreateTodoContext.Provider>
  );
}

export default App;
