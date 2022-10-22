/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        homenaje: ["Homenaje"],
        display: ["Quicksand"],
        body: ["Open Sans"],
      },
      gridTemplateColumns: {
        nav: ".2fr 1fr .2fr .1fr",
      },
    },

    backgroundImage: {
      home: "url('./imagenes/landing-bg-img.png')",
      body: "url('./imagenes/landing-bg-img.png')",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "100%": "100%",
      16: "4rem",
    },
  },
  plugins: [],
};
