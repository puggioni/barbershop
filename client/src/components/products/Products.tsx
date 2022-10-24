import { useCallback, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "./Paginate";
import { categorias, fetchAllProducts,getFavoritesProducts } from "../slices/productSlice";
import { OrderingByName, OrderingByPrice } from "../products/Order";
import Categorias from "./FilterCategorias";
import Paginate from "./Paginate";
import ProductCard from "./ProductCard";



interface prodCard {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  available?: boolean;
}
const Products = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const [hideAlfa, setAlfa] = useState(false);
  const [hidePrecio, setPrecio] = useState(false);
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

  const resetPage = () => {
    setCurrentPage(1);

  };

  if (data?.allProducts instanceof Array) {
    const currentProducts = data.allProducts.slice(
      firstPostIndex,
      lastPostIndex
    );

    return (
      <div className=" bg-white bg-store-banner bg-no-repeat pt-52 pb-8">
        <div className="border bg-white border-black rounded-xl mx-40">
          <h1 className="flex justify-center py-8 text-5xl">STORE</h1>
          <div className="content-none border-b mx-40 border-black"></div>
          <Categorias resetPage={resetPage} />

          <div className="font-Hubballi grid grid-cols-4 gap-8 pr-8 ">
            <div className="flex flex-col px-4 py-8 gap-10 row-span-3 mt-40 mx-8 border border-black h-fit rounded-md">
              <label className="underline underline-offset-4 ">ORDENAR:</label>

              <div className="relative">
                <p className="underline underline-offset-2">Alfabetico</p>
                {!hideAlfa ? (
                  <BsPlus
                    className="absolute top-1 right-5 cursor-pointer"
                    size={15}
                    onClick={() => {
                      setAlfa(!hideAlfa);
                    }}
                  />
                ) : (
                  <HiMinus
                    className="absolute top-1 right-5 cursor-pointer"
                    size={15}
                    onClick={() => {
                      setAlfa(!hideAlfa);
                    }}
                  />
                )}
              </div>
              <OrderingByName hidden={hideAlfa} />
              {/* <span className="content-none border-b mx-4 border-black"></span> */}
              <div className="relative">
                <p className="underline underline-offset-2">Precio</p>
                {!hidePrecio ? (
                  <BsPlus
                    className="absolute top-1 right-5 cursor-pointer "
                    size={15}
                    onClick={() => {
                      setPrecio(!hidePrecio);
                    }}
                  />
                ) : (
                  <HiMinus
                    className="absolute top-1 right-5 cursor-pointer "
                    size={15}
                    onClick={() => {
                      setPrecio(!hidePrecio);
                    }}
                  />
                )}
              </div>
              <OrderingByPrice hidden={hidePrecio} />
            </div>

            {currentProducts?.map((data: prodCard) => {
              if (data.available) {
                return (
                  <ProductCard
                    key={data._id}
                    _id={data._id}
                    name={data.name}
                    image={data.image}
                    price={data.price}
                    userFavorite={favoritos.includes(data._id)}
                  />
                );
              } else return null;
            })}
          </div>

          <Paginate
            allProducts={data.allProducts.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};
export default Products;
