import { useState, useEffect } from "react";
import "./App.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Digital Clock — Hook focus:
 *   useState  -> current Date + 12/24h mode
 *   useEffect -> tick every second, clear the interval on unmount
 */
export default function App() {
  const [now, setNow] = useState(new Date());
  const [h24, setH24] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let h = now.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  if (!h24) h = h % 12 || 12;

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="screen">
      <div className="clock">
        <div className="time">
          {pad(h)}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
          {!h24 && <span className="ampm">{ampm}</span>}
        </div>
        <div className="date">{dateStr}</div>
        <button className="toggle" onClick={() => setH24((v) => !v)}>
          Switch to {h24 ? "12-hour" : "24-hour"}
        </button>
      </div>
    </div>
  );
}
