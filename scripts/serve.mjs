// Tiny zero-dependency static server for the ./_site folder.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "_site");
const PORT = process.env.PORT || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let filePath = normalize(join(root, path));
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    let info = await stat(filePath).catch(() => null);
    if (info && info.isDirectory()) {
      filePath = join(filePath, "index.html");
      info = await stat(filePath).catch(() => null);
    }
    if (!info) {
      res.writeHead(404).end("Not found");
      return;
    }
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": TYPES[extname(filePath)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500).end("Server error");
  }
});

function listen(port, triesLeft = 10) {
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && triesLeft > 0) {
      console.log(`Port ${port} is busy, trying ${port + 1}…`);
      listen(port + 1, triesLeft - 1);
    } else {
      throw err;
    }
  });
  server.listen(port, () => {
    console.log(`\n✅ Gallery running at:  http://localhost:${port}/\n   (Ctrl+C to stop)`);
  });
}

listen(Number(PORT));
