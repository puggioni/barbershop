import React from "react";
// imagen
// nombre
// precio
// rating
type Props = {
  nombre: string;
  precio: number;
  rating: any;
  imagen?: string;
};
const ProductCard = ({ nombre, precio, rating, imagen }: Props) => {
  return (
    <div>
      <img src={imagen} alt="product" />
      <h3>{nombre}</h3>
      <h2>{precio}</h2>
      <div>{rating}</div>
      <button>Ver más</button>
    </div>
  );
};

export default ProductCard;
