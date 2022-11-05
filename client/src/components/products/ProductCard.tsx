import { useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsCartPlus, BsCartXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  addFavoriteProduct,
  addFavoritoLocal,
  deleteFavoriteProduct,
  deleteFavoritoLocal,
  products,
} from "../slices/productSlice";
import { getCantCarrito } from "../slices/purchaseOrder";

const ProductCard = (producto: products) => {
  const dispatch = useAppDispatch();
  const [agregado, setAgregado] = useState(false);
  const products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  const prodFound = products.find((prod: { productos: any; _id: string }) => {
    return prod.productos._id === producto._id;
  });

  useEffect(() => {
    if (prodFound) {
      setAgregado(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodFound]);
  //====================================handlers====================================
  function handleBookmark(e: any) {
    e.preventDefault();
    const aux = window.localStorage.getItem("user");
    const aux2 = window.localStorage.getItem("token");
    if (aux && aux2) {
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      if (!producto.userFavorite) {
        dispatch(addFavoriteProduct(producto._id, user._id, token));
      } else {
        dispatch(deleteFavoriteProduct(producto._id, user._id, token));
      }
    } else {
      !producto.userFavorite
        ? dispatch(addFavoritoLocal(producto))
        : dispatch(deleteFavoritoLocal(producto._id));
    }
  }

  const handleAgregarCarrito = (event: any) => {
    event.preventDefault();
    let productos: any = JSON.parse(
      window.localStorage.getItem("product") || "[]"
    );
    const prod = productos.findIndex(
      (prod: { productos: any; _id: string | undefined }) =>
        prod.productos._id === producto._id
    );
    if (prod === -1) {
      productos.push({ productos: producto, cantidad: 1 });
      window.localStorage.setItem("product", JSON.stringify(productos));
    }
    dispatch(getCantCarrito());
    setAgregado(true);
  };

  const handleDelete = (id: string) => {
    const prod = products.filter((p: any) => {
      return p.productos._id !== id;
    });
    window.localStorage.setItem("product", JSON.stringify(prod));
    setAgregado(false);
    dispatch(getCantCarrito());
  };

  //===============================render==========================================
  return (
    <div
      className=" flex lg:flex-col bg-white items-center max-w-3xl lg:h-full  h-1/2   
        justify-items-center rounded-xl hover:outline hover:outline-1	hover:outline-gray-300 
        lg:border-none lg:my-0 lg:mx-0 border border-black my-6 mx-3 relative"
    >
      <img
        className=" object-cover bg-white rounded-xl lg:max-w-full max-w-[40%] m-0"
        src={producto.image}
        alt="product"
      />
      <Link to={`/product/${producto._id}`} className=" py-4   underline-none">
        <h3 className=" max-h-[5.5rem] underline-none">
          {producto.name.toUpperCase()}
        </h3>
      </Link>

      {/*  <Link
        to={`/product/${producto._id}`}
        className="lg:block hidden py-4 underline underline-offset-2"
      >
        DESCRIPCION
      </Link> */}

      <h2 className="lg:block font-medium text-2xl absolute right-[40%] bottom-0">
        ${producto.price}
      </h2>

      <div className="lg:grid grid-cols-2 lg:w-full lg:gap-0 lg:mr-0 lg:ml-0 justify-items-center flex flex-col ml-auto mr-4 gap-12">
        <div onClick={handleBookmark}>
          {producto.userFavorite ? (
            <AiTwotoneHeart
              className="cursor-pointer"
              title="Quitar de Favoritos"
              size={25}
              fill="#be0027"
            />
          ) : (
            <AiOutlineHeart
              className="cursor-pointer"
              title="Agregar a Favoritos"
              size={25}
            />
          )}
        </div>
        {!agregado ? (
          <BsCartPlus
            size={25}
            title="Agregar a carrito"
            onClick={(event) => {
              handleAgregarCarrito(event);
            }}
            className="cursor-pointer"
          />
        ) : (
          <BsCartXFill
            size={25}
            fill={"#855C20"}
            title="borrar de carrito"
            onClick={() => {
              handleDelete(producto._id);
            }}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
