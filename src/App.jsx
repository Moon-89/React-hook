import { Routes, Route, Link, useParams } from "react-router-dom";
import { APPS } from "./apps/registry.js";

function Nav({ current }) {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <span className="brand-mark">⚛</span>
        React <span className="grad">Hooks</span> Pack
      </Link>
      {current && (
        <span className="crumb">
          <span className="crumb-sep">/</span>
          <span className="crumb-icon">{current.icon}</span>
          {current.title}
        </span>
      )}
      <Link to="/" className="back">{current ? "← All apps" : ""}</Link>
    </nav>
  );
}

function Home() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-badge">React 18 · Vite · Hooks</div>
        <h1>React Hooks Project Pack</h1>
        <p>
          Eight small, focused apps — each one a hands-on study of{" "}
          <b>useState</b>, <b>useEffect</b>, and <b>useRef</b>.
        </p>
      </header>

      <div className="grid">
        {APPS.map((app, i) => (
          <Link
            key={app.slug}
            to={`/app/${app.slug}`}
            className="app-card"
            style={{ "--card": app.accent, animationDelay: `${i * 55}ms` }}
          >
            <div className="card-top">
              <span className="card-icon">{app.icon}</span>
              <span className="card-num">{app.num}</span>
            </div>
            <h2>{app.title}</h2>
            <p className="blurb">{app.blurb}</p>
            <div className="hooks">
              {app.hooks.map((h) => (
                <span key={h} className="hook">{h}</span>
              ))}
            </div>
            <span className="card-go">Open →</span>
          </Link>
        ))}
      </div>

      <footer className="foot-note">
        Built with React 18 + Vite · useState · useEffect · useRef
      </footer>
    </div>
  );
}

function AppHost() {
  const { slug } = useParams();
  const app = APPS.find((a) => a.slug === slug);
  if (!app) {
    return (
      <>
        <Nav />
        <div className="page">
          <p className="not-found">App not found. <Link to="/" className="grad">Go home →</Link></p>
        </div>
      </>
    );
  }
  const { Component } = app;
  return (
    <>
      <Nav current={app} />
      <div className="page app-page" style={{ "--card": app.accent }} key={slug}>
        <Component />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<><Nav /><Home /></>} />
      <Route path="/app/:slug" element={<AppHost />} />
      <Route path="*" element={<><Nav /><Home /></>} />
    </Routes>
  );
}
