import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Calendar } from "../Calendar/Calendar";
import "./App.css";

const App: React.FC = () => {
  const { clearAllTasks } = useTaskContext();

  return (
    <div className="app">
      <h1 className="calendar-heading">
        Calendar <span className="whitespace-nowrap">To-Do List</span>
      </h1>
      <Calendar />
      <button className="clear-tasks-button" onClick={clearAllTasks}>
        Clear All Tasks
      </button>
    </div>
  );
};

export default App;
