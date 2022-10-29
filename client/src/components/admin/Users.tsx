import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Paginate from "../products/Paginate";
import { banearUsuario, getUsers, hacerAdmin } from "../slices/admin";
import { yaLog } from "../slices/logIn";

const user = JSON.parse(window.localStorage.getItem("user") || "{}");

const Productos = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.admin);
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const header = useHeaders(token);
  //============use effect=================
  useEffect(() => {
    dispatch(getUsers(header.headers));
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //===========pagination=============
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentProducts = users.slice(firstPostIndex, lastPostIndex);
  //=====================click handlers=====================
  const handleBanned = (
    id: string,
    user: string,
    banned: boolean | undefined
  ) => {
    if (!banned) {
      if (window.confirm(`¿Esta seguro que quiere BANEAR a ${user}?`)) {
        dispatch(banearUsuario(header.headers, id));
      }
    } else {
      if (window.confirm(`¿Esta seguro que quiere DESBANEAR a ${user}?`)) {
        dispatch(banearUsuario(header.headers, id));
      }
    }
  };

  const handleAdmin = (id: string, user: string, rol: string) => {
    if (rol === "user") {
      if (
        window.confirm(`¿Esta seguro de dar privilegios de ADMIN a ${user}?`)
      ) {
        dispatch(hacerAdmin(header.headers, id, rol));
      }
    } else {
      if (
        window.confirm(`¿Esta seguro de QUITAR privilegios de ADMIN a ${user}?`)
      ) {
        dispatch(hacerAdmin(header.headers, id, rol));
      }
    }
  };

  //==============render================================
  if ([] instanceof Array) {
    return (
      <div className=" bg-white bg-admin-banner bg-no-repeat bg-contain h-full">
        <h1 className=" text-white justify-center py-20 mb-2 text-5xl font-bold flex flex-col align-middle items-center">
          PANEL DE USUARIOS
        </h1>
        <div className=" mx-8 bg-white border-2 px-4 border-black rounded-lg">
          <div>
            <div className="relative w-full">
              <div className=" grid grid-cols-[1fr_1fr_1.5fr_.5fr_.5fr_3fr]  pr-8 gap-20 justify-items-center">
                <p>Email</p>
                <p>Nombre</p>
                <p>Apellido</p>
                <p>Banear</p>
                <p>Admin</p>
              </div>

              {currentProducts.map((data) => {
                let admin = false;
                let rol = "user";
                if (data.role?.length) {
                  const dataRol = data.role[0].name;
                  if (dataRol === "admin") {
                    admin = true;
                    rol = "admin";
                  }
                }

                return (
                  <div
                    className="grid grid-cols-[1.5fr_1fr_1fr_.5fr_.5fr_3fr]  gap-16 py-2 pl-2 mt-8 border border-black rounded-lg items-center"
                    key={data._id}
                  >
                    <p>{data.email}</p>
                    <p>{data.name}</p>
                    <p>{data.lastname}</p>
                    <input
                      type="checkbox"
                      defaultChecked={data.banned}
                      onChange={(e) =>
                        handleBanned(data._id, data.email, data.banned)
                      }
                    />
                    <input
                      type="checkbox"
                      defaultChecked={admin}
                      onChange={(e) => handleAdmin(data._id, data.email, rol)}
                    />
                    <Link
                      className="justify-self-end mr-3 text-blue-700"
                      to="/"
                    >
                      Ver historial de compra
                    </Link>
                  </div>
                );
              })}
            </div>
            <Paginate
              allProducts={users.length}
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
