import { FaTrash } from "react-icons/fa";
import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getCantCarrito } from "../slices/purchaseOrder";

const ProductCard = (producto: any) => {
  let cantidad: number = producto.cantidad;
  const dispatch = useAppDispatch();
  const prodLocalStorage: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  const updateLocal = (updated: any) => {
    window.localStorage.setItem("product", JSON.stringify(updated));
  };

  //================================handlers=================================
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
    dispatch(getCantCarrito());
  };

  const handleCantidadChange = (event: any, cantidad: number) => {
    const index = prodLocalStorage.findIndex((p: any) => {
      return p.productos._id === producto._id;
    });
    prodLocalStorage[index] = { productos: producto, cantidad };
    updateLocal(prodLocalStorage);
    producto.forceUpdate();
  };

  //==========================render=====================================
  if (producto) {
    return (
      <div className="grid lg:grid-cols-[.5fr_1fr_.2fr_.2fr_.2fr] grid-cols-[1fr_2fr_.5fr] lg:mx-8 m-4 items-center  border border-black rounded-lg lg:border">
        <img className="h-28 ml-1" src={producto.image} alt="product" />

        <Link className=" lg:col-span-1" to={`/product/${producto._id}`}>
          {producto.name}
        </Link>
        <h2>${producto.price}</h2>
        <div className="relative border border-black py-1 pr-2 lg:mr-4 items-center text-center ml-4 mb-1">
          <div>{producto.cantidad}</div>
          <HiOutlineArrowDown
            onClick={(e) => {
              cantidad = cantidad - 1;
              handleCantidadChange(e, cantidad);
            }}
            size={10}
            className="absolute bottom-0 right-0 cursor-pointer mb-1"
          />
          <HiOutlineArrowUp
            onClick={(e) => {
              cantidad = cantidad + 1;
              handleCantidadChange(e, cantidad);
            }}
            size={10}
            className="absolute top-0 right-0 cursor-pointer mt-1"
          />
        </div>

        <FaTrash
          className="cursor-pointer mx-auto"
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
