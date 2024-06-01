import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { ProfileProvider } from "./context/ProfileContext";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ProfileProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ProfileProvider>
  </React.StrictMode>
);
