import { Link } from "react-router-dom";
import Footer from "./Footer";
export const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black hover:bg-black hover:text-white";

const Home = () => {
  return (
    <div
      className=" lg:h-[75vh] lg:bg-transparent text-white 
    lg:bg-home-bg bg-cover overflow-hidden bg-no-repeat bg-center bg-home-responsive min-h-screen "
    >
      <div className="h-[75vh]">
        <Link
          className="bg-[#855C20] py-4 px-4 font-bold text-3xl lg:block absolute hidden left-16 bottom-48"
          to="/reserve"
        >
          Pedi tu turno
        </Link>
        <Link
          className="bg-[#855C20] lg:hidden lg:rounded-none rounded-xl block py-4 px-4 font-bold text-3xl absolute lg:left-16 lg:bottom-48 left-8 bottom-8 z-0"
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
