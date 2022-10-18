import { Link } from "react-router-dom";
import { BsFillBookmarkFill, BsBookmarkHeart } from "react-icons/bs";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addFavoriteProduct, products } from "./products/productSlice";

const ProductCard = (producto: products) => {
  const added = (
    <BsFillBookmarkFill
      onClick={() => {
        handleBookmark();
      }}
      className="absolute top-5 right-5 w-6 h-6 pointer-events-auto fill-amber-200"
    />
  );

  const notAdded = (
    <BsBookmarkHeart className="absolute top-5 right-5 w-6 h-6 pointer-events-auto hover:fill-amber-200" />
  );

  const [activated, setBookMarkactive] = useState(false);

  const dispatch = useAppDispatch();
  function handleBookmark() {
    const active = activated === true ? false : true;
    setBookMarkactive(active);
    dispatch(addFavoriteProduct(producto));
  }

  if (producto) {
    return (
      <div
        className=" flex bg-slate-200/50 m-4 rounded-lg max-w-3xl lg:max-h-full lg:m-0 max-h-40 relative 
      lg:grid lg:grid-row-2  lg:justify-items-center lg:gap-8 lg:pl-4"
      >
        <div className=" h-full w-2/5 lg:w-[90%] lg:h-72 lg:mt-4 mr-4 rounded-lg object-center relative">
          <div
            onClick={() => {
              handleBookmark();
            }}
          >
            {activated ? added : notAdded}
          </div>
          <img
            className="h-32 m-4 object-cover bg-white rounded-xl lg:h-full lg:m-0"
            src={producto.image}
            alt="product"
          />
        </div>
        <div className="p-4 flex flex-col justify-between font-display text-lg text-[#000300] ">
          <h3>{producto.name}</h3>
          <h2 className="font-medium text-2xl">${producto.price}</h2>
          <div className="lg:absolute lg:left-1 lg:bottom-1">
            {producto.rating}
          </div>
        </div>
        <Link to={`/product/${producto._id}`}>
          <button className="text-blue absolute right-0 bottom-0 m-4">
            Ver más
          </button>
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ProductCard;
