import ProductCard from "../ProductCard";
import { RootState } from "../../app/store";
import { useCallback, useEffect } from "react";
import { fetchAllProducts } from "./productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Products = () => {
  const dispatch = useAppDispatch();

  const inicializar = useCallback(async () => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.getAllProducts);

  if (data?.allProducts instanceof Array) {
    return (
      <div>
        {data?.allProducts.map((data) => (
          <ProductCard
            id={data._id}
            nombre={data.name}
            imagen={undefined}
            precio={data.price}
            rating={undefined}
            available={data.available}
          />
        ))}
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};
export default Products;
