import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { getProductDetail } from "./ptoductdetailSlice";
import { useParams } from "react-router";

type QuizParams = {
  id: string;
};

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams<QuizParams>();
  const { name, precio, rating, imagen, description } = useSelector(
    (state: RootState) => state.producdetail
  );
  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);
  return (
    <div className="bg-slate-200/50">
      <img src={imagen} alt="" />
      <h1>{name}</h1>
      <h2>${precio}</h2>
      <form action="">
        <label htmlFor="">Cantidad: </label>
        <input type="cantidad" />
        <button>Agregar al Carrito</button>
      </form>
      <label htmlFor="">Rating: {rating}</label>
      <label htmlFor="">Descripción</label>
      <p>{description}</p>
    </div>
  );
}
