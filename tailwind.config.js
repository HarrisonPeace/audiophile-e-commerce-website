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
        "gray-light": "#FAFAFA",
        "gray-medium": "#F1F1F1",
        "gray-dark": "#101010",
      },
      boxShadow: {
        product: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
  },
};
