import './App.css';
import Timeslot from './components/Timeslot';
import Button from './components/Button';
import Status from './components/Status';
import Popup from './components/Popup'
import { useState } from 'react';

function App() {
  let todos = [{title: "Cook breakfast", desc: "Sausages, milk", start: "0900", end: "1000", complete: false}, 
  {title: "Learn React", desc: "React router, hooks, states", start: "1000", end: "1130", complete: false}, 
  {title: "Play chess (1 - 10)", desc: "Need up platinum today", start: "0830", end: "1130", complete: false}];

  const [popup, setPopup] = useState(false);
  const popupHandler = () => {
    setPopup(!popup);
  }

  return (
    <div className="App">
    <div className="container main">
      <Status num={todos.length} />
      {todos.map(todo => (
        <Timeslot key={todo.title} todo={todo} />
      ))}      
      <div className="container addTodo">
        <Button action={popupHandler} text="Add Todo"/>
      </div>
      <Popup popup={popup} />
      <div onClick={popupHandler} className={popup ? "popup-bg active" : "popup-bg"}></div>
      <div className="bottom"></div>      
    </div>
    </div>
  );
}

export default App;
