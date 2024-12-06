/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(231,166,29)",
      },
      fontFamily: {
        primary: "Montserrat, sans-serif",
      }
    },
  },
  plugins: [],
}

