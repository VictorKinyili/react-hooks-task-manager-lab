import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function addTask(title) {
    const newTask = { title, completed: false };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((createdTask) => {
        setTasks((prevTasks) => [...prevTasks, createdTask]);
      });
  }

  function toggleComplete(id) {
    const targetTask = tasks.find((task) => task.id === id);
    if (!targetTask) return;

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !targetTask.completed }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      });
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, toggleComplete, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}