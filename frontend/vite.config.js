export default {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000', // Ensure it includes the protocol
          changeOrigin: true, // Needed for virtual hosted sites
          secure: false, // Set to false if the backend is not using HTTPS
        },
      },
    },
  };
  