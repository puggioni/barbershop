import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logo from "../imagenes/Logo.png";
import { yaLog } from "./slices/logIn";
import Logeado from "./user/Logeado";

export const buttonHover =
  "hover:shadow-md hover:shadow-slate-500	hover:bg-[#855C20] hover:text-white hover:ease-in-out hover:duration-300";

const MenuResponsive = () => {
  const logeado = useAppSelector((state) => state.logIn.logeado);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  let adminAuth = false;
  if (Object.keys(user).length) {
    adminAuth = user.role[0].name === "admin";
  }
  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="lg:hidden absolute z-10 justify-center bg-white/95 min-h-screen min-w-[100vw]">
      <img
        className="h-[30%] hover:cursor-pointer"
        onClick={() => {
          handleRedirect();
        }}
        src={logo}
        alt="logo"
      />

      <div className="grid grid-cols-1 mt-16 gap-8 justify-items-center ml-8 mr-20 font-2xl ">
        <Link to={"/product"} className={`${buttonHover} px-4 py-1 rounded-lg`}>
          Store
        </Link>
        <Link
          to={"/sucursales"}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Sucursales
        </Link>
        <Link to={"/reserve"} className={`${buttonHover} px-4 py-1 rounded-lg`}>
          Turnos
        </Link>
        <Link
          to={"/contacto"}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Contacto
        </Link>
        {adminAuth && (
          <>
            <Link
              to="/admin/products"
              className={`${buttonHover} px-4 py-1 rounded-lg`}
            >
              Productos(A)
            </Link>
            <Link
              to="/admin/users"
              className={`${buttonHover} px-4 py-1 rounded-lg`}
            >
              Usuarios(A)
            </Link>
            <Link
              to="/admin/compras"
              className={`${buttonHover} px-4 py-1 rounded-lg`}
            >
              Compras(A)
            </Link>
          </>
        )}
      </div>

      {logeado ? <Logeado /> : <p></p>}
    </div>
  );
};

export default MenuResponsive;
