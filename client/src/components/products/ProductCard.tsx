import { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addFavoriteProduct } from "../slices/productSlice";

interface prodCard {
  _id: string;
  name: string;
  image: string;
  price: number;
}

const ProductCard = (producto: prodCard) => {
  const [active, setBookMarkactive] = useState(false);

  const dispatch = useAppDispatch();
  function handleBookmark() {
    setBookMarkactive(!active);
    dispatch(addFavoriteProduct(producto));
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
        {active ? (
          <AiTwotoneHeart
            size={25}
            fill="#be0027"
            onClick={() => {
              handleBookmark();
            }}
          />
        ) : (
          <AiOutlineHeart
            size={25}
            onClick={() => {
              handleBookmark();
            }}
          />
        )}

        <AiOutlineShoppingCart
          size={25}
          onClick={(event) => {
            handleClick(event);
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
