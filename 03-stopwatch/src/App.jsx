import { useState, useEffect, useRef } from "react";
import "./App.css";

const pad = (n, l = 2) => String(n).padStart(l, "0");
function format(ms) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return { main: `${pad(m)}:${pad(s)}`, cs: pad(cs) };
}

/**
 * Stopwatch — Hook focus:
 *   useState  -> elapsed ms, running flag, laps
 *   useRef    -> hold the interval id + start timestamp across renders
 *   useEffect -> start/stop interval when `running` changes, cleanup on unmount
 */
export default function App() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function reset() {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  }
  function addLap() {
    if (running) setLaps([{ n: laps.length + 1, t: elapsed }, ...laps]);
  }

  const { main, cs } = format(elapsed);

  return (
    <div className="screen">
      <div className="stopwatch">
        <h1>Stopwatch</h1>
        <p className="tag">useState · useRef · useEffect</p>
        <div className="time">{main}<span className="ms">.{cs}</span></div>
        <div className="row">
          <button className={running ? "stop" : "start"} onClick={() => setRunning((r) => !r)}>
            {running ? "Stop" : "Start"}
          </button>
          <button className="lap" onClick={addLap} disabled={!running}>Lap</button>
          <button className="reset" onClick={reset}>Reset</button>
        </div>
        {laps.length > 0 && (
          <ul className="laps">
            {laps.map((l) => {
              const f = format(l.t);
              return (
                <li key={l.n}>
                  <span>Lap {l.n}</span>
                  <span>{f.main}.{f.cs}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
