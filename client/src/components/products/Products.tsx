import { useCallback, useEffect, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "./Paginate";
import { categorias, fetchAllProducts,getFavoritesProducts} from "../slices/productSlice";

import Categorias from "./FilterCategorias";
import ProductCard from "./ProductCard";
import NavBar from "../NavBar";
import{ OrderingByName, OrderingByPrice } from "../products/Order"
import { tokenToString } from "typescript";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const {favs}=useAppSelector((state: RootState)=>state.products)
  const favoritos=JSON.stringify(favs); 
  const inicializar = useCallback(async () => {
    dispatch(fetchAllProducts(""));
    dispatch(categorias());
    const aux=window.localStorage.getItem("user");
    const aux2=window.localStorage.getItem("token");
    const aux3=window.localStorage.getItem("favoritos");
    if(aux && aux2 && aux3){
     const user=JSON.parse(aux);
     const token=JSON.parse(aux2);
     const favoritos=JSON.parse(aux3);

   // dispatch(getFavoritesProducts(user._id,token));
   
  }else if(aux && aux2 ){
      
      const user=JSON.parse(aux);
      const token=JSON.parse(aux2);
     dispatch(getFavoritesProducts(user._id,token));
    
  }
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.products);

  const goBack = () => {
    navigate(-1);
  };
  if (data?.allProducts instanceof Array) {
    const currentProducts = data.allProducts.slice(
      firstPostIndex,
      lastPostIndex
    );

    return (
      <div className="">

        <div className=" p-2 grid grid-flow-col justify-items-center items-center grid-cols-3">
          <div  className="block"> 
          <VscArrowLeft
            onClick={() => goBack()}
            className="h-7 w-7 fill-white justify-self-start "
          />
          </div>
          <div className="flex justify-self-end ">
            <OrderingByName />
            <OrderingByPrice />
          </div>
        </div>



        <div>
          <Categorias />
        </div>
        <div className="font-display lg:grid lg:grid-cols-4 lg:mr-24 lg:ml-48 lg:gap-8">
          {currentProducts?.map((data: prodCard) => (
            <ProductCard
              key={data._id}
              _id={data._id}
              name={data.name}
              image={data.image}
              price={data.price}
              rating={10}
              userFavorite={favoritos.includes(data._id)}
              available={data.available}
            />
          ))}
        </div>
        <Paginate
          allProducts={data.allProducts.length}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};
export default Products;
