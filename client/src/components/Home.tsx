import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import Footer from "./Footer";
import { yaLog } from "./slices/logIn";
import { getFavoritesProducts } from "./slices/productSlice";
export const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black hover:bg-black hover:text-white";

const Home = () => {
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(yaLog());
    
const aux=window.localStorage.getItem("user");
const aux2=window.localStorage.getItem("token");
const aux3=window.localStorage.getItem("favoritos");

if(aux && aux2 && aux3){
 const user=JSON.parse(aux);
 const token=JSON.parse(aux2);
 const favoritos=JSON.parse(aux3);

window.localStorage.removeItem('favoritos');
dispatch(getFavoritesProducts(user._id,token));

}else if(aux && aux2 ){
  
  const user=JSON.parse(aux);
  const token=JSON.parse(aux2);
 dispatch(getFavoritesProducts(user._id,token));

}

    }


  }, [dispatch, user]);

  return (
    <div className=" h-[75vh] text-white">
      <div className="h-[75vh]">
        <Link
          className="bg-[#855C20] py-4 px-4 font-bold text-3xl absolute left-16 bottom-40"
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
