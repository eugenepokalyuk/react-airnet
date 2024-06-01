import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTaskContext } from "../../context/TaskContext";
import "./Modal.css";

export const Modal: React.FC = () => {
  const {
    selectedDay,
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    closeModal,
  } = useTaskContext();
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    addTask(selectedDay!, newTask);
    setNewTask("");
    setError("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  useEffect(() => {
    const input = document.querySelector(
      ".modal__task-input"
    ) as HTMLInputElement;
    if (input) {
      input.addEventListener("keypress", handleKeyPress);
    }
    return () => {
      if (input) {
        input.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [newTask]);

  if (!selectedDay) return null;

  return createPortal(
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close-icon" onClick={closeModal}>
          ×
        </button>

        <h2 className="modal__header">Tasks for {selectedDay}</h2>
        <ul className="modal__task-list">
          {tasks[selectedDay]?.map((task, index) => (
            <li
              key={index}
              className={`modal__task-item ${
                task.completed ? "modal__task-item--completed" : ""
              }`}
            >
              <span
                className={`modal__task-text ${
                  task.completed ? "modal__task-text--completed" : ""
                }`}
              >
                {task.text}
              </span>
              {!task.completed && (
                <div className="modal__task-buttons">
                  <button
                    onClick={() => toggleTaskCompletion(selectedDay, index)}
                    className="modal__mark-done-button"
                  >
                    Finish
                  </button>
                  <button
                    onClick={() => deleteTask(selectedDay, index)}
                    className="modal__delete-button"
                  >
                    Del
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="modal__task-input"
        />
        {error && <p className="modal__error">{error}</p>}

        <div className="modal__button-container">
          <button onClick={handleAddTask} className="modal__task-button">
            Add Task
          </button>
          <button onClick={closeModal} className="modal__close-button">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
