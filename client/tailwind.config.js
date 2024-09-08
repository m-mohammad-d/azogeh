/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1653px',
      },
      colors: {
        "primary-100": "#D9B8C1",
        "primary-200": "#C18898",
        "primary-300": "#A7586F",
        "primary-400": "#8F2946",
        "primary-500": "#821131",
        "primary-600": "#750F2C",
        "primary-700": "#5B0C22",
        "primary-800": "#410919",
        "primary-900": "#27050F",
        "gray-100": "#E8E7E7",
        "gray-200": "#A3A0A1",
        "gray-300": "#5E595B",
        "gray-400": "#191214",
        "warning-100": "#FFFBF2",
        "warning-200": "#FFF1CC",
        "warning-300": "#FFE7A5",
        "warning-400": "#FFDC7F",
        "error-100": "#FDEAEA",
        "error-200": "#F5A9A9",
        "error-300": "#EE6969",
        "error-400": "#E72929",
        "Success-100": "#ECF7F0",
        "Success-200": "#B3DFC5",
        "Success-300": "#7AC899",
        "Success-400": "#41B06E",
      },
    },
  },
  plugins: [],
};
