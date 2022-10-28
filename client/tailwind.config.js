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
        Hubballi: ["Hubballi"],
        display: ["Quicksand"],
        body: ["Open Sans"],
      },
      gridTemplateColumns: {
        nav: ".2fr 1fr .2fr .1fr",
      },
      gridAutoColumns: {
        categorias: "minmax(0,8)",
      },
      backgroundImage: {
        "store-banner": "url('/src/imagenes/Store-banner.png')",
        "carrito-banner": "url('/src/imagenes/carrito banner.png')",
        "admin-banner": "url('/src/imagenes/bannerAdmin.png')",
        "bg-prods": "url('/src/imagenes/crear-modificar-producto.png')",
      },
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
