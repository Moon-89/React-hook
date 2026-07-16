# React Projects

Each project lives in its own folder.

| Folder | Project | Hooks | Description |
| --- | --- | --- | --- |
| [`accordion/`](accordion/) | Accordion | `useState` | Single / multi-select FAQ accordion |
| [`color-generator/`](color-generator/) | Random Color Generator | `useState`, `useEffect` | Generate random HEX / RGB colors |
| [`star-rating/`](star-rating/) | Star Rating | `useState` | Interactive hover + click star rating |
| [`image-slider/`](image-slider/) | Image Slider | `useState`, `useEffect` | Carousel with images fetched from an API |
| [`load-more/`](load-more/) | Load More Data | `useState`, `useEffect` | Paginated product grid with a Load More button |
| [`recursive-menu/`](recursive-menu/) | Recursive Menu | `useState` | Nested sidebar menu built with recursion |

Live (Accordion): **https://moon-89.github.io/React-hook/**

## Run a project

```bash
cd accordion            # or: color-generator / star-rating / image-slider / load-more / recursive-menu
npm install
npm run dev             # http://localhost:5173
npm run build           # production build into that folder's dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds one project
and publishes it to GitHub Pages (currently `accordion/`). GitHub Pages serves a single
site per repo — to make a different project live, change the folder in the workflow.
In the repo, set **Settings → Pages → Source → GitHub Actions** once.
