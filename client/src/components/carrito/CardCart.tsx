import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = (producto: any) => {
  const handleClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    let productos: any = JSON.parse(
      window.localStorage.getItem("product") || "[]"
    );

    const prod = productos.filter((p: any) => {
      return p.productos._id !== id;
    });
    window.localStorage.setItem("product", JSON.stringify(prod));
    window.location.reload();
  };

  if (producto) {
    return (
      <div className="grid grid-cols-[.5fr_1fr_.2fr_.2fr_.2fr] mx-8 items-center">
        <img className="h-32 " src={producto.image} alt="product" />

        <Link to={`/product/${producto._id}`}>{producto.name}</Link>
        <h2 className="">${producto.price}</h2>
        <div className="">{producto.cantidad}</div>

        <FaTrash
          onClick={(e) => {
            handleClick(e, producto._id);
          }}
          size={25}
        />
      </div>
    );
  } else {
    return <div>Sin Productos</div>;
  }
};

export default ProductCard;
