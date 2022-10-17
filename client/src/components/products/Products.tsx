import ProductCard from "../ProductCard";
import { RootState } from "../../app/store";
import { useCallback, useEffect } from "react";
import { fetchAllProducts } from "./productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";

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
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.products);

  function goBack(): void {
    navigate(-1);
  }

  if (data?.allProducts instanceof Array) {
    return (
      <>
        <VscArrowLeft
          onClick={() => goBack()}
          className="ml-4 mt-3 h-6 w-6 hover:fill-white"
        />
        <div>
          {data?.allProducts.map((data: prodCard) => (
            <ProductCard
              _id={data._id}
              name={data.name}
              image={"undefined"}
              price={data.price}
              rating={0}
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
