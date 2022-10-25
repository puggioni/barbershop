import {useEffect, useCallback} from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ProductCard from "./ProductCard";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { getFavoritesProducts, setFavosBulk } from "../slices/productSlice";
import { setFavorites } from "../slices/productSlice";
export default function Favorites(){
    const dispatch = useAppDispatch();
    var favoritos=useAppSelector((state:RootState)=>state.products.favs)
    let navigate = useNavigate();
    const favoritosUser=JSON.stringify(favoritos);     

    const  cargarFavs=()=>{
      const aux=window.localStorage.getItem("user");
      const aux2=window.localStorage.getItem("token");
      const aux3=window.localStorage.getItem("favoritos");
  
      if(aux && aux2 && aux3){   // esta parte es para traerse los favoritos si el usuario se logueo
       const user=JSON.parse(aux);
       const token=JSON.parse(aux2);
       const favos=JSON.parse(aux3);
       const arrayIdsfavos=favos.map((p:any)=>(p._id));

    window.localStorage.removeItem('favoritos');
    dispatch(setFavosBulk(user._id,token, arrayIdsfavos));
     
    }else if(aux && aux2 ){
        const user=JSON.parse(aux);
        const token=JSON.parse(aux2);
       dispatch(getFavoritesProducts(user._id,token));
      
    }else if(aux3){
      const favos=JSON.parse(aux3)
      dispatch(setFavorites(favos))
    }
    }

    const inicializar = useCallback(async () => {
      cargarFavs();
      }, [dispatch, cargarFavs]);

      useEffect(() => {
        inicializar();
        
        return () => {
          
        };
      }, [dispatch]);

      const goBack = () => {
        navigate(-1);
      };
    return(
        <div>
                <VscArrowLeft
            onClick={() => goBack()}
            className="h-7 w-7 fill-white justify-self-start "
          />
            <label htmlFor="" className=" font-bold text-white text-center ">Mis Productos Favoritos</label>
            {favoritos?.map((Favoritos: any) => (
            <ProductCard
              key={Favoritos._id}
              _id={Favoritos._id}
              name={Favoritos.name}
              image={Favoritos.image}
              price={Favoritos.price}
              rating={10}
              available={Favoritos.available}
              userFavorite={favoritosUser.includes(Favoritos._id)}
            />
          ))}

        </div>
    )
} 

