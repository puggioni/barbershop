import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Footer from "./Footer";

export const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black hover:bg-black hover:text-white";
export const buttonHover =
  "hover:shadow-md hover:shadow-slate-500 hover:bg-[#855C20] hover:text-white hover:ease-in-out hover:duration-300";

const Home = () => {
  const logeado = useAppSelector((state) => state.logIn.logeado);

  return (
    <div
      className="lg:bg-transparent text-white lg:min-h-0
    lg:bg-home-bg bg-cover overflow-hidden bg-no-repeat bg-center bg-home-responsive min-h-screen w-full"
    >
      {!logeado ? (
        <div className="inline-block float-right m-6">
          <Link
            className={` bg-[#C0914C] lg:hidden text-white px-2 py-2 rounded-lg font-bold`}
            to={"/user/login"}
          >
            Log In
          </Link>
          <Link
            className={` ml-6 bg-[#C0914C] lg:hidden text-white px-2 py-2 rounded-lg font-bold`}
            to={"/user/create"}
          >
            Sign in
          </Link>
        </div>
      ) : (
        <p></p>
      )}

      <div className="h-[75vh]">
        <Link
          className="bg-[#855C20] py-4 px-4 font-bold text-3xl lg:block absolute hidden left-16 bottom-48"
          to="/reserve"
        >
          Pedi tu turno
        </Link>
        <Link
          className="bg-[#C0914C] lg:hidden rounded-xl inline-block py-4 px-4 font-bold text-3xl absolute lg:left-16 lg:bottom-48 left-8 bottom-8 z-0"
          to="/reserve"
        >
          Turnos
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
