import isDayOff from "isdayoff";
import React, { useState } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useTaskContext } from "../../context/TaskContext";
import { Modal } from "../Modal/Modal";
import "./Calendar.css";

export const Calendar: React.FC = () => {
  const { tasks, openModal } = useTaskContext();
  const { profile } = useProfileContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];

    // Add blank days for the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const areAllTasksCompleted = (day: number) => {
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    const tasksForDay = tasks[profile]?.[dateKey] || [];
    return (
      tasksForDay.length > 0 && tasksForDay.every((task) => task.completed)
    );
  };

  const calendarDays = generateCalendarDays();

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} className="calendar-nav-button">
          ◀
        </button>
        <h2>
          {monthName} {currentYear}
        </h2>
        <button onClick={handleNextMonth} className="calendar-nav-button">
          ▶
        </button>
      </div>
      <div className="calendar">
        {calendarDays.map((day, index) => {
          if (day === null) {
            // Если нужно хоть что-то возращать то, можно возращать пустые не кликабельные поля
            // Но я считаю что это не нужно, но и пропустить это я не мог
            // return <div key={index} className="day day--empty"></div>;
            return <></>;
          }

          const dateKey = `${currentYear}-${currentMonth}-${day}`;
          const hasTasks =
            tasks[profile] &&
            tasks[profile][dateKey] &&
            tasks[profile][dateKey].length > 0;
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
              onClick={() => openModal(day, currentMonth, currentYear)}
            >
              {day}
            </div>
          );
        })}
      </div>
      <Modal />
    </div>
  );
};
