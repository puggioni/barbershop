import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { clearProducDetail,getProduct } from "./ptoductdetailSlice";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";

type QuizParams = {
  idProduct: string;
};
 
export default function ProductDetail() {
  const dispatch =useAppDispatch();
  const {idProduct}=useParams<QuizParams>();
  const {product}=useAppSelector((state: RootState)=>state.producdetail);
  let navigate = useNavigate();
  const buttonStyle =
    "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black";

  const inicializar = useCallback(async () => {
    if(idProduct)
    dispatch(getProduct(idProduct));
  }, [dispatch]);

    useEffect(()=>{
      inicializar()
    },[inicializar]);



    useEffect(()=>{
      return()=>{
        dispatch(clearProducDetail())
      };
    },[])

    function goBack() :void{
        navigate(-1);
    }
  

  useEffect(() => {
    return () => {
      dispatch(clearProducDetail());
    };
  }, [dispatch]);

  return( 
   
  <div className="bg-slate-100">
    <VscArrowLeft className=" mr-auto" onClick={goBack}/>
    { product ?<>
    <div className="flex justify-center">
    <img className=" w-5/6  rounded-xl" src={product.image} alt="" />
    </div>
    <h1 className=" text-center font-bold p-5">{product.name}</h1>
    <div className="flex justify-end ">
    <h2 className=" font-bold justify-end px-5 text-lg" >${product.price}</h2>
    </div>
    <form action="" className="ml-10 mb-5 justify-center">
    <label htmlFor="">Cantidad: </label>
    <input type="number" className="flex justify-center rounded-lg border-2 border-black text-black mb-5"/>
    <button className={buttonStyle}>Agregar al Carrito</button>
    </form>    
    <div>
    <label htmlFor="" className=" font-bold ml-3">Descripción: </label>
    <p className="ml-3">{product.description}</p>
    </div>
    <label htmlFor="" className=" p-5">Stock: {product.stock} Unidades</label>
    </>
    :<h1>El producto requerido no existe o no esta activo🤔</h1>}</div>);
}
