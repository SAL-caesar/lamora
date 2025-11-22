/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lamoraBlack: "#050509",
        lamoraGold: "#f6c453",
        lamoraGray: "#1b1b23"
      }
    }
  },
  plugins: []
};
