import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "../products/Paginate";
import SearchBar from "../products/Searchbar";

import { categorias, fetchAllProducts, filter } from "../slices/productSlice";

const Productos = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.products);
  const cate = useAppSelector((state) => state.products.categorias);

  const inicializar = useCallback(() => {
    dispatch(fetchAllProducts(""));
    dispatch(categorias());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const currentProducts = data.allProducts?.slice(
    firstPostIndex,
    lastPostIndex
  );

  const handleCateFilter = (event: any) => {
    if (event.target.value.length) {
      dispatch(filter(event.target.value));
      setCurrentPage(1);
    }
  };

  if (data?.allProducts instanceof Array) {
    return (
      <div className="bg-white bg-admin-banner bg-no-repeat bg-contain h-screen">
        <h1 className="text-white justify-center pt-20 text-3xl flex align-middle items-center">
          PANEL DE PRODUCTOS
        </h1>
        <div className="translate-y-[15%] mx-8 bg-white rounded-lg">
          <div>
            <div className="grid grid-cols-[1.5fr_1fr] gap-16">
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-16  my-8">
                <SearchBar />
                <select
                  name="ordenar"
                  id="ordenar"
                  className="border border-black rounded-lg px-1"
                >
                  <option value="alfa">Alfabetico</option>
                  <option value="stock">Stock</option>
                  <option value="disponible">Disponible</option>
                  <option value="precio">Precio</option>
                </select>
                <select
                  name="categorias"
                  id="categorias"
                  className="border border-black rounded-lg px-1 py-3"
                  onChange={(e) => handleCateFilter(e)}
                >
                  {cate?.map((cate: { name: string; id: string }) => {
                    return <option value={cate.name}>{cate.name}</option>;
                  })}
                </select>
              </div>

              <div className=" self-center justify-self-center ">
                <button className="bg-[#855C20] mr-4 py-2 px-2 text-white rounded-lg font-semibold">
                  CREAR CATEGORIO
                </button>
                <button className="bg-[#855C20] py-2 px-2 text-white rounded-lg font-semibold">
                  CREAR PRODUCTO
                </button>
              </div>
            </div>

            <div className="flex gap-16">
              <p>Nombre</p>
              <p>Stock</p>
              <p>Disponible</p>
              <p>Precio</p>
              <button className="justify-self-end">
                Ver historial de comrpas
              </button>
            </div>
            <div className="productos">
              {currentProducts?.map((data) => {
                const disp = data.available ? "Sí" : "Nó";
                return (
                  <div key={data._id}>
                    {data.name}
                    {data.stock}
                    {disp}
                    {data.price}
                  </div>
                );
              })}
            </div>
            <Paginate
              allProducts={data.allProducts.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
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
