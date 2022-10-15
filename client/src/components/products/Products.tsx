import ProductCard from "../ProductCard";
import { RootState } from "../../app/store";
import { useCallback, useEffect } from "react";
import { fetchAllProducts } from "./productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface prodCard {
  name: string;
  image: string;
  price: number;
  rating: number;
  available: boolean;
  id: string;
}

const Products = () => {
  const dispatch = useAppDispatch();

  const inicializar = useCallback(async () => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.products);

  if (data?.allProducts instanceof Array) {
    return (
      <>
        <button></button>
        <div>
          {data?.allProducts.map((data: prodCard) => (
            <ProductCard
              name={data.name}
              image={"undefined"}
              price={data.price}
              rating={0}
              available={data.available}
              id={data.id}
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
