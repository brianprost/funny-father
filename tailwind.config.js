/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  daisyui: {
    themes: [
      {
        dj: {
          primary: "#b29e84",
          secondary: "#7c898b",
          accent: "#423e3a",
          neutral: "#253439",
          "base-100": "#f6f4f1",
          info: "#7c898b",
          success: "#253932",
          warning: "#eab308",
          error: "#7c2d12",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Poor Story", "cursive"],
        sans: ["Hammersmith One", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
