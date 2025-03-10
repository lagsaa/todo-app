import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, isEditing: false }]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isEditing: true } : task
    ));
  };

  const saveEdit = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText, isEditing: false } : task
    ));
  };

  const filteredTasks = tasks.filter((task) => 
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
  );

  return (
    <div className="todo-container">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-gray-800 text-white rounded">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button onClick={addTask} className="todo-button">
        Add Task
      </button>

      <div className="filter-buttons mt-4">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>
          Completed
        </button>
        <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>
          Pending
        </button>
      </div>

      <ul className="mt-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="todo-item">
            <div className="flex items-center">
              <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
              {task.isEditing ? (
                <input 
                  type="text" 
                  defaultValue={task.text} 
                  onBlur={(e) => saveEdit(task.id, e.target.value)}
                  className="border p-1"
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>{task.text}</span>
              )}
            </div>
            <button onClick={() => startEditing(task.id)} className="text-blue-500">✏️ Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
