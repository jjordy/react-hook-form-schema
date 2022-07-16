import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
/** @type {import('vite').UserConfig} */
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./setupTests.js"],
  },
});
