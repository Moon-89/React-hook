import { useState, useRef } from "react";
import "./App.css";

/**
 * Character Counter — Hook focus:
 *   useState -> textarea content + configurable limit
 *   useRef   -> focus the textarea programmatically
 */
export default function App() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(280);
  const textRef = useRef(null);

  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const pct = Math.min(100, (chars / limit) * 100);
  const over = chars > limit;

  return (
    <div className="screen">
      <div className="cc">
        <h1>Character Counter</h1>
        <p className="sub">useState (text) · useRef (focus the editor)</p>

        <textarea
          ref={textRef}
          value={text}
          placeholder="Start typing…"
          onChange={(e) => setText(e.target.value)}
        />

        <div className="bar">
          <div className={over ? "over" : ""} style={{ width: `${pct}%` }} />
        </div>
        <p className="warn">{over ? `Over the limit by ${chars - limit} characters` : ""}</p>

        <div className="stats">
          <div className="stat"><b>{chars}</b><span>characters</span></div>
          <div className="stat"><b>{words}</b><span>words</span></div>
          <div className="stat"><b>{lines}</b><span>lines</span></div>
        </div>

        <div className="row">
          <label>Limit</label>
          <input
            type="number"
            min="1"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value) || 1)}
          />
          <button onClick={() => textRef.current?.focus()}>Focus editor</button>
        </div>
      </div>
    </div>
  );
}
