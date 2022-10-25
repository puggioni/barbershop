import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ProductCard from "./ProductCard";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";

export default function Favorites() {
  const dispatch = useAppDispatch();
  var favoritos = useAppSelector((state: RootState) => state.products.favs);
  let navigate = useNavigate();
  const favoritosUser = JSON.stringify(favoritos);

  const inicializar = useCallback(async () => {}, [dispatch, favoritos]);

  useEffect(() => {
    inicializar();
    return () => {};
  }, [dispatch, inicializar]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <VscArrowLeft
        onClick={() => goBack()}
        className="h-7 w-7 fill-white justify-self-start "
      />
      <label htmlFor="" className=" font-bold text-white text-center ">
        Mis Productos Favoritos
      </label>
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
  );
}
