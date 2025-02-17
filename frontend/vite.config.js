import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname), // Ensure root is the frontend directory
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Output to dist directory
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Correctly specify the path to index.html
    },
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: process.env.PORT || 3000, // Use Render's assigned port or default to 3000
    allowedHosts: ['final-code-ianu.onrender.com'], // Allow Render's domain
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
