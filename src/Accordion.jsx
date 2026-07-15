import { useState } from "react";
import "./Accordion.css";

// FAQ data for the accordion.
const ITEMS = [
  {
    id: "what",
    q: "What are accordion components?",
    a: "An accordion is a vertically stacked list of headers that each reveal a section of content when clicked. It lets you show a lot of information in a compact space, expanding only the part the user is interested in.",
  },
  {
    id: "use",
    q: "What are they used for?",
    a: "They're commonly used for FAQs, settings panels, product details, and navigation menus — anywhere you want to keep the page tidy and let users drill into just the sections they care about.",
  },
  {
    id: "music",
    q: "Accordion as a musical instrument",
    a: "Yes! The UI pattern is named after the musical instrument — a box-shaped instrument played by compressing and expanding bellows while pressing buttons or keys. The 'expand and collapse' idea is exactly why the component borrows the name.",
  },
  {
    id: "framework",
    q: "Can I create an accordion component with a different framework?",
    a: "Absolutely. The concept is framework-agnostic — you can build one in React, Vue, Angular, Svelte, or plain HTML/CSS/JS. This particular example is built in React using the useState hook to track which items are open.",
  },
];

export default function Accordion() {
  // multi = false -> single select (only one open at a time)
  // multi = true  -> multi select (many can be open together)
  const [multi, setMulti] = useState(false);
  const [openIds, setOpenIds] = useState([]);

  function toggleItem(id) {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (multi) {
        // add/remove from the set of open items
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      // single mode: open just this one (or close it if already open)
      return isOpen ? [] : [id];
    });
  }

  function toggleMulti() {
    setMulti((m) => !m);
    setOpenIds([]); // reset so switching modes never leaves a weird state
  }

  return (
    <div className="accordion">
      <button
        className={`multi-btn ${multi ? "on" : ""}`}
        onClick={toggleMulti}
        aria-pressed={multi}
      >
        <span className="dot" />
        {multi ? "Multi Selection: ON" : "Enable Multi Selection"}
      </button>

      <div className="items">
        {ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div className={`item ${isOpen ? "open" : ""}`} key={item.id}>
              <button
                className="head"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
              >
                <span className="q">{item.q}</span>
                <span className="icon">{isOpen ? "−" : "+"}</span>
              </button>
              <div className="panel">
                <div className="panel-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
