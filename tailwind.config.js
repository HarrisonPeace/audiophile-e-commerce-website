/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,vue}", "./components/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
      },
      colors: {
        primary: "#D87D4A",
        "primary-light": "#FBAF85",
        dark: "#000000",
        light: "#FFFFFF",
        "gray-light": "#333136",
        "gray-medium": "#333136",
        "gray-dark": "#F1F3F5",
      },
      screens: {
        "3xl": "2000px",
      },
    },
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
  },
};
