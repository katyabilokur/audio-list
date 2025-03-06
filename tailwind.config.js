/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //TODO: #6ed6bc  add green
        //NOTE: for text use Tailwind 'zinc' colour
        primary_tur: {
          100: "#dbf2f2",
          200: "#bce4e5",
          300: "#7DC8CC", //main
          400: "#58b1b8",
          500: "#3c959e",
          600: "#357b85",
          700: "#30646e",
        },
        primary_purple: {
          100: "#f1edfa",
          200: "#e6ddf7",
          300: "#d2c2f0",
          400: "#BDA0E7", //main
          500: "#a577db",
          600: "#9659ce",
          700: "#7c3eb2",
          800: "#693792",
        },
        primary_blue: {
          100: "#e3e9f6",
          200: "#cddaf0",
          300: "#aac0e6",
          400: "#82A1D9", //main
          500: "#6382ce",
          600: "#5069c0",
        },
        primary_rose: {
          100: "#fae7e6",
          200: "#f7d3d1",
          300: "#f2b9b6", //main
          400: "#e78782",
          500: "#d9605a",
          600: "#c5443d",
        },
        primary_red: {
          50: "#fff4ee", //main light
          100: "#ffe4d5",
          200: "#fec6aa",
          300: "#fd9e74",
          400: "#fb6b3c",
          500: "#f94516",
          600: "#ea2b0c",
        },
        //TODO: change temperature
        primary: {
          50: "#E1E8EF",
          100: "#D4DEE7",
          200: "#B7C7D7",
          300: "#99B0C7",
          400: "#7C99B6",
          500: "#5E82A6",
          600: "#4C6B8A",
          700: "#3C546C",
          800: "#2C3D4F",
          900: "#1B2631",
          950: "#141C24",
        },
        accent: {
          //TODO: remove
          50: "#FAF5F0",
          100: "#F4ECE1",
          200: "#E8D6BF",
          300: "#DDC2A2",
          400: "#D2AF84",
          500: "#C69963",
          600: "#B78343",
          700: "#926835",
          800: "#6C4D28",
          900: "#4B351B",
          950: "#382814",
        },
      },
      spacing: {
        160: "40rem",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      keyframes: {
        beat: {
          "0%": { opacity: 0.6, transform: "scale(1)" },
          "70%": { opacity: 0, transform: "scale(1.5)" },
          "100%": { opacity: 0 },
        },
        gradient: {
          "0%": { "background-position": "0% 20%" },
          "25%": { "background-position": "100% 50%" },
          "50%": { "background-position": "50% 70%" },
          "100%": { "background-position": "0% 20%" },
        },
      },
      animation: {
        "beat-one": "beat 1.5s ease-out infinite",
        "beat-two": "beat 1.5s ease-out .4s infinite",
        "gradient-bg": "gradient 15s ease infinite",
      },
    },
  },
  plugins: [],
};
