import { useCallback, useEffect, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { clearProducDetail, productDetail } from "../slices/productSlice";
import ReviewsProduct from "./ReviewsProduct"

type QuizParams = {
  idProduct: string;
};

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const { idProduct } = useParams<QuizParams>();
  const { product } = useAppSelector((state: RootState) => state.products);
  let navigate = useNavigate();
  const buttonStyle =
    "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black";

  const inicializar = useCallback(async () => {
    if (idProduct) {
      dispatch(productDetail(idProduct));
    }
  }, [dispatch, idProduct]);

  const [cantidad, setCantidad] = useState(0);
 
  useEffect(() => {
    inicializar();
    return () => {
      dispatch(clearProducDetail());
    };
  }, [dispatch, inicializar]);

  function goBack(): void {
    navigate(-1);
  }
  const paraCarrito = {
    available: product?.available,
    image: product?.image,
    name: product?.name,
    price: product?.price,
    rating: product?.rating,
    _id: product?._id,
  };
  const handleClick = (event: any) => {
    event.preventDefault();
    let productos: any = JSON.parse(
      window.localStorage.getItem("product") || "[]"
    );
    const prod = productos.findIndex(
      (prod: { productos: any; _id: string | undefined }) =>
        prod.productos._id === paraCarrito._id
    );

    if (prod !== -1) {
      productos[prod].cantidad = cantidad;
      window.localStorage.setItem("product", JSON.stringify(productos));
    } else {
      productos.push({ productos: paraCarrito, cantidad: cantidad });
      window.localStorage.setItem("product", JSON.stringify(productos));
    }
  };

  const handleChange = (event: any) => {
    setCantidad(parseInt(event.target.value));
  };

  return (

<div className=" bg-slate-200/50 ">
      <div className=" flex  flex-col md:flex-row">
        <VscArrowLeft
          className=" ml-4 mt-3 h-12 w-12 fill-black"
          onClick={goBack}
        />

        {product ? (
          <>
            <div className=" w-5/6 flex self-center">
              <div className="flex justify-center min">
                <img
                  className=" w-9/10 rounded-3xl p-5 "
                  src={product.image}
                  alt=""
                />
              </div>
            </div>
            <div className="w-5/6 flex-col self-center">
              <h1 className=" text-center font-bold p-5 text-2xl">
                {product.name}
              </h1>
              <div className="justify-end ">
                <h2 className=" font-bold justify-end px-5 text-2xl">
                  ${product.price}
                </h2>
              </div>
              <form action="" className="ml-10 mb-5 justify-center">
                <label htmlFor="">Cantidad: </label>
                <input
                  type="number"
                  className="flex justify-center rounded-lg border-2 border-black text-black mb-5"
                  name="cantidad"
                  value={cantidad}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <button
                  onClick={(event) => {
                    handleClick(event);
                  }}
                  className={buttonStyle}
                >
                  Agregar al Carrito
                </button>
              </form>
              <div>
                <label htmlFor="" className=" font-bold ml-3">
                  Descripción:{" "}
                </label>
                <p className="ml-3 text-justify self-center p-4">
                  {product.description}
                </p>
              </div>
              <label htmlFor="" className=" p-5">
                Stock: {product.stock} Unidades
              </label>
            </div>
          
          
        </>
      ) : (
        <h1>El producto requerido no existe o no esta activo🤔</h1>
      )}
     
    </div>
    <div className=" bg-slate-200/50">
    <div className="flex flex-col ml-4 md:ml-16">
        {product?<ReviewsProduct reviews={product.reviews} idProduct={idProduct}></ReviewsProduct>
        :<>Agrega un review al producto</>
        }
      </div>
      </div>
    </div>
    

  );
}
