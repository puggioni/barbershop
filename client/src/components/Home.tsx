import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { yaLog } from "./slices/logIn";
import Logeado from "./user/Logeado";

export const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black hover:bg-black hover:text-white";

const Home = () => {
  const logeado = useAppSelector((state) => state.logIn.logeado);
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog());
    }
  }, [dispatch, user]);

  return (
    <div className=" h-screen text-white">
      {logeado ? (
        <Logeado />
      ) : (
        <Link to={"/user/login"}>
          <button className="absolute top-15 right-0 m-4 ">
            Log In/Sign Up
          </button>
        </Link>
      )} 

      <div className="flex flex-col gap-y-10 font-semibold translate-y-1/2">
        <h1 className="my-auto text-5xl text-center">
          Henry Barber <br />
          Shop
        </h1>
        <Link className={buttonStyle} to="/product">
          Store
        </Link>
        <Link className={buttonStyle} to="/reserve">
          Pedi tu Turno
        </Link>
        <button className={buttonStyle}>Conocenos</button>
      </div>
    </div>
  );
};

export default Home;
