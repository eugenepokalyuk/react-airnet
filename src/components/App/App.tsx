import React from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useTaskContext } from "../../context/TaskContext";
import { Calendar } from "../Calendar/Calendar";
import "./App.css";

const App: React.FC = () => {
  const { clearAllTasks } = useTaskContext();
  const { profile, setProfile } = useProfileContext();

  return (
    <div className="app">
      <div className="profile-selector">
        <label htmlFor="profile-select">Выберите профиль:</label>
        <select
          id="profile-select"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="profile-select"
        >
          <option value="default">Мой</option>
          <option value="profile1">Мама</option>
          <option value="profile2">Папа</option>
          <option value="profile3">Брат</option>
        </select>
      </div>

      <Calendar />

      <button className="clear-tasks-button" onClick={clearAllTasks}>
        Очистить все задачи
      </button>
    </div>
  );
};

export default App;
