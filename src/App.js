import './App.css';
import Todo from './components/Todo';
import Timeslot from './components/Timeslot';
import Button from './components/Button';
import Status from './components/Status';

function App() {
  let tasks = [{title: "Cook breakfast", desc: "Sausages, milk", start: 9, end: 10, complete: false}, 
  {title: "Cook breakfast", desc: "Sausages, milk", start: 9, end: 10, complete: false}];

  return (
    <div className="App">
    <div className="container main">
      <Status num={tasks.length} />
      <Timeslot tasks={tasks} />
      <div className="container addtask">
        <Button />
      </div>      
    </div>
    </div>
  );
}

export default App;
