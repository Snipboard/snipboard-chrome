/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        leagueSpartan: ["leagueSpartan", "sans-serif"],
      },
      colors: {
        darkBlue: "#022135",
        blue: "#7BB7E0",
        lightBlue: "#DDE9F1",
        lightRed: "#FF4C4C",
        darkRed: "#560216"
      }
    },
  },
  plugins: [],
}

