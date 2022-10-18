/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
    fontFamily: {
      'display': ['Quicksand'],
      'body': ['Open Sans'],
    }
  },
  plugins: [],
};
