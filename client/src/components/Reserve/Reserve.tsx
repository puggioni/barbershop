import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import MapView from "./Map/MapView";
import BarberCard from "./BarberCard";
import { fetchAllBarbers } from "../slices/barbers";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Calendar from 'react-calendar';

const Reserve = () => {
  const dispatch=useAppDispatch();
  const inicializar = useCallback(async () => {
    dispatch(fetchAllBarbers());}, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const [value, onChange] = useState(new Date());
  const data = useAppSelector((state: RootState) => state.barbers);
  const [turno, setTurno]=useState({});
  
return(
  <div className="flex text-white">
    PEDÍ TU TURNO
    <div >
      <div className=" flex-col"> <br />
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
      <div className=" w-80 bg-white text-black text-center">
      <Calendar onChange={onChange} value={value} />
      </div>
      <select name="" id="">Selecciona Turno
      {}
      </select>
      <select name="" id="">Selecciona Sucursa</select>
      <button>SOLICITAR TURNO</button>
      </div>
    </div>
  </div>
)

};
export default Reserve;



