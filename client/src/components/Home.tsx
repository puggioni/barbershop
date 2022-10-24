import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import Footer from "./Footer";
import { yaLog } from "./slices/logIn";

export const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black hover:bg-black hover:text-white";

const Home = () => {
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog());
    }
  }, [dispatch, user]);

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
