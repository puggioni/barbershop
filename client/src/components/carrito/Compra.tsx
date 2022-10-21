import CardCart from "./CardCart";
import { useAppDispatch } from "../../app/hooks";
const Compra = () => {
  let products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  console.log(products);
  const cantidadTotal = products.reduce((acc: any, prod: any) => {
    return acc + prod.cantidad;
  }, 0);

  const precioTotal = products.reduce((acc: any, prod: any) => {
    return acc + prod.productos.price * prod.cantidad;
  }, 0);
  const obj: any = {
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
  const handleClick = () => {};

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

      <button>Comprar</button>
    </div>
  );
};

export default Compra;
