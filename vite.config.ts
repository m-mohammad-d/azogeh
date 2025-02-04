import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://azooghe.onrender.com",
      "/uploads": "https://azooghe.onrender.com",
    },
  },
  plugins: [react()],
});
