/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./storyblok/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
      },
      colors: {
        primary: "#E7816B",
        secondary: "#FFAD9B",
        "black-theme": "#1D1C1E",
        "white-theme": "#FFFFFF",
        "grey-dark": "#333136",
        "grey-light": "#F1F3F5",
      },
      screens: {
        "3xl": "2000px",
      },
    },
    fontFamily: {
      body: ["Jost", "sans-serif"],
      headings: ["Jost", "sans-serif"],
    },
  },
};
