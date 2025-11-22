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
        lamoraGold: "#f5c451",
        lamoraGray: "#0f1015"
      }
    }
  },
  plugins: []
};
