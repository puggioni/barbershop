import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  addFavoriteProduct,
  products,
  deleteFavoriteProduct,
  addFavoritoLocal,
  deleteFavoritoLocal,
} from "../slices/productSlice";

const ProductCard = (producto: products) => {
  const added = (
    <AiTwotoneHeart title="Quitar de Favoritos" size={25} fill="#be0027" />
  );

  const notAdded = <AiOutlineHeart title="Agregar a Favoritos" size={25} />;

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
      className=" flex flex-col bg-white items-center max-w-3xl max-h-full    
        justify-items-center rounded-xl hover:outline hover:outline-1	hover:outline-gray-300  "
    >
      <img
        className=" object-cover bg-white rounded-xl h-full m-0"
        src={producto.image}
        alt="product"
      />

      <h3>{producto.name.toUpperCase()}</h3>

      <Link to={`/product/${producto._id}`} className="">
        DESCRIPCION
      </Link>

      <h2 className="font-medium text-2xl">${producto.price}</h2>

      <div className="grid grid-cols-2 w-full justify-items-center">
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
