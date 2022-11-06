import { useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logo from "../imagenes/Logo.png";
import { yaLog } from "./slices/logIn";
import { getCantCarrito } from "./slices/purchaseOrder";
import Logeado from "./user/Logeado";

export const buttonHover = "text-[black] hover:text-[#855C20]";
export const adminBtns = "text-[red] hover:text-[black]";
const NavBar = () => {
  const logeado = useAppSelector((state) => state.logIn.logeado);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  let adminAuth = false;
  if (Object.keys(user).length) {
    adminAuth = user.role[0].name === "admin";
  }
  // const products: any = JSON.parse(
  //   window.localStorage.getItem("product") || "[]"
  // );
  const cant = useAppSelector((state) => state.orders.carrito);

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog(user.email));
    }
    dispatch(getCantCarrito());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //==================================handler==============================
  const handleRedirect = () => {
    navigate("/");
  };

  //================================render==========================
  return (
    <div className="bg-white p-2 lg:grid grid-flow-col justify-items-center items-center grid-cols-nav hidden">
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
            Tienda
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
          {logeado ? (
            <Link
              to={`/user/mis-compras/${user._id}`}
              className={`${buttonHover} px-4 py-1 rounded-lg`}
            >
              Mis Compras
            </Link>
          ) : (
            <></>
          )}

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
                className={`${adminBtns} px-4 py-1 rounded-lg`}
              >
                Productos
              </Link>
              <Link
                to="/admin/users"
                className={`${adminBtns} px-4 py-1 rounded-lg`}
              >
                Usuarios
              </Link>
              <Link
                to="/admin/compras"
                className={`${adminBtns} px-4 py-1 rounded-lg`}
              >
                Compras
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
            className={`${buttonHover}  px-2 py-2 justify-self-center rounded-lg font-bold`}
          >
            Log In/Sign Up
          </button>
        </Link>
      )}

      <Link
        title="ir al Carrito"
        className="hover:text-[#855C20] relative"
        to={"/products/shopping-cart"}
      >
        <p className="absolute w-6 text-sm text-center m-auto bg-black text-white rounded-full right-[-.8rem] top-0">
          {cant}
        </p>
        <RiShoppingBasket2Line size={40} />
      </Link>
      <Link title="ir a Favoritos" to={"/products/favorites"}>
        <MdFavoriteBorder size={40} className="mx-4" />
      </Link>
    </div>
  );
};

export default NavBar;
