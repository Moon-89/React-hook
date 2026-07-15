# React Hooks Project Pack

8 **standalone** hook-focused React apps — **one app per folder**. Every app is its own complete
Vite + React 18 project with its own `package.json`, so each folder runs, builds, and deploys on
its own. The folders are also wired together as an npm workspace, so a single `npm install` at the
repo root sets up all 8 at once.

## Acceptance criteria → where it's covered

| Requirement | Covered by |
| --- | --- |
| `useState`, `useEffect`, `useRef` used appropriately across projects | See the table below |
| Weather app fetches & displays **live** API data | [`07-weather/`](07-weather/) — Open-Meteo, no key |
| Food recipe app has **search & filter** | [`08-recipe/`](08-recipe/) — TheMealDB, no key |

## The 8 apps

| # | Folder | App | Hooks used |
| --- | --- | --- | --- |
| 1 | [`01-counter/`](01-counter/) | Counter | `useState` |
| 2 | [`02-todo/`](02-todo/) | Todo List | `useState` · `useEffect` (localStorage) · `useRef` (focus) |
| 3 | [`03-stopwatch/`](03-stopwatch/) | Stopwatch | `useState` · `useEffect` · `useRef` (interval + cleanup) |
| 4 | [`04-color-picker/`](04-color-picker/) | Color Picker | `useState` · `useEffect` |
| 5 | [`05-digital-clock/`](05-digital-clock/) | Digital Clock | `useState` · `useEffect` (tick + cleanup) |
| 6 | [`06-character-counter/`](06-character-counter/) | Character Counter | `useState` · `useRef` (programmatic focus) |
| 7 | [`07-weather/`](07-weather/) | Weather App | `useState` · `useEffect` · `fetch` (live API) |
| 8 | [`08-recipe/`](08-recipe/) | Recipe Finder | `useState` · `useEffect` · `fetch` (search + filter) |

## How to run

### Run a single app (simplest)

```bash
cd 01-counter        # or any app folder
npm install
npm run dev          # opens http://localhost:5173
npm run build        # production build into that folder's dist/
```

### Run any app from the repo root (workspace)

```bash
npm install          # once — installs deps for all 8 apps
npm run dev:counter  # dev:todo, dev:stopwatch, dev:color-picker,
                     # dev:digital-clock, dev:character-counter,
                     # dev:weather, dev:recipe
npm run build:all    # build every app
```

## Each app's structure

```
0X-name/
├─ package.json      # its own dependencies + dev/build scripts
├─ vite.config.js
├─ index.html
└─ src/
   ├─ main.jsx       # mounts <App/>
   ├─ App.jsx        # the app (uses the hooks)
   ├─ App.css        # app-specific styles
   └─ index.css      # shared reset + theme variables
```

## APIs used (both free, no API key)

- **Weather:** [Open-Meteo](https://open-meteo.com/) — geocoding + current weather
- **Recipes:** [TheMealDB](https://www.themealdb.com/api.php) — search & lookup

> Apps 7 and 8 need an internet connection (live APIs). The other 6 work offline.
