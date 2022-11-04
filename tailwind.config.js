/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Poor Story", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
