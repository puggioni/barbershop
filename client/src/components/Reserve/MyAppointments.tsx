import { useCallback, useEffect } from "react";
import { VscArrowLeft } from "react-icons/vsc"
import { useNavigate } from "react-router";
import { getAppointments, deleteAppointment } from "../slices/appoinment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {FaTrashAlt} from "react-icons/fa"
import useHeaders from "../../app/header";
import { Link } from "react-router-dom";
import { buttonHover } from "../NavBar";

 const MyAppointments = ()=>{
     const dispatch = useAppDispatch();
     const turnos =  useAppSelector((state: RootState) => state.appointments)
      let navigate = useNavigate();
     const data = turnos.allAppointments
     console.log(data)
    const userDelete = JSON.parse(window.localStorage.getItem("user") || "{}");
    const header = useHeaders(userDelete);

    const loadTurnos =()=>{
        const aux=window.localStorage.getItem("user")
    if (aux){
        const user=JSON.parse(aux);
    dispatch(getAppointments(user._id)); 
    } else {
        return (
          <div>
            <h2>Para ver tus turnos debes estár logueado</h2>
          </div>
        )
    }
    }


    const inicializar = useCallback(async () => {
        loadTurnos();
        }, [dispatch]);

        useEffect(() => {
            inicializar();
            return () => {};
          }, [dispatch, inicializar]);


          const handleDelete = (e: any, id: string) => {
            window.location.reload()
            e.preventDefault();
            dispatch(deleteAppointment(id));
          };
 
    function goBack(): void {
      navigate(-1);
    }


    return(
        <> 
            <div className="bg-white bg-sucursales-banner h-screen bg-no-repeat pt-40 pb-1  bg-contain">

            <div className="border bg-white border-black rounded-xl py-10 mx-40 my-auto">
            <VscArrowLeft className=" ml-4 mt-3 h-6 w-6 fill-black"
                onClick={goBack}
            />
            <label htmlFor="" className="flex justify-center py-8 text-5xl">
            MIS TURNOS
          </label>
            <div className="content-none border-b mx-40 border-black"></div>
            <div className="grid grid-cols-7 gap-4 py-2  px-4 mt-8 font-bold rounded-lg text-center">
            <h2>Email</h2>
            <h2>Oficina</h2>
            <h2>Fecha</h2>
            <h2>Horario</h2>
            <h2>Servicio</h2>
            <h2>Barbero</h2>
            </div>
            { 
                    data?  data.map((appo : any) => (

            <div className="grid grid-cols-7 gap-4 py-2  px-4 mt-3 border mb-5 border-black rounded-lg text-center">
                    <p>{appo.user.email}</p>
                    <p>{appo.office.location}</p>
                    <p>{appo.date.slice(0,10)}</p>
                    <p>{appo.block}</p>
                    <p>{appo.service}</p>
                    <p>{appo.barber.name}</p>
                    <FaTrashAlt
                      className="justify-self-center cursor-pointer "
                      title="Eliminar turno"
                      onClick={(e) => {
                        handleDelete(e, appo._id);
                      }}
                    />
                    
                   </div> 
                      )) : <div className=" justify-center align-center m-auto ">
                      <h2 className="flex justify-center py-12 align-center m-auto text-2xl">Aún no hay turnos pendientes...</h2>
                      <br />
                      <Link to="/reserve"> 
                        <button className={`${buttonHover} flex px-4 py-2 rounded-lg text-xl m-auto border-b border-black`}>RESERVA ACÁ</button>
                      </Link>
                    </div>
                    }
    
            </div>
            </div>
       </>
     )
}
                    
export default MyAppointments



