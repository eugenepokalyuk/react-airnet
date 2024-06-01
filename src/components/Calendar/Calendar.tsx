import isDayOff from "isdayoff";
import React, { useState } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useTaskContext } from "../../context/TaskContext";
import { Modal } from "../Modal/Modal";
import "./Calendar.css";

enum ViewMode {
  Monthly,
  Weekly,
}

export const Calendar: React.FC = () => {
  const { tasks, openModal } = useTaskContext();
  const { profile } = useProfileContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Monthly);

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

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
  };

  const generateWeekDays = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysArray.push(day);
    }

    return daysArray;
  };

  const areAllTasksCompleted = (day: number, month: number, year: number) => {
    const dateKey = `${year}-${month}-${day}`;
    const tasksForDay = tasks[profile]?.[dateKey] || [];
    return (
      tasksForDay.length > 0 && tasksForDay.every((task) => task.completed)
    );
  };

  const calendarDays =
    viewMode === ViewMode.Monthly ? generateCalendarDays() : generateWeekDays();

  const handlePrevious = () => {
    if (viewMode === ViewMode.Monthly) {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    } else {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(currentDate.getDate() - 7);
      setCurrentDate(prevWeek);
    }
  };

  const handleNext = () => {
    if (viewMode === ViewMode.Monthly) {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    } else {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      setCurrentDate(nextWeek);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevious} className="calendar-nav-button">
          ◀
        </button>
        <h2>
          {viewMode === ViewMode.Monthly
            ? `${monthName} ${currentYear}`
            : `Week of ${currentDate.toLocaleDateString()}`}
        </h2>
        <button onClick={handleNext} className="calendar-nav-button">
          ▶
        </button>
      </div>
      <div className="view-mode-toggle">
        <button
          onClick={() => setViewMode(ViewMode.Monthly)}
          className={`view-mode-button ${
            viewMode === ViewMode.Monthly ? "active" : ""
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setViewMode(ViewMode.Weekly)}
          className={`view-mode-button ${
            viewMode === ViewMode.Weekly ? "active" : ""
          }`}
        >
          Weekly
        </button>
      </div>
      <div className="calendar">
        {calendarDays.map((day: any, index) => {
          if (viewMode === ViewMode.Monthly && day === null) {
            // Если нужно хоть что-то возращать то, можно возращать пустые не кликабельные поля
            // Но я считаю что это не нужно, но и пропустить это я не мог
            // return <div key={index} className="day day--empty"></div>;
            return <></>;
          }

          const dayNumber = viewMode === ViewMode.Monthly ? day : day.getDate();
          const month =
            viewMode === ViewMode.Monthly ? currentMonth : day.getMonth();
          const year =
            viewMode === ViewMode.Monthly ? currentYear : day.getFullYear();
          const dateKey = `${year}-${month}-${dayNumber}`;
          const hasTasks =
            tasks[profile] &&
            tasks[profile][dateKey] &&
            tasks[profile][dateKey].length > 0;
          const allTasksCompleted =
            hasTasks && areAllTasksCompleted(dayNumber, month, year);

          return (
            <div
              key={dateKey}
              className={`day ${isDayOff(dayNumber) ? "day--holiday" : ""} ${
                hasTasks
                  ? allTasksCompleted
                    ? "day--all-completed"
                    : "day--has-tasks"
                  : ""
              }`}
              onClick={() => openModal(dayNumber, month, year)}
            >
              {viewMode === ViewMode.Monthly ? day : dayNumber}
            </div>
          );
        })}
      </div>
      <Modal />
    </div>
  );
};
