import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useProfileContext } from "../../context/ProfileContext";
import { useTaskContext } from "../../context/TaskContext";
import "./Modal.css";

export const Modal: React.FC = () => {
  const {
    selectedDate,
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    closeModal,
  } = useTaskContext();
  const { profile } = useProfileContext();
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

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

  if (!selectedDate) return null;

  const { day, month, year } = selectedDate;
  const dateKey = `${year}-${month}-${day}`;
  const tasksForDay = tasks[profile]?.[dateKey] || [];

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    addTask(day, month, year, newTask);
    setNewTask("");
    setError("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return createPortal(
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close-icon" onClick={closeModal}>
          ×
        </button>

        <h2 className="modal__header">
          Tasks for {day}/{month + 1}/{year}
        </h2>
        <ul className="modal__task-list">
          {tasksForDay.map((task, index) => (
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
                    onClick={() =>
                      toggleTaskCompletion(day, month, year, index)
                    }
                    className="modal__mark-done-button"
                  >
                    Finish
                  </button>
                  <button
                    onClick={() => deleteTask(day, month, year, index)}
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
