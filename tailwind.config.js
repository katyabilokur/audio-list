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
          25: "#fbfefd",
          50: "#f1faf9",
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
        button: {
          yl: "",
          yd: "",
          gl: "#12fa63",
          gd: "#03e452",
          rl: "",
          rd: "",
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
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "beat-one": "beat 1.5s ease-out infinite",
        "beat-two": "beat 1.5s ease-out .4s infinite",
        "gradient-bg": "gradient 15s ease infinite",
        scanline: "shimmer 1.2s ease-in-out 1s forwards",
      },
    },
  },
  plugins: [],
};
