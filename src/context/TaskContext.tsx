import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProfileContext } from "./ProfileContext";

interface Task {
  text: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: { [profile: string]: { [date: string]: Task[] } };
  selectedDate: { day: number; month: number; year: number } | null;
  openModal: (day: number, month: number, year: number) => void;
  closeModal: () => void;
  addTask: (day: number, month: number, year: number, text: string) => void;
  deleteTask: (day: number, month: number, year: number, index: number) => void;
  toggleTaskCompletion: (
    day: number,
    month: number,
    year: number,
    index: number
  ) => void;
  clearAllTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { profile } = useProfileContext();
  const [tasks, setTasks] = useState<{
    [profile: string]: { [date: string]: Task[] };
  }>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : {};
  });
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openModal = (day: number, month: number, year: number) =>
    setSelectedDate({ day, month, year });
  const closeModal = () => setSelectedDate(null);

  const addTask = (day: number, month: number, year: number, text: string) => {
    const dateKey = `${year}-${month}-${day}`;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [profile]: {
        ...prevTasks[profile],
        [dateKey]: [
          ...(prevTasks[profile]?.[dateKey] || []),
          { text, completed: false },
        ],
      },
    }));
  };

  const deleteTask = (
    day: number,
    month: number,
    year: number,
    index: number
  ) => {
    const dateKey = `${year}-${month}-${day}`;
    setTasks((prevTasks) => {
      const newTasks = [...(prevTasks[profile]?.[dateKey] || [])];
      newTasks.splice(index, 1);
      return {
        ...prevTasks,
        [profile]: { ...prevTasks[profile], [dateKey]: newTasks },
      };
    });
  };

  const toggleTaskCompletion = (
    day: number,
    month: number,
    year: number,
    index: number
  ) => {
    const dateKey = `${year}-${month}-${day}`;
    setTasks((prevTasks) => {
      const newTasks = [...(prevTasks[profile]?.[dateKey] || [])];
      newTasks[index] = {
        ...newTasks[index],
        completed: !newTasks[index].completed,
      };
      return {
        ...prevTasks,
        [profile]: { ...prevTasks[profile], [dateKey]: newTasks },
      };
    });
  };

  const clearAllTasks = () => {
    setTasks((prevTasks) => ({ ...prevTasks, [profile]: {} }));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedDate,
        openModal,
        closeModal,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        clearAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
