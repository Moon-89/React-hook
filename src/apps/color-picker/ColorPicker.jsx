import { useState, useEffect } from "react";
import "./color-picker.css";

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6", "#3b82f6",
  "#6366f1", "#a855f7", "#ec4899", "#0f172a", "#64748b", "#f8fafc",
];

/**
 * App 4 — Background Color Picker
 * Hook focus:
 *   useState  -> current color + copied flag
 *   useEffect -> apply the color to a preview panel (side effect after render)
 */
export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  // Reset the "copied" badge shortly after it appears.
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
    <div className="center">
      <div className="preview" style={{ background: color }}>
        <div className="card picker">
          <h1>Color Picker</h1>
          <p className="tag">useState · useEffect</p>
          <div className="value" style={{ color }}>{color.toUpperCase()}</div>
          <div className="copy" onClick={copy}>
            {copied ? "✓ copied!" : "click to copy hex"}
          </div>
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
    </div>
  );
}
