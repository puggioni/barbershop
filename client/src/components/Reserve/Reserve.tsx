
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { VscArrowLeft } from "react-icons/vsc"
=======
import { VscArrowLeft } from "react-icons/vsc";

import { useNavigate, Link } from "react-router-dom";
import MapView from "./Map/MapView";
import { fetchAllBarbers } from "../slices/barbersSlice";
import { RootState } from "../../app/store";
import Paginate from "../products/Paginate";
import BarberCard from "./BarberCard"

interface barberInterface {
  name: string;
  image: string;
  rating: number;
  office: string;
}



const Reserve = ()=>{
  const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [barbersPerPage] = useState(6);
    const lastPostIndex = currentPage * barbersPerPage;
    const firstPostIndex = lastPostIndex - barbersPerPage;

    function goBack(): void {
      navigate(-1);
    }

      const inicializar = useCallback(async () => {
        dispatch(fetchAllBarbers());
      }, [dispatch]);
    
      useEffect(() => {
        inicializar();
      }, [inicializar]);


      const data = useAppSelector((state: RootState) => state.barbers);
      // const resetPage = () => {
      //   setCurrentPage(1);
      // };
      
    if (data?.allBarbers instanceof Array) {
      const currentBarbers = data.allBarbers.slice(
        firstPostIndex,
        lastPostIndex
      );

      // const cardBarber = "h-52 w-36 text-center rounded-lg font-bold  text-2xl text-black bg-slate-200/50	inline-block m-10"

return (
    <div className=" bg-white bg-store-banner bg-no-repeat pt-52 pb-8">
      <div className="border bg-white border-black rounded-xl mx-40">
        <VscArrowLeft
          onClick={() => goBack()}
          className="ml-12 my-3 h-6 w-6 fill-black"
        />
    <div className="flex flex-col-2 align-center pb-12">
        <div className="flex justify-center min flex justify-center min block mx-12 my-8">
        <MapView />
        </div> 

        <div className=" justify-center min block ml-12">
        <h2 className="flex justify-center mr-auto text-3xl">NUESTRAS SUCURSALES</h2>
        <br />
        <div className="content-none border-b  border-black"></div>
        <br />
        <div className="m-auto">
        <h2 className="flex justify-center m-auto mb-5 mt-10 text-2xl">PALERMO - BUENOS AIRES</h2>
        <div className="content-none border-b w-24 m-auto border-black"></div>
        <h2 className="flex justify-center m-auto mx-5 mt-5 text-2xl">CORDOBA - CAPITAL</h2>
        <br />

        <h2 className="flex justify-center mt-20 text-xl">horario de atención</h2>
        <h2 className="flex justify-center mt-2 align-center text-l">Matutino: 8:00hs a 12:00hs <br />Vespertino: 14:00hs a 18:00hs</h2>
        </div>

        </div>

    </div>
        </div>
        </div>

)
} else {
  return <div>Error</div>;
}

}

export default Reserve

        {/* <h2 className="flex justify-center py-8 text-3xl">BARBEROS</h2>
          
          {currentBarbers?.map((datas: any) => {

                return (
                  <BarberCard
                    name={datas.name}
                    image={datas.image}
                    rating={datas.rating}
                    office={datas.office}
                  />
                );
            })}
        </div>
          <Paginate
            allProducts={data.allBarbers.length}
            productsPerPage={barbersPerPage}
            setCurrentPage={setCurrentPage}
          /> */}
=======
const Reserve = () => {
  let navigate = useNavigate();

  function goBack(): void {
    navigate(-1);
  }

  const cardBarber =
    "h-52 w-36 text-center rounded-lg font-bold  text-2xl text-black bg-slate-200/50	inline-block m-10";

  return (
    <div>
      <VscArrowLeft
        onClick={() => goBack()}
        className="ml-12 my-3 h-6 w-6 fill-white"
      />

      <h2 className="text-center font-bold p-2 text-2xl text-white">
        Seleccione una sucursal para reservar su turno:
      </h2>

      <div className="h-60 w-60 text-center font-bold flex justify-center min text-2xl text-white  bg-gray-800	m-auto">
        Mapa
      </div>

      <div className=" flex justify-center min m-auto">
        <MapView />
      </div>

      <div className=" justify-center min block m-auto">
        <h2 className="text-center font-bold p-2 text-2xl text-white mt-8">
          Barberos mas valorados:
        </h2>

        <div className="flex justify-center min">
          <Link className={cardBarber} to="/reserve/barber">
            <div>Barbero 4.8</div>
          </Link>
          <Link className={cardBarber} to="/reserve/barber">
            <div>Barbero 4.8</div>
          </Link>
          <Link className={cardBarber} to="/reserve/barber">
            <div>Barbero 5.0</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Reserve;

