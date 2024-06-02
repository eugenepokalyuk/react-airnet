import { fireEvent, render, screen } from '@testing-library/react';
import { ProfileProvider } from '../../context/ProfileContext';
import { TaskProvider, useTaskContext } from '../../context/TaskContext';
import { Modal } from './Modal';

const TestComponent = () => {
  const { openModal } = useTaskContext();
  return <button onClick={() => openModal(1, 0, 2024)}>Open Modal</button>;
};

describe('Modal', () => {
  it('opens and closes the modal', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
          <Modal />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.getByText(/Tasks for 1\/1\/2024/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText(/Tasks for 1\/1\/2024/i)).not.toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
          <Modal />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));
    fireEvent.change(screen.getByPlaceholderText('Enter task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('toggles task completion', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
          <Modal />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));
    fireEvent.change(screen.getByPlaceholderText('Enter task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.click(screen.getByText('Is Done?'));

    expect(screen.getByText('Done!')).toBeInTheDocument();
  });

  it('deletes a task', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <TestComponent />
          <Modal />
        </TaskProvider>
      </ProfileProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));
    fireEvent.change(screen.getByPlaceholderText('Enter task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });
});