import { useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logo from "../imagenes/Logo.png";
import Logeado from "./user/Logeado";
import { yaLog } from "./slices/logIn";

export const buttonHover =
  "hover:shadow-md hover:shadow-slate-500	hover:bg-[#855C20] hover:text-white hover:ease-in-out hover:duration-300";

const NavBar = () => {
  const logeado = useAppSelector((state) => state.logIn.logeado);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog());
    }
  }, [dispatch, user]);
  return (
    <div className="bg-stone-50/90 p-2 grid grid-flow-col justify-items-center items-center grid-cols-nav ">
      <img
        className="h-12 hover:cursor-pointer"
        onClick={() => {
          handleRedirect();
        }}
        src={logo}
        alt="logo"
      />
      <div className="justify-self-start	ml-16">
        <div className="grid grid-flow-col gap-12 font-medium ">
          <Link
            to={"/product"}
            className={`${buttonHover} px-4 py-1 rounded-lg`}
          >
            Store
          </Link>
          <Link
            to={"/sucursales"}
            className={`${buttonHover} px-4 py-1 rounded-lg`}
          >
            Sucursales
          </Link>
          <Link
            to={"/reserve"}
            className={`${buttonHover} px-4 py-1 rounded-lg`}
          >
            Turnos
          </Link>
          <Link
            to={"/contacto"}
            className={`${buttonHover} px-4 py-1 rounded-lg`}
          >
            Contacto
          </Link>
        </div>
      </div>

      {logeado ? (
        <Logeado />
      ) : (
        <Link to={"/user/login"}>
          <button
            className={`${buttonHover} bg-black text-white px-2 py-2 justify-self-center rounded-lg font-bold`}
          >
            Log In/Sign Up
          </button>
        </Link>
      )}

      <Link
        title="ir al Carrito"
        className="hover:text-[#855C20] "
        to={"/products/shopping-cart"}
      >
        <RiShoppingBasket2Line size={40} />
      </Link>
      <Link title="ir a Favoritos" to={"/products/favorites"}>
        <MdFavoriteBorder size={40} className="mx-4" />
      </Link>
    </div>
  );
};

export default NavBar;
