import { useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "../products/Paginate";
import { ordersProducto } from "../slices/admin";
import { yaLog } from "../slices/logIn";
import OrderSearch from "./orderSearch";

const OrderProducto = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const data = useAppSelector((state: RootState) => state.admin.orders);

  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const header = useHeaders(token);

  //============use effect=================

  useEffect(() => {
    dispatch(ordersProducto(header.headers, id));

    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //===========pagination=============
  const currentProducts = data.slice(firstPostIndex, lastPostIndex);
  const [pageLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //=====================click handlers=====================

  const handleRestore = () => {
    dispatch(ordersProducto(header.headers, id));
  };

  //==============render================================
  if ([] instanceof Array) {
    return (
      <div className=" bg-white bg-admin-banner bg-no-repeat bg-contain h-full">
        <h1 className="text-white justify-center py-20 mb-2 text-5xl font-bold flex align-middle items-center">
          Orden de compra de producto
        </h1>
        <div className=" mx-8 bg-white border-2 px-4 border-black rounded-lg">
          <div>
            <div className="grid grid-cols-[1.5fr_1fr] gap-8">
              <div className="flex w-[50vw] gap-16  my-8">
                <OrderSearch />

                <BsArrowCounterclockwise
                  onClick={() => handleRestore()}
                  size={30}
                  title="restaurar productos"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="relative">
              <div className=" grid grid-cols-5 ml-8 gap-16 ">
                <p>User</p>
                <p>Id Compra</p>
                <p>Estado</p>
                <p>Fecha</p>
              </div>

              {currentProducts.map((data) => {
                const fecha = String(data.date).split("T");
                return (
                  <div
                    className="grid grid-cols-5  gap-16 py-2 pl-2 mt-8 border border-black rounded-lg items-center"
                    key={data._id}
                  >
                    <p>{data.user}</p>
                    <p>{data._id}</p>
                    <p>{data.state}</p>
                    <p>{fecha[0]}</p>
                    <Link to={`/user/mis-compras/compra/${data._id}`}>
                      Ver historial
                    </Link>
                  </div>
                );
              })}
            </div>
            <Paginate
              allProducts={data.length}
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

export default OrderProducto;
