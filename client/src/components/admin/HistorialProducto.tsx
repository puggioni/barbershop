import { useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "../products/Paginate";
import SearchBar from "../products/Searchbar";
import { yaLog } from "../slices/logIn";

import { categorias, fetchAllProducts } from "../slices/productSlice";

const Productos = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const dispatch = useAppDispatch();

  const data = useAppSelector((state: RootState) => state.products);

  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const header = useHeaders(token);

  //============use effect=================

  useEffect(() => {
    dispatch(fetchAllProducts(""));
    dispatch(categorias());
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //===========pagination=============
  const currentProducts = data.allProducts?.slice(
    firstPostIndex,
    lastPostIndex
  );
  const [pageLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //=====================click handlers=====================

  const handleRestore = (e: any) => {
    dispatch(fetchAllProducts(""));
  };

  //==============render================================
  if ([] instanceof Array) {
    return (
      <div className=" bg-white bg-admin-banner bg-no-repeat bg-contain h-full">
        <h1 className="text-white justify-center py-20 mb-2 text-5xl font-bold flex align-middle items-center">
          Historia de compra de producto
        </h1>
        <div className=" mx-8 bg-white border-2 px-4 border-black rounded-lg">
          <div>
            <div className="grid grid-cols-[1.5fr_1fr] gap-8">
              <div className="grid grid-cols-[2fr_1fr_1fr_.2fr] gap-16  my-8">
                <SearchBar />

                <BsArrowCounterclockwise
                  onClick={(e) => handleRestore(e)}
                  size={30}
                  title="restaurar productos"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="relative">
              <div className=" grid grid-cols-[1fr_.2fr_.2fr_.2fr] w-[55%] pr-8 gap-16 justify-items-center">
                <p>Nombre</p>
                <p>Stock</p>
                <p>Disponible</p>
                <p>Precio</p>
              </div>

              {currentProducts.map((data) => {
                const disp = data.available ? "Sí" : "Nó";
                return (
                  <div
                    className="grid grid-cols-[1fr_.2fr_.2fr_1fr_.2fr_.2fr_.2fr]  gap-16 py-2 pl-2 mt-8 border border-black rounded-lg items-center"
                    key={data._id}
                  >
                    <p>{data.name}</p>
                    <p>{data.stock}</p>
                    <p>{disp}</p>
                    <p>{data.price}</p>
                  </div>
                );
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
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};

export default Productos;
