/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        dark: "#080025",
        light: "#f7ffff",
        "lighter-gray": "#f2f3f4",
        "darker-gray": "#2d2d41",
      },
    },
  },
  plugins: [],
};
