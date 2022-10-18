
import ProductCard from "../ProductCard";
import { RootState } from "../../app/store";
import { useCallback, useEffect, useState } from "react";
import { allProducts, fetchAllProducts } from "./productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { VscArrowLeft } from "react-icons/vsc";
import {  useNavigate } from "react-router";
import Paginate from "../Paginate"
import { fetchAllProducts } from "./productSlice";
import Categorias from "../FilterCategorias";


interface prodCard {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  available: boolean;
}

interface props {
  pageNumber: number
}

const Products = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;


  const inicializar = useCallback(async () => {
    dispatch(fetchAllProducts(""));
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.products);
  console.log(data)



  const goBack = () => {
    navigate(-1);
  };

  if (data?.allProducts instanceof Array) {

    
    const currentProducts = data.allProducts.slice(firstPostIndex, lastPostIndex);


    return (
      <>
        <VscArrowLeft
          onClick={() => goBack()}
          className="ml-4 mt-3 h-6 w-6 fill-white"
        />
        <div>
          <Categorias />
        </div>
        <div className="font-display lg:grid lg:grid-cols-4 lg:mr-24 lg:ml-48 lg:gap-8">
          {currentProducts?.allProducts.map((data: prodCard) => (
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
          <Paginate allProducts={data.allProducts.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage}/> 
        </div>
      </>
      
    );
  } else {
    return <div>Error</div>;
  }
  


};
export default Products;
