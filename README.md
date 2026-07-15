# React Accordion

An accordion component built with **React 18 + Vite**. It's **single-select** by default
(only one panel open at a time); clicking **Enable Multi Selection** switches to **multi-select**
so several panels can stay open together.

Live: **https://moon-89.github.io/React-hook/**

## Features

- Single-select mode (default) — opening one item closes the others
- Multi-select mode — toggle it on to keep multiple items open
- Smooth expand/collapse animation, rotating +/− icon
- All driven by the `useState` hook

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the build
```

## Structure

```
src/
├─ main.jsx         # entry — mounts <App/>
├─ App.jsx          # page layout + heading
├─ Accordion.jsx    # the accordion (useState for open items + mode)
├─ Accordion.css
└─ index.css        # theme + base styles
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes
`dist/` to GitHub Pages. In the repo, set **Settings → Pages → Source → GitHub Actions** once.
