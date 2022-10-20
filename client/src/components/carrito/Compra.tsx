import ProductCard from "../products/ProductCard";

const Compra = () => {
  const products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );

  const total = products.reduce((acc: number, product: any) => {
    return acc + product.price * products.cantidad;
  });

  console.log(products, products.cantidad, total);
  return (
    <div>
      {products?.products.map((data: any) => (
        <ProductCard
          key={data._id}
          _id={data._id}
          name={data.name}
          image={data.image}
          price={data.price}
          rating={data.rating}
          available={data.available}
        />
      ))}
      <p>{products.cantidad}</p>
    </div>
  );
};

export default Compra;
