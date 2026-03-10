/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← enables dark/light toggle via HTML class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};