import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset URLs relative so it works on a GitHub Pages subpath.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
