import { FaTrash } from "react-icons/fa";
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ProductCard = (producto: any) => {
  let cantidad: number = producto.cantidad;
  const prodLocalStorage: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  const handleDelete = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    const prod = prodLocalStorage.filter((p: any) => {
      return p.productos._id !== id;
    });
    window.localStorage.setItem("product", JSON.stringify(prod));
    producto.forceUpdate();
  };
  const handleCantidadChange = (event: any, cantidad: number) => {
    event.preventDefault();
    const index = prodLocalStorage.findIndex((p: any) => {
      return p.productos._id === producto._id;
    });
    debugger;
    prodLocalStorage[index] = { productos: producto, cantidad };

    updateLocal(prodLocalStorage);
    producto.forceUpdate();
  };

  const updateLocal = (updated: any) => {
    window.localStorage.setItem("product", JSON.stringify(updated));
  };

  if (producto) {
    return (
      <div className="grid grid-cols-[.5fr_1fr_.2fr_.2fr_.2fr] mx-8 items-center">
        <img className="h-32 " src={producto.image} alt="product" />

        <Link to={`/product/${producto._id}`}>{producto.name}</Link>
        <h2>${producto.price}</h2>
        <div className="relative border border-black py-1 pr-2 mr-4 items-center text-center">
          <div>{producto.cantidad}</div>
          <HiOutlineArrowLongDown
            onClick={(e) => {
              cantidad = cantidad - 1;
              handleCantidadChange(e, cantidad);
            }}
            size={10}
            className="absolute bottom-0 right-0 cursor-pointer mb-1"
          />
          <HiOutlineArrowLongUp
            onClick={(e) => {
              cantidad = cantidad + 1;
              handleCantidadChange(e, cantidad);
            }}
            size={10}
            className="absolute top-0 right-0 cursor-pointer mt-1"
          />
        </div>

        <FaTrash
          onClick={(e) => {
            handleDelete(e, producto._id);
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
