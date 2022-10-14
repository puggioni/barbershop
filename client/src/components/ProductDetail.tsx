import { produceWithPatches } from "immer";
import React,{useEffect} from "react";


type Props = {
    nombre: string;
    precio: number;
    rating: any;
    imagen?: string;
    description: string
  };

export default function ProductDetail({nombre,precio,rating,imagen,description}:Props) {
    useEffect(()=>{
        
    });
  return <div>
    <img src={imagen} alt="" />
    <h1>{nombre}</h1>
    <h2>${precio}</h2>
    <form action="">
    <label htmlFor="">Cantidad: </label>
    <input type="cantidad" />
    <button>Agregar al Carrito</button>
    </form>
    <label htmlFor="">Rating: {rating}</label>
    <label htmlFor="">Descripción</label>
    <p>{description}</p>
    </div>;
}