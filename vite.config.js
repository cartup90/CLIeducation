import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base path ensures GitHub Pages assets load correctly regardless of repository name
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true
  }
});
