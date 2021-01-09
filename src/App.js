import './App.css';
import Timeslot from './components/Timeslot';
import Button from './components/Button';
import Status from './components/Status';
import Popup from './components/Popup'
import { useState } from 'react';

function App() {
  const [popup, setPopup] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [todos, setTodos] = useState([]);

  const popupHandler = () => {
    setPopup(!popup);
  }
  const createTodoHandler = () => {
    setTodos([...todos, {title: inputTitle, desc: inputDesc, start: inputStart, end: inputEnd}]);
    setInputTitle("");
    setInputDesc("");
    setInputStart("");
    setInputEnd("");
  }

  return (
    <div className="App">
    <div className="container main">
      <Status num={todos.length} />
      {todos.map(todo => (
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
