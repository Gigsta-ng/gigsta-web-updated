import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    host: true, // allows access from any IP / public host
    allowedHosts: ['.ngrok-free.dev'], // allow ngrok URLs
    port: 5173, // your dev server port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
