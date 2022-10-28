import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getUsers } from "../slices/admin";

const Productos = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.admin);
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const navigate = useNavigate();
  const header = useHeaders(token);

  //============use effect=================
  const inicializar = useCallback(() => {
    dispatch(getUsers(header.headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  //===========pagination=============
  const currentProducts = users.slice(firstPostIndex, lastPostIndex);

  //=====================click handlers=====================

  //==============render================================
  if ([] instanceof Array) {
    return (
      <div className=" bg-white bg-admin-banner bg-no-repeat bg-auto ">
        <h1 className=" text-white justify-center py-20 mb-2 text-5xl font-bold flex flex-col align-middle items-center">
          PANEL DE PRODUCTOS
        </h1>
        <div className=" mx-8 h-screen bg-white border-2 px-4 border-black rounded-lg">
          <div>
            <div className="relative w-full">
              <div className=" grid grid-cols-[1fr_.2fr_.2fr_.2fr] w-[55%] pr-8 gap-16 justify-items-center">
                <p>Email</p>
                <p>Nombre</p>
                <p>Apellido</p>
                <p>Banear</p>
                <p>Admin</p>
              </div>
              <button className="absolute right-8 top-0 text-blue-800	">
                Ver historial de comrpas
              </button>

              {currentProducts.map((data) => {
                return (
                  <div
                    className="grid grid-cols-[1fr_.2fr_.2fr_1fr_.2fr_.2fr_.2fr]  gap-16 py-2 pl-2 mt-8 border border-black rounded-lg items-center"
                    key={data._id}
                  >
                    <p>{data.email}</p>
                    <p>{data.name}</p>
                    <p>{data.lastname}</p>
                  </div>
                );
              })}
            </div>
            {/* <Paginate
              allProducts={data.allProducts.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
            /> */}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};

export default Productos;
