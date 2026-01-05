
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskList from '../components/TaskList';

// Mock the context (define jest.fn inside the factory; no out-of-scope refs)
jest.mock('../context/TaskContext', () => ({
    useTasks: jest.fn(),
}));

// Mock AddEditTask as a simple stub component (created inside the factory)
jest.mock('../components/AddEditTask', () => ({
    __esModule: true,
    default: () => <div data-testid="add-edit-task">AddEditTask</div>,
}));

// Mock TaskItem INSIDE the factory and export it as default.
//    Because we create the jest.fn in the factory, we can import it and assert calls.
jest.mock('../components/TaskItem', () => {
    const MockTaskItem = jest.fn(({ task }) => (
        <div data-testid="task-item">{task.title}</div>
    ));
    return { __esModule: true, default: MockTaskItem };
});

// After mocks, import the mocked functions to control/inspect them.
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

describe('TaskList', () => {
    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    test('shows loading state when loading is true', () => {
        useTasks.mockReturnValue({ loading: true, tasks: [] });

        render(<TaskList />);

        expect(screen.getByText(/Loading tasks/i)).toBeInTheDocument();
        expect(screen.queryByTestId('add-edit-task')).not.toBeInTheDocument();
        expect(screen.queryAllByTestId('task-item')).toHaveLength(0);
    });

    test('renders AddEditTask when not loading', () => {
        useTasks.mockReturnValue({ loading: false, tasks: [] });

        render(<TaskList />);
        expect(screen.getByTestId('add-edit-task')).toBeInTheDocument();
    });

    test('renders one TaskItem per task', () => {
        const tasks = [
            { id: '1', title: 'Task A' },
            { id: '2', title: 'Task B' },
        ];
        useTasks.mockReturnValue({ loading: false, tasks });

        render(<TaskList />);

        const items = screen.getAllByTestId('task-item');
        expect(items).toHaveLength(2);
        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.getByText('Task B')).toBeInTheDocument();
    });


    test('passes correct props to TaskItem', () => {
        const tasks = [
            { id: '1', title: 'Task A', done: false },
            { id: '2', title: 'Task B', done: true },
        ];
        useTasks.mockReturnValue({ loading: false, tasks });

        render(<TaskList />);

        expect(TaskItem).toHaveBeenCalledTimes(tasks.length);

        // First call props
        expect(TaskItem.mock.calls[0][0]).toEqual(
            expect.objectContaining({ task: tasks[0] })
        );
        // Second call props
        expect(TaskItem.mock.calls[1][0]).toEqual(
            expect.objectContaining({ task: tasks[1] })
        );

    });

});
