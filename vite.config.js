import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Base path matches the GitHub repository name for Pages deployment
  // For local dev this is overridden by the dev server
  base: process.env.NODE_ENV === 'production' ? '/CLI-Teacher/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true
  }
});
