import CardCart from "./CardCart";
const Compra = () => {
  let products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );

  const cantidadTotal = products.reduce((acc: any, prod: any) => {
    return acc + prod.cantidad;
  }, 0);

  const precioTotal = products.reduce((acc: any, prod: any) => {
    return acc + prod.productos.price * prod.cantidad;
  }, 0);

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
    </div>
  );
};

export default Compra;
