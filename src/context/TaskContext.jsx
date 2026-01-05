import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks().then((data) => {
            setTasks(data);
            setLoading(false);
        });
    }, []);

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const addTask = (title) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        }
        setTasks((prev) => [newTask, ...prev]);
    };

    const editTask = (id, title) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title } : task
            )
        );
    };

    return (
        <TaskContext.Provider
            value={{ tasks, loading, toggleTask, addTask, editTask }}
        >
            {children}
        </TaskContext.Provider>
    )

};

export const useTasks = () => useContext(TaskContext);