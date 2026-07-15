# React Hooks Project Pack

8 hook-focused React apps built with **Vite + React 18**. Each app lives in its own folder
under [`src/apps/`](src/apps/) and is reachable from a home menu. The whole pack is one installable
project (one `npm install`), and every app is a real React component using hooks — `useState`,
`useEffect`, and `useRef`.

## Acceptance criteria → where it's covered

| Requirement | Covered by |
| --- | --- |
| `useState`, `useEffect`, `useRef` used appropriately | Across the apps — see the table below |
| Weather app fetches & displays **live** API data | [`src/apps/weather`](src/apps/weather/) — Open-Meteo, no key |
| Food recipe app has **search & filter** | [`src/apps/recipe`](src/apps/recipe/) — TheMealDB, no key |

## The 8 apps

| # | App | Folder | Hooks |
| --- | --- | --- | --- |
| 1 | Counter | [`src/apps/counter`](src/apps/counter/) | `useState` |
| 2 | Todo List | [`src/apps/todo`](src/apps/todo/) | `useState` · `useEffect` (localStorage) · `useRef` (focus) |
| 3 | Stopwatch | [`src/apps/stopwatch`](src/apps/stopwatch/) | `useState` · `useEffect` · `useRef` (interval + cleanup) |
| 4 | Color Picker | [`src/apps/color-picker`](src/apps/color-picker/) | `useState` · `useEffect` |
| 5 | Digital Clock | [`src/apps/digital-clock`](src/apps/digital-clock/) | `useState` · `useEffect` (tick + cleanup) |
| 6 | Character Counter | [`src/apps/character-counter`](src/apps/character-counter/) | `useState` · `useRef` (programmatic focus) |
| 7 | Weather (live API) | [`src/apps/weather`](src/apps/weather/) | `useState` · `useEffect` · `fetch` |
| 8 | Recipe Finder | [`src/apps/recipe`](src/apps/recipe/) | `useState` · `useEffect` · `fetch` |

## Run it

```bash
npm install     # once
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # production build into dist/
npm run preview # preview the production build
```

Open the printed URL, then pick an app from the home grid.

## Project structure

```
src/
├─ main.jsx                # entry — mounts <App/> inside a HashRouter
├─ App.jsx                 # home grid + routes to each app
├─ index.css               # shared theme + layout
└─ apps/
   ├─ registry.js          # single list of the 8 apps (drives home + router)
   ├─ counter/
   ├─ todo/
   ├─ stopwatch/
   ├─ color-picker/
   ├─ digital-clock/
   ├─ character-counter/
   ├─ weather/             # live API fetch
   └─ recipe/              # search + filter
```

## APIs used (both free, no API key)

- **Weather:** [Open-Meteo](https://open-meteo.com/) — geocoding + current weather
- **Recipes:** [TheMealDB](https://www.themealdb.com/api.php) — search & lookup

> Apps 7 and 8 need an internet connection (live APIs). The other 6 work offline.
