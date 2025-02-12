/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './login.html', './register.html', './support.html', 'reset.html', './message-sent.html', './dashboard.html', './example.html', './selecte-plan.html',
    './invest-now.html', './invest-now-message.html', './withdraw.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.5s ease-in-out', // Shake animation
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
