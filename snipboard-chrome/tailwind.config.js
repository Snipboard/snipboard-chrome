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
        darkRed: "#560216",
        codeBg: "#1E1E1E",
        darkCodeBg: "#121212",
        lightCodeBg: "#2E2E2E"
      }
    },
  },
  plugins: [],
}

