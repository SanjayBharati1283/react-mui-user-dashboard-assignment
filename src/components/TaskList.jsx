import React from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from './TaskItem';
import AddEditTask from './AddEditTask';

const TaskList = () => {
    const { tasks, loading } = useTasks();

    if (loading) return <p>Loading tasks...</p>

    return (
        <div className="task-list">
            <AddEditTask />
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;