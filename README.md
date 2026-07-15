# React Projects

Each project lives in its own folder. First up:

| Folder | Project | Hooks | Description |
| --- | --- | --- | --- |
| [`accordion/`](accordion/) | Accordion | `useState` | Single / multi-select FAQ accordion |

Live: **https://moon-89.github.io/React-hook/**

## Run a project

```bash
cd accordion
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into accordion/dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the `accordion/`
project and publishes it to GitHub Pages. In the repo, set
**Settings → Pages → Source → GitHub Actions** once.
