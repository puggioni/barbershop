import { useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logo from "../imagenes/Logo.png";
import { yaLog } from "./slices/logIn";
import Logeado from "./user/Logeado";

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
    <div className="bg-white p-2 grid grid-flow-col justify-items-center items-center grid-cols-nav ">
      <img
        className="h-12 hover:cursor-pointer"
        onClick={() => {
          handleRedirect();
        }}
        src={logo}
        alt="logo"
      />
      <div className="justify-self-start	ml-16">
        <div className="grid grid-flow-col  font-medium ">
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
          {logeado?
           <Link
           to={`/user/mis-compras/${user._id}`}
           className={`${buttonHover} px-4 py-1 rounded-lg`}
         >
           Mis Compras
         </Link>:<></>}
         
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
