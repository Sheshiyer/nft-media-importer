/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      minHeight: {
        '400': '400px',
      },
    },
  },
  plugins: [],
  // Ensure Tailwind doesn't conflict with Framer's styles
  important: true,
  // Prefix all classes to avoid conflicts
  prefix: 'nft-',
};
