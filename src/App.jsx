import { Routes, Route, Link, useParams } from "react-router-dom";
import { APPS } from "./apps/registry.js";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="brand">⚛️ React <span>Hooks</span> Pack</Link>
      <Link to="/" className="back">← All apps</Link>
    </nav>
  );
}

function Home() {
  return (
    <div className="page">
      <div className="home-head">
        <h1>React Hooks Project Pack</h1>
        <p>8 hook-focused apps — useState · useEffect · useRef</p>
      </div>
      <div className="grid">
        {APPS.map((app) => (
          <Link key={app.slug} to={`/app/${app.slug}`} className="app-card">
            <div className="num">APP {app.num}</div>
            <h2>{app.title}</h2>
            <div className="hooks">
              {app.hooks.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AppHost() {
  const { slug } = useParams();
  const app = APPS.find((a) => a.slug === slug);
  if (!app) {
    return (
      <div className="page">
        <p>App not found. <Link to="/">Go home</Link></p>
      </div>
    );
  }
  const { Component } = app;
  return (
    <div className="page">
      <Component />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/:slug" element={<AppHost />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
