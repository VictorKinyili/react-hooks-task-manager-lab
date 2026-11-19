import { useRef, useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const searchRef = useRef(null);
  const { tasks, toggleComplete } = useContext(TaskContext);
  const [query, setQuery] = useState("");

  function handleSearch() {
    setQuery(searchRef.current.value);
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;