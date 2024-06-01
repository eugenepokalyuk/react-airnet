import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Task {
  text: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: { [key: number]: Task[] };
  selectedDay: number | null;
  openModal: (day: number) => void;
  closeModal: () => void;
  addTask: (day: number, text: string) => void;
  deleteTask: (day: number, index: number) => void;
  toggleTaskCompletion: (day: number, index: number) => void;
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
  const [tasks, setTasks] = useState<{ [key: number]: Task[] }>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : {};
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openModal = (day: number) => setSelectedDay(day);
  const closeModal = () => setSelectedDay(null);

  const addTask = (day: number, text: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: [...(prevTasks[day] || []), { text, completed: false }],
    }));
  };

  const deleteTask = (day: number, index: number) => {
    setTasks((prevTasks) => {
      const newTasks = [...(prevTasks[day] || [])];
      newTasks.splice(index, 1);
      return { ...prevTasks, [day]: newTasks };
    });
  };

  const toggleTaskCompletion = (day: number, index: number) => {
    setTasks((prevTasks) => {
      const newTasks = [...(prevTasks[day] || [])];
      newTasks[index] = {
        ...newTasks[index],
        completed: !newTasks[index].completed,
      };
      return { ...prevTasks, [day]: newTasks };
    });
  };

  const clearAllTasks = () => {
    setTasks({});
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedDay,
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
