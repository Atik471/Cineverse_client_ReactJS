/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(217,2,2)",
      },
      fontFamily: {
        primary: "Montserrat, sans-serif",
      }
    },
  },
  plugins: [],
}

