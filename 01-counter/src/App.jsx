import { useState } from "react";
import "./App.css";

/**
 * Counter — Hook focus: useState (count + adjustable step).
 */
export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const tone = count > 0 ? "pos" : count < 0 ? "neg" : "zero";

  return (
    <div className="screen">
      <div className="counter">
        <h1>Counter</h1>
        <p className="tag">useState</p>
        <div className={`count ${tone}`}>{count}</div>
        <div className="row">
          <button className="dec" onClick={() => setCount((c) => c - step)}>−</button>
          <button className="reset" onClick={() => setCount(0)}>Reset</button>
          <button className="inc" onClick={() => setCount((c) => c + step)}>+</button>
        </div>
        <label className="step">
          Step
          <input
            type="number"
            min="1"
            value={step}
            onChange={(e) => setStep(Number(e.target.value) || 1)}
          />
        </label>
      </div>
    </div>
  );
}
