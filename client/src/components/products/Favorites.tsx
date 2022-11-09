import { useEffect, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  getFavoritesProducts,
  setFavorites,
  setFavosBulk,
} from "../slices/productSlice";
import Paginate from "./Paginate";
import ProductCard from "./ProductCard";

export default function Favorites() {
  const dispatch = useAppDispatch();
  var favoritos = useAppSelector((state: RootState) => state.products.favs);
  let navigate = useNavigate();
  const favoritosUser = JSON.stringify(favoritos);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState(8);
  const [pageLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;

  const cargarFavs = () => {
    const aux = window.localStorage.getItem("user");
    const aux2 = window.localStorage.getItem("token");
    const aux3 = window.localStorage.getItem("favoritos");

    if (aux && aux2 && aux3) {
      // esta parte es para traerse los favoritos si el usuario se logueo
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      const favos = JSON.parse(aux3);
      const arrayIdsfavos = favos.map((p: any) => p._id);

      window.localStorage.removeItem("favoritos");
      dispatch(setFavosBulk(user._id, token, arrayIdsfavos));
    } else if (aux && aux2) {
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      dispatch(getFavoritesProducts(user._id, token));
    } else if (aux3) {
      const favos = JSON.parse(aux3);
      dispatch(setFavorites(favos));
    }
  };

  useEffect(() => {
    cargarFavs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  const currentFavs = favoritos.slice(firstPostIndex, lastPostIndex);
  return (
    <div className=" bg-white bg-favorites-banner bg-no-repeat pb-2 bg-cover min-h-screen">
      <VscArrowLeft onClick={() => goBack()} className="h-7 w-7 fill-white" />
      <h1 className="flex justify-center text-white pb-4 pt-36 text-6xl">
        MIS FAVORITOS
      </h1>

      <div className="border bg-white border-black rounded-xl p-3 mx-4 mt-10">
        {favoritos.length ? (
          <div className="grid grid-cols-4 gap-4 p-10 mx-4">
            {currentFavs?.map((Favoritos: any) => (
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
        ) : (
          <div className="flex justify-center lg:flex-row flex-col mt-8">
            Aun no tiene favortino precione
            <Link className="text-blue-400 mx-2 " to="/product">
              aqui
            </Link>
            para agregar alguno
          </div>
        )}
        <br />
        <Paginate
          allProducts={favoritos.length}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageLimit={pageLimit}
          maxPageNumberLimit={maxPageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
          setMaxPageNumberLimit={setMaxPageNumberLimit}
          setMinPageNumberLimit={setMinPageNumberLimit}
        />
      </div>
    </div>
  );
}
