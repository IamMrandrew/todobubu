import './App.css';
import Timeslot from './components/Timeslot';
import Button from './components/Button';
import Status from './components/Status';

function App() {
  let todos = [{title: "Cook breakfast", desc: "Sausages, milk", start: "0900", end: "1000", complete: false}, 
  {title: "Learn React", desc: "React router, hooks, states", start: "1000", end: "1130", complete: false}, 
  {title: "Play chess (1 - 10)", desc: "Need up platinum today", start: "0830", end: "1130", complete: false}];

  return (
    <div className="App">
    <div className="container main">
      <Status num={todos.length} />
      {todos.map(todo => (
        <Timeslot key={todo.title} todo={todo} />
      ))}      
      <div className="container addtask">
        <Button />
      </div>
      <div className="bottom"></div>      
    </div>
    </div>
  );
}

export default App;
