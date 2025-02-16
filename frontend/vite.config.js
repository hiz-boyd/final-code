import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Your backend server
        changeOrigin: true,
        // No need to rewrite the path since the backend already expects '/api/'
      },
    },
  },
});