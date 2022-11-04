/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
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
