import { fireEvent, render, screen } from '@testing-library/react';
import { ProfileProvider } from '../../context/ProfileContext';
import { TaskProvider } from '../../context/TaskContext';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders the calendar header', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <Calendar />
        </TaskProvider>
      </ProfileProvider>
    );

    const header = screen.getByText(/January 2024/i);
    expect(header).toBeInTheDocument();
  });

  it('navigates to the next month', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <Calendar />
        </TaskProvider>
      </ProfileProvider>
    );

    const nextButton = screen.getByText('▶');
    fireEvent.click(nextButton);

    const header = screen.getByText(/February 2024/i);
    expect(header).toBeInTheDocument();
  });

  it('navigates to the previous month', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <Calendar />
        </TaskProvider>
      </ProfileProvider>
    );

    const prevButton = screen.getByText('◀');
    fireEvent.click(prevButton);

    const header = screen.getByText(/December 2023/i);
    expect(header).toBeInTheDocument();
  });

  it('switches to weekly view', () => {
    render(
      <ProfileProvider>
        <TaskProvider>
          <Calendar />
        </TaskProvider>
      </ProfileProvider>
    );

    const weeklyButton = screen.getByText('Weekly');
    fireEvent.click(weeklyButton);

    const header = screen.getByText(/Week of/i);
    expect(header).toBeInTheDocument();
  });
});