/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lamoraDark: "#050816",
        lamoraPrimary: "#00D395",
        lamoraSecondary: "#0F172A"
      }
    }
  },
  plugins: []
};
