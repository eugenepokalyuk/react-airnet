import { fireEvent, render, screen } from "@testing-library/react";
import { ProfileProvider } from "./ProfileContext";
import { TaskProvider, useTaskContext } from "./TaskContext";

const TestComponent = () => {
  const {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    openModal,
    closeModal,
    selectedDate,
  } = useTaskContext();

  return (
    <div>
      <button onClick={() => addTask(1, 0, 2024, "Test Task")}>Add Task</button>
      <button onClick={() => toggleTaskCompletion(1, 0, 2024, 0)}>
        Toggle Task
      </button>
      <button onClick={() => deleteTask(1, 0, 2024, 0)}>Delete Task</button>
      <button onClick={() => openModal(1, 0, 2024)}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>

      {selectedDate && <div>Modal Open</div>}
      <div>{tasks["default"]?.["2024-0-1"]?.[0]?.text}</div>
    </div>
  );
};

describe("TaskContext", () => {
  it("adds a task", () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("toggles a task completion", () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.click(screen.getByText("Toggle Task"));
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("deletes a task", () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.click(screen.getByText("Delete Task"));
    expect(screen.queryByText("Test Task")).not.toBeInTheDocument();
  });

  it("opens and closes the modal", () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText("Open Modal"));
    expect(screen.getByText("Modal Open")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close Modal"));
    expect(screen.queryByText("Modal Open")).not.toBeInTheDocument();
  });
});
