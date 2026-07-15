import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// base: "./" makes all asset URLs relative, so the built site works whether it's
// served from a domain root or a GitHub Pages project subpath (e.g. /React-hook/).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
