import { useCallback, useEffect } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Categorias from "../Categorias";
import ProductCard from "../ProductCard";
import { fetchAllProducts } from "./productSlice";

interface prodCard {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  available: boolean;
}

const Products = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const inicializar = useCallback(async () => {
    dispatch(fetchAllProducts(""));
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.products);

  const goBack = () => {
    navigate(-1);
  };

  if (data?.allProducts instanceof Array) {
    return (
      <>
        <VscArrowLeft
          onClick={() => goBack()}
          className="ml-4 mt-3 h-6 w-6 fill-white"
        />
        <div>
          <Categorias />
        </div>
        <div className="lg:grid lg:grid-cols-4 lg:mx-24 lg:gap-8">
          {data?.allProducts.map((data: prodCard) => (
            <ProductCard
              key={data._id}
              _id={data._id}
              name={data.name}
              image={data.image}
              price={data.price}
              rating={10}
              available={data.available}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <div>Error</div>;
  }
};
export default Products;
