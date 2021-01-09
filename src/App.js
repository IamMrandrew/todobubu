import './App.css';
import Timeslot from './components/Timeslot';
import Button from './components/Button';
import Status from './components/Status';
import Popup from './components/Popup'
import { useState, useEffect } from 'react';

function App() {
  const [popup, setPopup] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [sortedTodos, setSortedTodos] = useState([]);

  const popupHandler = () => {
    setPopup(!popup);
  }
  const createTodoHandler = (e) => {
    e.preventDefault()
    setTodos([...todos, {title: inputTitle, desc: inputDesc? inputDesc : "Nothing special ...", start: inputStart, end: inputEnd}]);
    setInputTitle("");
    setInputDesc("");
    setInputStart("");
    setInputEnd("");
    setPopup(!popup);

  }

  useEffect(() => {
    function compare(a, b) {
      return Number(a.start) - Number(b.start)
    }
    console.log("ji")
    setSortedTodos(todos.sort(compare));
  }, [todos])

  return (
    <div className="App">
    <div className="container main">
      <Status num={todos.length} />
      {sortedTodos.map(todo => (
        <Timeslot key={todo.title} todo={todo} />
      ))}
      <div className="container addTodo">
        <Button action={popupHandler} text="Add Todo" />
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
        inputDesc={inputDesc}
        setInputDesc={setInputDesc}      
      />
      <div className="bottom"></div>      
    </div>
    </div>
  );
}

export default App;
