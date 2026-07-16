// Build the landing page + every project into a single ./_site folder.
// Gallery goes at the root; each project goes into its own subfolder so the
// landing links (./accordion/, ./food-recipe/, ...) resolve correctly.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS = [
  "accordion",
  "color-generator",
  "star-rating",
  "image-slider",
  "load-more",
  "recursive-menu",
  "weather-app",
  "food-recipe",
];

const site = join(root, "_site");
rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });

// landing page at the site root
cpSync(join(root, "landing", "index.html"), join(site, "index.html"));

for (const p of PROJECTS) {
  const dir = join(root, p);
  console.log(`\n▶ building ${p} …`);
  if (!existsSync(join(dir, "node_modules"))) {
    execSync("npm install", { cwd: dir, stdio: "inherit" });
  }
  execSync("npm run build", { cwd: dir, stdio: "inherit" });
  cpSync(join(dir, "dist"), join(site, p), { recursive: true });
}

console.log("\n✅ Built the gallery into ./_site — serve it with:  npm run preview");
