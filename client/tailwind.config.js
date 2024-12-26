/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#4a000f",
          200: "#6c0419",
          300: "#8e0d28",
          400: "#b01b39",
          500: "#d22c4e",
          600: "#f44166",
          700: "#ff6e8c",
          800: "#ff98ad",
          900: "#ffc2cf",
          1000: "#ffecf0",
        },
        secondary: {
          100: "#1f4d0c",
          200: "#316f17",
          300: "#459126",
          400: "#5cb338",
          500: "#76d54e",
          600: "#92f768",
          700: "#aeff8c",
          800: "#c5ffae",
          900: "#ddffcf",
          1000: "#f4fff0",
        },
        neutral: {
          100: "#cbcbcb",
          200: "#f9f9f9",
          300: "#757575",
          400: "#ededed",
        },
      },
    },
  },
  plugins: [],
};
