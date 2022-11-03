import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscMenu } from "react-icons/vsc";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import logo from "../imagenes/Logo.png";
import { yaLog } from "./slices/logIn";

export const buttonHover =
  "hover:shadow-md hover:shadow-slate-500 hover:bg-[#855C20] hover:text-white hover:ease-in-out hover:duration-300";

const MenuResponsive = () => {
  const navigate = useNavigate();
  const [hideMenu, setHide] = useState("-translate-y-full");
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //====================render=================================
  return (
    <div
      className={`lg:hidden z-10 bg-white/95 left-0 right-0 top-0 bottom-0 absolute  ease-in-out duration-200 ${hideMenu}`}
    >
      <AiOutlineClose
        onClick={() => {
          setHide("-translate-y-full");
        }}
        size={25}
        className="mt-8 ml-auto mr-8"
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

      <div className="grid grid-cols-1 mt-16 gap-8 justify-items-center ml-8 mr-20 text-3xl ">
        <Link
          to={"/product"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Store
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
        <Link
          to={"/contacto"}
          onClick={() => setHide("-translate-y-full")}
          className={`${buttonHover} px-4 py-1 rounded-lg`}
        >
          Contacto
        </Link>
      </div>
      <VscMenu
        size={30}
        onClick={() => setHide("")}
        className={`absolute bottom-[-3rem] ml-2  ${
          location.pathname === "/" ? "text-white" : "text-black"
        }`}
      />
    </div>
  );
};

export default MenuResponsive;
