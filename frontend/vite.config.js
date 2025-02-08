import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {  // Ensure you define 'server' first
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes "/api" prefix
      },
    },
  },
});
