import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { buttonHover } from "../NavBar";
import { deleteAppointment, getAppointments } from "../slices/appoinment";

const MyAppointments = () => {
  const dispatch = useAppDispatch();
  const turnos = useAppSelector((state: RootState) => state.appointments);
  let navigate = useNavigate();
  const data = turnos.allAppointments;

  useEffect(() => {
    loadTurnos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //========================handlers================================
  const loadTurnos = () => {
    const aux = window.localStorage.getItem("user");
    if (aux) {
      const user = JSON.parse(aux);
      dispatch(getAppointments(user._id));
    } else {
      return (
        <div>
          <h2>Para ver tus turnos debes estár logueado</h2>
        </div>
      );
    }
  };

  const handleDelete = (e: any, id: string) => {
    window.location.reload();
    e.preventDefault();
    dispatch(deleteAppointment(id));
  };

  function goBack(): void {
    navigate(-1);
  }

  //========================render========================
  return (
    <>
      <div className="bg-white bg-sucursales-banner bg-no-repeat lg:pt-40 pt-28 pb-1 bg-cover">
        <div className="s bg-white border-black rounded-xl lg:py-10 lg:mx-40 my-auto">
          <VscArrowLeft
            className=" ml-4 mt-3 h-6 w-6 fill-black"
            onClick={goBack}
          />
          <label htmlFor="" className="flex justify-center py-8 text-5xl">
            MIS TURNOS
          </label>
          <div className="content-none border-b mx-40 border-black"></div>
          <div className="grid grid-cols-6 gap-4 py-2  px-4 mt-8 font-bold rounded-lg text-center lg:mx-4">
            <h2>Oficina</h2>
            <h2>Fecha</h2>
            <h2>Horario</h2>
            <h2>Servicio</h2>
            <h2>Barbero</h2>
          </div>
          {data ? (
            data.map((appo: any) => (
              <div className="grid grid-cols-6 gap-4 py-2  px-4 mt-3 border mb-5 content-center border-black rounded-lg text-center lg:mx-4">
                <p>{appo.office.location}</p>
                <p>{appo.date.slice(0, 10)}</p>
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
            ))
          ) : (
            <div className=" justify-center align-center m-auto ">
              <h2 className="flex justify-center py-12 align-center m-auto text-2xl">
                Aún no hay turnos pendientes...
              </h2>
              <br />
              <Link to="/reserve">
                <button
                  className={`${buttonHover} flex px-4 py-2 rounded-lg text-xl m-auto border-b border-black`}
                >
                  RESERVA ACÁ
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
