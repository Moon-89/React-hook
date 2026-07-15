# React Projects

Each project lives in its own folder.

| Folder | Project | Hooks | Description |
| --- | --- | --- | --- |
| [`accordion/`](accordion/) | Accordion | `useState` | Single / multi-select FAQ accordion |
| [`color-generator/`](color-generator/) | Random Color Generator | `useState`, `useEffect` | Generate random HEX / RGB colors |

Live (Accordion): **https://moon-89.github.io/React-hook/**

## Run a project

```bash
cd accordion            # or: cd color-generator
npm install
npm run dev             # http://localhost:5173
npm run build           # production build into that folder's dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds one project
and publishes it to GitHub Pages (currently `accordion/`). GitHub Pages serves a single
site per repo — to make a different project live, change the folder in the workflow.
In the repo, set **Settings → Pages → Source → GitHub Actions** once.
