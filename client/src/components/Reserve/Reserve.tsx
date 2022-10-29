import BarberCard from "./BarberCard";
import { fetchAllBarbers } from "../slices/barbers";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { buttonHover } from "../NavBar";
import { postAppointment } from "../slices/appoinment";
import { fetchAllOffices } from "../slices/offices";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const initialTurn={
  service:"",
  user: JSON.parse(window.localStorage.getItem("user")||'{"_id":""}')._id,
  date:new Date(Date.now()),
  barber:"",
  office:"",
  block:0
}
const selected= "shadow-md hover:shadow-slate-500\tbg-[#855C20] text-white hover:ease-in-out duration-300"

const Reserve = () => {
  const dispatch=useAppDispatch();
  const [turno, setTurno]=useState(initialTurn);

  const inicializar = useCallback(async () => {
    setTurno({...turno,user: JSON.parse(window.localStorage.getItem("user")||'{"_id":""}')._id,});
    dispatch(fetchAllBarbers());
    dispatch(fetchAllOffices());
  }, [dispatch,window.localStorage.getItem("user")]);
    

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const [date, setDate] = useState(new Date(Date.now()));
  const data = useAppSelector((state: RootState) => state.barbers);
  const sucursales = useAppSelector((state: RootState) => state.offices.allOffices);


  const serviceSelect=( e: any)=>{
    e.preventDefault();
    setTurno({...turno,
      [e.target.name]:e.target.value,
      
    });
  }
  const  handleFormTurn=(e:any)=>{
    e.preventDefault()
    if(e.target.name==="office") {
      setTurno({...turno, barber:"",
      [e.target.name]:e.target.value}) 
    }else{
    setTurno({...turno,
      [e.target.name]:e.target.value,})
    };
  }

  const selectBarber=(e:any, barber:any)=>{
    e.preventDefault();
    setTurno({...turno, barber: barber._id})
  }

  const sendTurno=(e: React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    if(!turno.barber||!turno.block||!turno.service||!turno.office)
    {alert("Por favor asegurate de completar todos los campos")}
    else{
      console.log(turno)
      dispatch(postAppointment(turno));
      setTurno(initialTurn);
      setDate(new Date(Date.now()));
    }
    
  }
  
return(
  <div className=" bg-white bg-store-banner justify-center bg-no-repeat pt-32 pb-8">
    {turno.user?<>
    <h2 className="flex justify-center my-auto text-5xl text-white mb-12">PEDI TU TURNO</h2>
    <div className="border bg-white border-black rounded-xl mx-40 my-auto">
    <form onChange={(e)=>handleFormTurn(e)} className="flex items-center place-content-baseline text-black">

    <div className="flex flex-col-3 align-center justify-center pl-36 grow pb-12">
      
     <div className=" justify-center align-center min  border-r border-black pr-12 ">
        <h2 className="flex justify-center my-auto text-2xl text-black pb-12"> SELECCION DEL SERVICIO <br /></h2>
        <div className="m-auto">
        <button 
        name="service"
        value="Corte"
        onClick={(e)=>serviceSelect(e)} 
        className={`${turno.service==="Corte"? selected:""} px-4 py-1 rounded-lg m-auto my-3 border-b border-black`}
        > Corte
        </button> <br />
        <button 
        name="service"
        value="Afeitado"
        onClick={(e)=>serviceSelect(e)} 
        className={`${turno.service==="Afeitado"? selected:""} px-4 py-1 rounded-lg m-auto my-3 border-b border-black`}
        >Afeitado</button> <br />
        <button 
        name="service"
        onClick={(e)=>serviceSelect(e)}
        value="Corte y Afeitado"
        className={`${turno.service==="Corte y Afeitado"? selected:""} px-4 py-1 rounded-lg m-auto my-3 border-b border-black`}
        >Corte y Afeitado</button> <br />
      </div><br />
      <h2 className="flex justify-center my-auto text-2xl text-black pb-10"> SELECCION DEL SUCURSAL </h2>
        
      <select className="inline justify-center p-2  mt-1 py-1 rounded-lg  border border-black" name="office" id="" value={turno.office}>SELECCIONE UNA SUCURSAL:
      <option value="">SELECCIONE UNA SUCURSAL:</option>
      { sucursales?.map(sucursal=>{ 
                   return(
                        <option key={sucursal._id} value={sucursal._id}>{sucursal.location?sucursal.location:"Sucursal X"}</option>
                    )
                })}
      </select>
      </div>
      
    </div>
    <div className="text-center my-auto text-2xl text-black"> SELECCIONE UN BARBER@
    <div className="grid grid-cols-2  gap-4 m-10 mb-5">
    {data.allBarbers?.map((datas: any) => (
      turno.office===datas.office?
      <div onClick={(e)=>selectBarber(e,datas)} 
      className={`${turno.barber===datas._id? selected:""} p-0 m-0 rounded-lg`}>
      <BarberCard
      key={datas.name}
      name={datas.name}
      image={datas.image}
      rating={datas.rating}
      office={datas.office}
      /> 
      </div>:<></>

))}
    </div>
    </div>
    <div className=" justify-center inline-block min mr-12  grow border-l border-black pl-10">
      <div className=" justify-center inline-block min  grow" >
      <h2 className="flex justify-center my-auto text-2xl text-black"> SELECCION DEL HORARIO<br /></h2>
      <br />
      <div className=" w-80 bg-white rounded-lg text-black text-center">
      <Calendar 
      minDate={new Date(Date.now())} 
      onChange={(val:Date) => ( val.getDay()===6||val.getDay()===0? alert("Sin turnos para sabados y domingos"):setDate(val))} 
      value={date} />
      </div>
      {/* <input  className="justify-center justify-center my-auto   text-xl  text-black" type="date" /> */}
      <br />
      <select className="inline justify-center p-2  mt-5 py-1 rounded-lg border border-black" name="block" id="" value={turno.block}>
      <option value={0}>SELECCIONE UN HORARIO:</option>
      <option value={1}>8:00hs</option>
      <option value={2}>9:00hs</option>
      <option value={3}>10:00hs</option>
      <option value={4}>11:00hs</option>
      <option value={5}>14:00hs</option>
      <option value={6}>15:00hs</option>
      <option value={7}>16:00hs</option>
      <option value={8}>17:00hs</option>
      </select>


      
      </div>

      <button type="submit" onClick={(e)=>sendTurno(e)} className={`${buttonHover} px-4 py-1 rounded-lg m-auto mt-10 border-b border-black`}>AGENDAR</button>
    </div>
  </form>
  </div>
</>:<div className="text-white">Necesitas Iniciar sesión para solicitar un Turno</div>}
  </div>
)

};
export default Reserve;



