import React from "react";

type Props = {
  nombre: string;
  precio: number;
  rating: any;
  imagen?: string;
};
const ProductCard = ({ nombre, precio, rating, imagen }: Props) => {
  return (
    <div className="text-white flex bg-slate-200/50 m-4 rounded-lg max-w-3xl relative">
      <div className="rounded-lg object-center">
        <img
          className="h-40 w-40 m-4 object-cover rounded-xl overflow-hidden"
          src={imagen}
          alt="product"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <h3>{nombre}</h3>
        <h2>{precio}</h2>
        <div>{rating}</div>
      </div>
      <button className="absolute right-0 bottom-0 m-4">Ver más</button>
    </div>
  );
};

export default ProductCard;
