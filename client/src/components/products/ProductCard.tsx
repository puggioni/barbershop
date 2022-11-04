import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  addFavoriteProduct,
  addFavoritoLocal,
  deleteFavoriteProduct,
  deleteFavoritoLocal,
  products,
} from "../slices/productSlice";

const ProductCard = (producto: products) => {
  const added = (
    <AiTwotoneHeart
      className="cursor-pointer"
      title="Quitar de Favoritos"
      size={25}
      fill="#be0027"
    />
  );

  const notAdded = (
    <AiOutlineHeart
      className="cursor-pointer"
      title="Agregar a Favoritos"
      size={25}
    />
  );

  const dispatch = useAppDispatch();
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

  const handleClick = (event: any) => {
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
  };

  return (
    <div
      className=" flex lg:flex-col bg-white items-center max-w-3xl lg:max-h-full  h-1/2   
        justify-items-center rounded-xl hover:outline hover:outline-1	hover:outline-gray-300 
        lg:border-none lg:my-0 lg:mx-0 border border-black my-6 mx-3 relative"
    >
      <img
        className=" object-cover bg-white rounded-xl lg:max-w-full max-w-[40%] m-0"
        src={producto.image}
        alt="product"
      />

      <h3 className="lg:max-h-full max-h-[5.5rem]">
        {producto.name.toUpperCase()}
      </h3>

      <Link
        to={`/product/${producto._id}`}
        className="lg:block hidden py-4 underline underline-offset-2"
      >
        DESCRIPCION
      </Link>

      <h2 className="lg:block font-medium text-2xl absolute right-[40%] bottom-0">
        ${producto.price}
      </h2>

      <div className="lg:grid grid-cols-2 lg:w-full lg:gap-0 lg:mr-0 lg:ml-0 justify-items-center flex flex-col ml-auto mr-4 gap-12">
        <div onClick={handleBookmark}>
          {producto.userFavorite ? added : notAdded}
        </div>
        <AiOutlineShoppingCart
          size={25}
          title="Store"
          onClick={(event) => {
            handleClick(event);
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductCard;
