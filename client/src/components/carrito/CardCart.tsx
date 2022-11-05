import { FaTrash } from "react-icons/fa";
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
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
      <div className="grid lg:grid-cols-[.5fr_1fr_.2fr_.2fr_.2fr] lg:border-none border border-black rounded-lg grid-cols-[1fr_.5fr_.5fr_.5fr] mx-8  lg:my-0 my-6 items-center lg:font-normal font-semibold">
        <img
          className="h-32 lg:row-span-1 row-span-2 lg:ml-0 ml-2"
          src={producto.image}
          alt="product"
        />

        <Link
          className="lg:col-span-1 col-span-3"
          to={`/product/${producto._id}`}
        >
          {producto.name}
        </Link>
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
