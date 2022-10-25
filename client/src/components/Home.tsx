import { Link } from "react-router-dom";
import Footer from "./Footer";
export const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black hover:bg-black hover:text-white";

const Home = () => {
  return (
    <div className=" h-[75vh] text-white">
      <div className="h-[75vh]">
        <Link
          className="bg-[#855C20] py-4 px-4 font-bold text-3xl absolute left-16 bottom-48"
          to="/reserve"
        >
          Pedi tu turno
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
