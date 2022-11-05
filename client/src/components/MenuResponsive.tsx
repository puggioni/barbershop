import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscMenu } from "react-icons/vsc";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logo from "../imagenes/Logo.png";
import { yaLog } from "./slices/logIn";
import Logeado from "./user/Logeado";

export const buttonHover =
  "hover:shadow-md hover:shadow-slate-500 hover:bg-[#855C20] hover:text-white hover:ease-in-out hover:duration-300";

const MenuResponsive = () => {
  const navigate = useNavigate();
  const [hideMenu, setHide] = useState("-translate-y-full");
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  const location = useLocation();
  const logeado = useAppSelector((state) => state.logIn.logeado);

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //====================render=================================
  return (
    <div
      className={`lg:hidden z-50 bg-white/95 min-h-screen w-full absolute top-0 ease-in-out duration-200 ${hideMenu}`}
    >
      <AiOutlineClose
        onClick={() => {
          setHide("-translate-y-full");
        }}
        size={25}
        className="mt-4 ml-auto mr-8"
      />
      <img
        className="m-auto h-[10%] mt-8"
        onClick={() => {
          navigate("/");
          setHide("-translate-y-full");
        }}
        src={logo}
        alt="logo"
      />

      <div className="grid grid-cols-1 mt-16 gap-8 justify-items-center text-3xl ">
        <Link
          to={"/product"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Tienda
        </Link>
        <Link
          to={"/sucursales"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Sucursales
        </Link>
        <Link
          to={"/reserve"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Turnos
        </Link>
        {logeado ? (
          <Link
            to={`/user/mis-compras/${user._id}`}
            className={`${buttonHover} px-4 py-1 rounded-lg`}
            onClick={() => setHide("-translate-y-full")}
          >
            Mis Compras
          </Link>
        ) : (
          <></>
        )}
        <Link
          to={"/contacto"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Contacto
        </Link>
        <Link
          to={"/products/shopping-cart"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Carrito
        </Link>
      </div>
      {logeado && <Logeado setHide={setHide} />}
      <VscMenu
        size={30}
        onClick={() => setHide("")}
        className={`absolute bottom-[-3rem] ml-2  ${
          location.pathname === "/" ||
          location.pathname === "/products/checkout"
            ? "text-white"
            : "text-black"
        }`}
      />
    </div>
  );
};

export default MenuResponsive;
