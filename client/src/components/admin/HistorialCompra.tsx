import { useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Paginate from "../products/Paginate";
import {
  cambiarEstadoOrden,
  filterOrderState,
  getAllOrders,
} from "../slices/admin";
import { yaLog } from "../slices/logIn";
import OrderSearch from "./OrderSearch";

const HistorialCompra = () => {
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const header = useHeaders(token);
  const dispatch = useAppDispatch();
  const ordenes = useAppSelector((state) => state.admin.orders);
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    dispatch(yaLog(user.email));
    dispatch(getAllOrders(header.headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //=================pagination=======================
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(15);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentProducts = ordenes.length
    ? ordenes?.slice(firstPostIndex, lastPostIndex)
    : [];

  //===============handlers===========================

  const handleRestore = () => {
    dispatch(getAllOrders(header.headers));
  };

  const handleEstado = (id: string, newState: string) => {
    if (
      window.confirm(
        `¿Esta seguro de querer cambiar el estado de orden ${id} a ${newState}`
      )
    ) {
      dispatch(cambiarEstadoOrden(header.headers, id, newState));
    }
  };

  const handlePerfil = (id: string) => {};

  const handleSearchBy = (e: any) => {
    setSearchBy(e.target.value);
  };

  const handleFilter = (e: any) => {
    dispatch(filterOrderState(e.target.value));
  };

  //==========================render================
  return (
    <div className="flex flex-col bg-white bg-bg-historial bg-no-repeat bg-contain ">
      <h1 className="text-white justify-center py-20 mb-2 text-5xl font-bold flex align-middle items-center">
        HISTORIAL DE COMPRAS
      </h1>
      <div className=" mx-8 bg-white border-2 px-4 border-black rounded-lg">
        <div>
          <div className="flex  gap-8 mt-10">
            <OrderSearch searchBy={searchBy} />
            <select
              className="outline-none"
              onChange={(e) => handleSearchBy(e)}
            >
              <option value="" disabled selected>
                Buscar por
              </option>
              <option value="name">Name</option>
              <option value="id">Id</option>
            </select>
            <select className="outline-none" onChange={(e) => handleFilter(e)}>
              <option value="" disabled selected>
                Filtrar por estado
              </option>
              <option value="Completa">Completa</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Creada">Procesando</option>
            </select>
          </div>

          <div className="grid grid-cols-[1.5fr_1fr] gap-8"></div>
          <div className="mt-8">
            <div className=" grid grid-cols-[1fr_.5fr_.5fr_.5fr_1.5fr_.5fr] gap-16 ml-20">
              <p>Email</p>
              <p>Id de orden</p>
              <p>Precio total</p>
              <p>Estado</p>
              <p>Cambiar estado</p>
              <BsArrowCounterclockwise
                onClick={() => handleRestore()}
                size={30}
                title="restore products cursor-pointer"
                className="cursor-pointer"
              />
            </div>

            {currentProducts.map((data) => {
              const estilo =
                data.state === "Completa"
                  ? "text-lime-500"
                  : data.state === "Cancelada"
                  ? "text-red-600"
                  : "";

              const estado =
                data.state === "Completa"
                  ? "COMPLETA"
                  : data.state === "Cancelada"
                  ? "CANCELADA"
                  : "PROCENSANDO";

              const price = data.products?.reduce((prev, curr) => {
                return prev + curr.price;
              }, 0);
              return (
                <div
                  className="grid grid-cols-[1.3fr_1fr_.2fr_.5fr_2fr_1fr] gap-16 py-2 pl-2 mt-8 border border-black rounded-lg items-center"
                  key={data._id}
                >
                  <p
                    onClick={() => {
                      handlePerfil(data._id);
                    }}
                  >
                    {data.user}
                  </p>
                  <p>{data._id}</p>
                  <p>{price.toFixed(2)}</p>
                  <p className={`${estilo}`}>{estado}</p>
                  <div className={"flex gap-4 "}>
                    <button
                      onClick={() => handleEstado(data._id, "Completa")}
                      className="border-r border-black pr-4 hover:text-[#855C20] font-semibold "
                    >
                      Completa
                    </button>
                    <button
                      onClick={() => handleEstado(data._id, "Cancelada")}
                      className="border-r border-black pr-4 hover:text-[#855C20] font-semibold "
                    >
                      Cancelada
                    </button>
                    <button
                      onClick={() => handleEstado(data._id, "Creada")}
                      className="hover:text-[#855C20] font-semibold "
                    >
                      Procesando
                    </button>
                  </div>
                  <button className="text-blue-800 ml-auto mr-4">
                    Ver orden de compra
                  </button>
                </div>
              );
            })}
          </div>
          <Paginate
            allProducts={ordenes.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default HistorialCompra;
