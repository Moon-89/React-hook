import Accordion from "./Accordion.jsx";

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero-badge">React · useState</div>
        <h1>Accordion Component</h1>
        <p>
          Click a question to expand it. It's <b>single-select</b> by default —
          turn on <b>Multi Selection</b> to keep several open at once.
        </p>
      </header>

      <Accordion />

      <footer className="foot-note">Built with React 18 + Vite · useState</footer>
    </main>
  );
}
