import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "./Paginate";
import {
  categorias,
  fetchAllProducts,
  getFavoritesProducts,
  setFavosBulk,
  setFavorites,
} from "../slices/productSlice";
import { OrderingByName, OrderingByPrice } from "../products/Order";
import Categorias from "./FilterCategorias";
import ProductCard from "./ProductCard";
import SearchBar from "./Searchbar";

const Products = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const [pageLimit, setPageLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const [hideAlfa, setAlfa] = useState(false);
  const [hidePrecio, setPrecio] = useState(false);
  const { favs } = useAppSelector((state: RootState) => state.products);
  const favoritos = JSON.stringify(favs);

  const cargarFavs = () => {
    const aux = window.localStorage.getItem("user");
    const aux2 = window.localStorage.getItem("token");
    const aux3 = window.localStorage.getItem("favoritos");

    if (aux && aux2 && aux3) {
      // esta parte es para traerse los favoritos si el usuario se logueo
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      const favos = JSON.parse(aux3);
      const arrayIdsfavos = favos.map((p: any) => p._id);

      window.localStorage.removeItem("favoritos");
      dispatch(setFavosBulk(user._id, token, arrayIdsfavos));
    } else if (aux && aux2) {
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      dispatch(getFavoritesProducts(user._id, token));
    } else if (aux3) {
      const favos = JSON.parse(aux3);
      dispatch(setFavorites(favos));
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts(""));
    dispatch(categorias());
    cargarFavs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className=" bg-white bg-store-banner bg-no-repeat pt-52 pb-2 bg-contain">
        <div className="border bg-white border-black rounded-xl mx-40">
          <h1 className="flex justify-center py-8 text-5xl">STORE</h1>
          <div className="content-none border-b mx-40 border-black"></div>
          <Categorias resetPage={resetPage} />

          <div className="font-Hubballi grid grid-cols-4 gap-8 pr-8 ">
            <div className="row-span-3">
              <SearchBar />
              <div className="flex flex-col px-4 py-8 gap-10 mt-8 mx-8 border border-black h-fit rounded-md">
                <label className="underline underline-offset-4 ">
                  ORDENAR:
                </label>

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
            </div>
            {currentProducts?.map((data: any) => {
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
            currentPage={currentPage}
            pageLimit={pageLimit}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            setMaxPageNumberLimit={setMaxPageNumberLimit}
            setMinPageNumberLimit={setMinPageNumberLimit}
          />
        </div>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};
export default Products;
