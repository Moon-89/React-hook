import { useState, useEffect } from "react";
import "./ColorGenerator.css";

// pick a random integer in [0, length)
function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

export default function ColorGenerator() {
  const [type, setType] = useState("hex"); // "hex" | "rgb"
  const [color, setColor] = useState("#9F77B8");
  const [copied, setCopied] = useState(false);

  function makeHexColor() {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let hex = "#";
    for (let i = 0; i < 6; i++) hex += digits[randomIndex(digits.length)];
    setColor(hex);
  }

  function makeRgbColor() {
    const r = randomIndex(256);
    const g = randomIndex(256);
    const b = randomIndex(256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }

  function generate() {
    type === "hex" ? makeHexColor() : makeRgbColor();
  }

  // useEffect: whenever the color type changes, generate a fresh color of that type
  useEffect(() => {
    type === "hex" ? makeHexColor() : makeRgbColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  function copy() {
    navigator.clipboard?.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="cg" style={{ background: color }}>
      <div className="controls">
        <button className={type === "hex" ? "active" : ""} onClick={() => setType("hex")}>
          Create HEX Color
        </button>
        <button className={type === "rgb" ? "active" : ""} onClick={() => setType("rgb")}>
          Create RGB Color
        </button>
        <button className="primary" onClick={generate}>
          Generate Random Color
        </button>
      </div>

      <div className="display">
        <h1 className="label">{type === "hex" ? "HEX Color" : "RGB Color"}</h1>
        <p className="value" onClick={copy} title="Click to copy">
          {color}
        </p>
        <span className="copied" data-show={copied}>copied to clipboard ✓</span>
      </div>
    </div>
  );
}
