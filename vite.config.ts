import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://test-az-1.onrender.com",
      "/uploads": "https://test-az-1.onrender.com",
    },
  },
  plugins: [react()],
});
