import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import logo from "../../imagenes/Logo.png";
import { yaLog } from "../slices/logIn";
import CardCart from "./CardCart";

const Compra = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "[]");
  const products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  const cantidadTotal = products.reduce(
    (acc: number, prod: { cantidad: number }) => {
      return acc + prod.cantidad;
    },
    0
  );
  const precioTotal = products.reduce((acc: number, prod: any) => {
    return Number((acc + prod.productos.price * prod.cantidad).toFixed(2));
  }, 0);

  useEffect(() => {
    dispatch(yaLog(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //======================================render============================
  return (
    <div className="bg-white lg:bg-carrito-banner bg-no-repeat lg:pt-[17%] bg-contain lg:h-[102%]">
      <img
        className="lg:hidden m-auto h-[10%] mt-16 mb-6"
        src={logo}
        alt="logo"
      />

      <div className="flex flex-col items-center lg:pb-16 pb-2 bg-white rounded-xl mx-12">
        <div className="font-semibold text-2xl pt-2 pb-6">Tu Carrito</div>
        <div className="content-none lg:w-1/4 w-3/4 border-b border-black"></div>
      </div>

      <div className="lg:grid grid-cols-[1.5fr_1fr] ">
        <div className="mt-4">
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

        <div className="lg:border lg:h-60 lg:border-black lg:mx-20 lg:grid lg:grid-cols-2 lg:p-8 lg:gap-8 lg:mt-8 hidden ">
          <p className="lg:justify-self-center lg:font-semibold lg:mt-8">
            {cantidadTotal} articulos
          </p>
          <p className="lg:justify-self-center lg:font-semibold lg:mt-8">
            $ {precioTotal}
          </p>
          <button
            className="lg:col-span-2 lg:block bg-[#855C20] lg:text-white lg:font-semibold "
            onClick={() => navigate("/products/checkout")}
          >
            COMPRAR
          </button>
        </div>
        <button
          className="  bg-[#855C20] my-8 text-white w-1/4 font-semibold mt-16 mx-8 px-4 py-2 lg:block hidden"
          onClick={() => navigate("/product")}
        >
          Seguí comprando
        </button>
      </div>
      <div className="lg:hidden grid grid-cols-2 items-end m-4 mt-16 ">
        <p className="font-semibold">Total: ${precioTotal}</p>
        <button
          className="py-4 px-6 bg-[#855C20] text-white font-semibold"
          onClick={() => navigate("/products/checkout")}
        >
          TERMINAR PEDIDO
        </button>
      </div>
    </div>
  );
};

export default Compra;
