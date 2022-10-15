import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { getProductDetail, clearProducDetail } from "./ptoductdetailSlice";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

type QuizParams = {
  id: string;
};

export default function ProductDetail() {
  const dispatch =useDispatch();
  const {id}=useParams<QuizParams>();
  const {name,precio,rating,imagen,description} =useSelector((state: RootState)=>state.producdetail);
  let navigate = useNavigate();
  const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black";

    useEffect(()=>{
      if(typeof id==="string"){
        dispatch(getProductDetail(id))
      }
    },[dispatch, id]);
    useEffect(()=>{
      return()=>{
        dispatch(clearProducDetail())
      };
    },[dispatch])

    function goBack() :void{
        navigate(-1);
    }

  return <div className="bg-slate-100">
    <h1 className=" mr-auto" onClick={goBack}>⬅ Go back</h1>
    <div className="flex justify-center">
    <img className=" w-5/6  rounded-xl" src={imagen} alt="" />
    </div>
    <h1 className=" text-center font-bold p-5">{name}</h1>
    <div className="flex justify-end ">
    <h2 className=" font-bold justify-end px-5 text-lg" >${precio}</h2>
    </div>
    <form action="" className="ml-10 mb-5 justify-center">
    <label htmlFor="">Cantidad: </label>
    <input type="number" className="flex justify-center rounded-lg border-2 border-black text-black mb-5"/>
    <button className={buttonStyle}>Agregar al Carrito</button>
    </form>    
    <div>
    <label htmlFor="" className=" font-bold ml-3">Descripción: </label>
    <p className="ml-3">{description}</p>
    </div>
    <label htmlFor="" className=" p-5">Rating: {rating}  ✩</label>
    </div>;
}
