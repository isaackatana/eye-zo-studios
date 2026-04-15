/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          gold: "#c8a96b",
          cream: "#f5f1e8",
        },
      },
    },
  },
  plugins: [],
}