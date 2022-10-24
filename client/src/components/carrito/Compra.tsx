import { useAppDispatch } from "../../app/hooks";
import { comprar } from "../slices/productSlice";
import CardCart from "./CardCart";
const Compra = () => {
  let products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  console.log(products);
  const cantidadTotal = products.reduce(
    (acc: number, prod: { cantidad: number }) => {
      return acc + prod.cantidad;
    },
    0
  );
  const dispatch = useAppDispatch();
  const precioTotal = products.reduce((acc: number, prod: any) => {
    return acc + prod.productos.price * prod.cantidad;
  }, 0);
  const compra: any = {
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: precioTotal,
        },
      },
    ],
    products: products,
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(comprar(compra));
  };

  return (
    <div className="bg-white bg-carrito-banner bg-no-repeat pt-[15rem]">
      <div className="flex flex-col items-center pb-[4rem] bg-white/50 rounded-xl mx-12">
        <div className="font-semibold text-2xl pt-2 pb-6">Tu Carrito</div>
        <div className="content-none w-1/4 border-b border-black"></div>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] ">
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
              />
            ))}
        </div>

        <div className="border border-black mx-20 h-1/4 relative flex flex-row">
          <p>cantidad total: {cantidadTotal}</p>
          <p>precio total: {precioTotal}</p>
          <button onClick={(e) => handleClick(e)}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default Compra;
