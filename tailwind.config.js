/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      theme: {
        extend: {
          keyframes: {
            beat: {
              "0%": { opacity: 0.8, transform: "scale(1)" },
              "70%": { opacity: 0, transform: "scale(1.5)" },
              "100%": { opacity: 0 },
            },
          },
          animation: {
            beat_before: "beat 1.5s ease-out infinite",
            beat_after: "beat 1.5s ease-out .4s infinite",
          },
        },
      },
    },
  },
  plugins: [],
};
