import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
      <div
        className=" flex bg-slate-200/50 m-4 rounded-lg max-w-3xl lg:max-h-full lg:m-0 max-h-40 relative 
      lg:grid lg:grid-row-2  lg:justify-items-center lg:gap-8 lg:pl-4 shadow-xl "
      >
        <div className=" h-full w-2/5 lg:w-[90%] lg:h-72 lg:mt-4 mr-4 rounded-lg object-center relative">
          <img
            className="h-32 m-4 object-cover bg-white rounded-xl lg:h-full lg:m-0"
            src={producto.image}
            alt="product"
          />
        </div>
        <div className="p-4 flex flex-col justify-between font-display text-lg text-[#000300] ">
          <Link to={`/product/${producto._id}`}>
            <h3>{producto.name}</h3>
          </Link>
          <h2 className="font-medium text-2xl">${producto.price}</h2>
          <div className="lg:absolute lg:left-1 lg:bottom-1">
            {producto.cantidad}
          </div>
        </div>
        <FaTrash
          onClick={(e) => {
            handleClick(e, producto._id);
          }}
          size={30}
        />
      </div>
    );
  } else {
    return <div>Sin Productos</div>;
  }
};

export default ProductCard;
