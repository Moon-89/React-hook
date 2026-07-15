import { useState, useEffect, useRef } from "react";
import "./App.css";

const STORAGE_KEY = "hooks-pack-todos";

/**
 * Todo List — Hook focus:
 *   useState  -> todos, input text, active filter
 *   useEffect -> persist todos to localStorage on every change
 *   useRef    -> keep the text input focused after adding
 */
export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos([{ id: Date.now(), text: value, done: false }, ...todos]);
    setText("");
    inputRef.current?.focus();
  }

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));
  const clearDone = () => setTodos(todos.filter((t) => !t.done));

  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "done" ? t.done : true
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="screen">
      <div className="todo">
        <h1>Todo List</h1>
        <p className="sub">useState · useEffect (localStorage) · useRef (focus)</p>

        <form onSubmit={addTodo}>
          <input
            ref={inputRef}
            type="text"
            placeholder="What needs doing?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <button className="add" type="submit">Add</button>
        </form>

        <div className="filters">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="empty">Nothing here yet.</p>
        ) : (
          <ul>
            {visible.map((t) => (
              <li key={t.id} className={t.done ? "done" : ""}>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                <span className="txt" onClick={() => toggle(t.id)}>{t.text}</span>
                <button className="del" onClick={() => remove(t.id)}>×</button>
              </li>
            ))}
          </ul>
        )}

        <div className="foot">
          <span>{remaining} item{remaining !== 1 ? "s" : ""} left</span>
          <button className="clear" onClick={clearDone}>Clear completed</button>
        </div>
      </div>
    </div>
  );
}
