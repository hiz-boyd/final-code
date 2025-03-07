// import { defineConfig } from 'vite';
// import path from 'path';

// export default defineConfig({
//   root: path.resolve(__dirname), 
//   build: {
//     outDir: path.resolve(__dirname, 'dist'), 
//     rollupOptions: {
//       input: path.resolve(__dirname, 'index.html'), 
//     },
//   },
//   server: {
//     host: '0.0.0.0', 
//     port: process.env.PORT || 3000,
//     allowedHosts: ['final-code-ianu.onrender.com'], 
//     proxy: {
//       '/api': {
//         target: 'https://prime-backend-g57x.onrender.com',
//         changeOrigin: true,
//       },
//     },
//   },
// });



import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname), // Keep root as frontend directory
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Output to dist directory
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Entry point is index.html
    },
  },
  server: {
    host: 'localhost', // Local development, no external access needed
    port: 5173, // Vite's default port, adjust if needed
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Proxy to local Django server
        changeOrigin: true, // Ensure host header matches target
        secure: false, // No HTTPS locally
      },
    },
  },
});