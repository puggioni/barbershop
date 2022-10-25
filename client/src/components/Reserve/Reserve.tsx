import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import MapView from "./Map/MapView";
import BarberCard from "./BarberCard";
import { fetchAllBarbers } from "../slices/barbers";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { buttonHover } from "../NavBar";

const Reserve = () => {
  const dispatch=useAppDispatch();
  const inicializar = useCallback(async () => {
    dispatch(fetchAllBarbers());}, [dispatch]);
  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const data = useAppSelector((state: RootState) => state.barbers);

return(
  <div className=" bg-white bg-store-banner justify-center bg-no-repeat pt-32 pb-8">
    <h2 className="flex justify-center my-auto text-5xl text-white mb-12">PEDI TU TURNO</h2>
    <div className="border bg-white border-black rounded-xl mx-40 my-auto">
    <div className="flex items-center place-content-baseline text-black">

    <div className="flex flex-col-3 align-center justify-center pl-36 grow pb-12">
      
     <div className=" justify-center align-center min  border-r border-black pr-12 ">
        <h2 className="flex justify-center my-auto text-2xl text-black pb-12"> SELECCION DEL SERVICIO <br /></h2>
        <div className="m-auto">
        <button className={`${buttonHover} px-4 py-1 rounded-lg m-auto my-3 border-b border-black`}> Corte</button> <br />
        <button className={`${buttonHover} px-4 py-1 rounded-lg m-auto my-3 border-b border-black`}>Afeitado</button> <br />
        <button className={`${buttonHover} px-4 py-1 rounded-lg m-auto my-3 border-b border-black`}>Corte y Afeitado</button> <br />
      </div>
      </div>
    </div>
    <div className="grid grid-cols-2  gap-4 m-10 mb-5">
    {data.allBarbers?.map((datas: any) => (
  <BarberCard
    name={datas.name}
    image={datas.image}
    rating={datas.rating}
    office={datas.office}
  />

))}
    </div>
    <div className=" justify-center inline-block min mr-12 block grow border-l border-black pl-10">
      <div className=" justify-center inline-block min  block grow" >
      <h2 className="flex justify-center my-auto text-2xl text-black"> SELECCION DEL HORARIO<br /></h2>
      <br />
      <input  className="justify-center justify-center my-auto   text-xl  text-black" type="date" />
      <br />
      <select className="inline justify-center p-2  mt-5 py-1 rounded-lg border border-black" name="horario" id="">
      <option value="none">SELECCIONE UN HORARIO:</option>
      <option value="1">8:00hs</option>
      <option value="2">9:00hs</option>
      <option value="3">10:00hs</option>
      <option value="4">11:00hs</option>
      <option value="5">14:00hs</option>
      <option value="6">15:00hs</option>
      <option value="7">16:00hs</option>
      <option value="8">17:00hs</option>
      </select>


      <select className="inline justify-center p-2  mt-5 py-1 rounded-lg  border border-black" name="sucursal" id="">SELECCIONE UNA SUCURSAL:
      <option value="none">SELECCIONE UNA SUCURSAL:</option>
      <option value="baires">Palermo, Buenos Aires</option>
      <option value="cba">Cordoba, Capital</option>
      </select>
      </div>

      <button className={`${buttonHover} px-4 py-1 rounded-lg m-auto mt-10 border-b border-black`}>AGENDAR</button>
    </div>
  </div>
  </div>

  </div>
)

};
export default Reserve;



