import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { comprar } from "../slices/purchaseOrder";
import CardCart from "./CardCart";
import useHeaders from "../../app/header";
import { yaLog } from "../slices/logIn";

const Compra = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();
  let products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  const cantidadTotal = products.reduce(
    (acc: number, prod: { cantidad: number }) => {
      return acc + prod.cantidad;
    },
    0
  );
  const dispatch = useAppDispatch();
  const precioTotal = products.reduce((acc: number, prod: any) => {
    return Number((acc + prod.productos.price * prod.cantidad).toFixed(2));
  }, 0);
  const user: any = JSON.parse(window.localStorage.getItem("user") || "[]");

  useEffect(() => {
    dispatch(yaLog(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white bg-carrito-banner bg-no-repeat pt-[17%] bg-contain h-[102%]">
      <div className="flex flex-col items-center pb-[4rem] bg-white/50 rounded-xl mx-12">
        <div className="font-semibold text-2xl pt-2 pb-6">Tu Carrito</div>
        <div className="content-none w-1/4 border-b border-black"></div>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr]  ">
        <div className="">
          {products &&
            products.map((data: any) => (
              <CardCart
                key={data.productos._id}
                _id={data.productos._id}
                name={data.productos.name}
                image={data.productos.image}
                price={data.productos.price}
                cantidad={data.cantidad}
                forceUpdate={forceUpdate}
              />
            ))}
        </div>

        <div className="border h-60 border-black mx-20 grid grid-cols-2 p-8 gap-8 mt-48 ">
          <p className="justify-self-center font-semibold mt-8">
            {cantidadTotal} articulos
          </p>
          <p className="justify-self-center font-semibold mt-8">
            $ {precioTotal}
          </p>
          <button
            className="col-span-2 block bg-[#855C20] text-white font-semibold "
            onClick={() => navigate("/products/checkout")}
          >
            COMPRAR
          </button>
        </div>
        <button
          className="  bg-[#855C20] my-8 text-white w-1/4 font-semibold mt-16 mx-8 px-4 py-2"
          onClick={() => navigate("/product")}
        >
          Seguí comprando
        </button>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Compra;
