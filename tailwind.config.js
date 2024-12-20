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
      colors: {
        'nft-indigo': '#6366f1',
        'nft-purple': '#8b5cf6',
        'nft-pink': '#d946ef',
      },
      backgroundImage: {
        'gradient-nft': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
      },
    },
  },
  plugins: [],
  // Ensure Tailwind doesn't conflict with Framer's styles
  important: true,
  // Prefix all classes to avoid conflicts
  prefix: 'nft-',
};
