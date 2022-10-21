import CardCart from "./CardCart";
import { useAppDispatch } from "../../app/hooks";
import { comprar } from "../slices/productSlice";
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
    <div>
      {products &&
        products.map((data: any) => (
          <div>
            <CardCart
              key={data.productos._id}
              _id={data.productos._id}
              name={data.productos.name}
              image={data.productos.image}
              price={data.productos.price}
              cantidad={data.cantidad}
            />
          </div>
        ))}
      <p>cantidad total: {cantidadTotal}</p>
      <p>precio total: {precioTotal}</p>

      <button onClick={(e) => handleClick(e)}>Comprar</button>
    </div>
  );
};

export default Compra;
