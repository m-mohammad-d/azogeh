/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sm: "0 2px 2px rgba(0, 0, 0, 0.25)", // shadow-sm
        md: "0 4px 4px rgba(0, 0, 0, 0.25)", // shadow-md
        lg: "0 6px 6px rgba(0, 0, 0, 0.25)", // shadow-lg
        xl: "0 8px 8px rgba(0, 0, 0, 0.25)", // shadow-xl
        "2xl": "0 12px 12px rgba(0, 0, 0, 0.25)", // shadow-2xl
        "3xl": "0 16px 16px rgba(0, 0, 0, 0.25)", // shadow-2xl
      },
      borderRadius: {
        sm: "4px", // rounded-sm
        md: "8px", // rounded-md
        lg: "16px", // rounded-lg
        xl: "24px", // rounded-xl
        "2xl": "32px", // rounded-2xl
        "3xl": "64px", // rounded-2xl
      },
      colors: {
        primary: {
          tint1: '#FFECF0',
          tint2: '#FFC2CF',
          tint3: '#FF98AD',
          tint4: '#FF6E8C',
          tint5: '#F44166',
          DEFAULT: '#D22C4E', // primary
          shade1: '#B01B39',
          shade2: '#8E0D28',
          shade3: '#6C0419',
          shade4: '#4A000F',
        },

        neutral: {
          white: '#FFFFFF',
          'gray-1': '#F9F9F9',
          'gray-2': '#EDEDED',
          'gray-3': '#CBCBCB',
          'gray-4': '#C2B8B8',
          'gray-5': '#ADADAD',
          'gray-6': '#757575',
          'gray-7': '#717171',
          'gray-8': '#070707',
        },

        status: {
          error: {
            DEFAULT: '#C30000', 
            light: '#ED2E2E',   
            extralight: '#FFF2F2', 
          },
          success: {
            DEFAULT: '#00966D', 
            light: '#00BA88',   
            extralight: '#F3FDFA', 
          },
          warning: {
            DEFAULT: '#A9791C', 
            light: '#F4B740',  
            extralight: '#FFF8E1', 
          },
        },
      },
    },
  },
  plugins: [],
};
