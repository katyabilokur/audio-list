/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        160: "40rem",
      },
      keyframes: {
        beat: {
          "0%": { opacity: 0.6, transform: "scale(1)" },
          "70%": { opacity: 0, transform: "scale(1.5)" },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "beat-one": "beat 1.5s ease-out infinite",
        "beat-two": "beat 1.5s ease-out .4s infinite",
      },
    },
  },
  plugins: [],
};
