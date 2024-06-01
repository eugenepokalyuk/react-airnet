import isDayOff from "isdayoff";
import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useTaskContext } from "../../context/TaskContext";
import { Modal } from "../Modal/Modal";
import "./Calendar.css";

export const Calendar: React.FC = () => {
  const { tasks, openModal } = useTaskContext();
  const { profile } = useProfileContext();

  const areAllTasksCompleted = (day: number) => {
    const tasksForDay = tasks[profile]?.[day] || [];
    return (
      tasksForDay.length > 0 && tasksForDay.every((task) => task.completed)
    );
  };

  return (
    <div className="calendar">
      {Array.from({ length: 30 }).map((_, i) => {
        const day = i + 1;
        const hasTasks =
          tasks[profile] &&
          tasks[profile][day] &&
          tasks[profile][day].length > 0;
        const allTasksCompleted = hasTasks && areAllTasksCompleted(day);
        return (
          <div
            key={day}
            className={`day ${isDayOff(day) ? "day--holiday" : ""} ${
              hasTasks
                ? allTasksCompleted
                  ? "day--all-completed"
                  : "day--has-tasks"
                : ""
            }`}
            onClick={() => openModal(day)}
          >
            {day}
          </div>
        );
      })}
      <Modal />
    </div>
  );
};
