import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import MapView from "./Map/MapView";
import BarberCard from "./BarberCard";
import { fetchAllBarbers } from "../slices/barbers";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

const Reserve = () => {
  const dispatch=useAppDispatch();
  const inicializar = useCallback(async () => {
    dispatch(fetchAllBarbers());}, [dispatch]);
  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.barbers);

return(
  <div className="flex text-white">
    PEDÍ TU TURNO
    <div >
      <div className=" flex-col">
        Seleccion del servicio
        <button> Corte</button> <br />
        <button>Afeitado</button> <br />
        <button>Corte y Afeitado</button> <br />
      </div>
    </div>
    <div className="text-black">
    {data.allBarbers?.map((datas: any) => (
  <BarberCard
    name={datas.name}
    image={datas.image}
    rating={datas.rating}
    office={datas.office}
  />

))}
    </div>
    <div>
      <div>
      Selecciona tu horario
      <input  className="text-black" type="date" />
      <select name="" id=""></select>
      <select name="" id=""></select>
      </div>
    </div>
  </div>
)

};
export default Reserve;



