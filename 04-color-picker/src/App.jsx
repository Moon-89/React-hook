import { useState, useEffect } from "react";
import "./App.css";

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6", "#3b82f6",
  "#6366f1", "#a855f7", "#ec4899", "#0f172a", "#64748b", "#f8fafc",
];

/**
 * Background Color Picker — Hook focus:
 *   useState  -> current color + copied flag
 *   useEffect -> paint the whole page background whenever the color changes;
 *                also auto-clear the "copied" badge.
 */
export default function App() {
  const [color, setColor] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.background = color;
    return () => { document.body.style.background = ""; };
  }, [color]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(id);
  }, [copied]);

  function copy() {
    navigator.clipboard?.writeText(color);
    setCopied(true);
  }

  return (
    <div className="screen">
      <div className="picker">
        <h1>Color Picker</h1>
        <p className="tag">useState · useEffect</p>
        <div className="value" style={{ color }}>{color.toUpperCase()}</div>
        <div className="copy" onClick={copy}>{copied ? "✓ copied!" : "click to copy hex"}</div>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <div className="swatches">
          {PRESETS.map((c) => (
            <button
              key={c}
              className={c === color ? "sel" : ""}
              style={{ background: c }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
