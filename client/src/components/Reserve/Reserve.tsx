import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { buttonHover } from "../NavBar";
import { postAppointment } from "../slices/appoinment";
import { fetchAllBarbers } from "../slices/barbers";
import { yaLog } from "../slices/logIn";
import { fetchAllOffices } from "../slices/offices";
import BarberCard from "./BarberCard";

const initialTurn = {
  service: "",

  date: new Date(Date.now()),
  barber: "",
  office: "",
  block: 0,
};
const selected = "bg-black text-white hover:ease-in-out duration-300";

const Reserve = () => {
  const dispatch = useAppDispatch();
  const [turno, setTurno] = useState(initialTurn);
  const [user, setUser]=JSON.parse(window.localStorage.getItem("user") || "{}");

  useEffect(() => {
    if(user)dispatch(yaLog(user.email));
    dispatch(fetchAllBarbers());
    dispatch(fetchAllOffices());
    setUser(JSON.parse(window.localStorage.getItem("user") || "{}"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [date, setDate] = useState(new Date(Date.now()));
  const data = useAppSelector((state: RootState) => state.barbers);
  const sucursales = useAppSelector(
    (state: RootState) => state.offices.allOffices
  );

  //========================handlers===========================
  const serviceSelect = (e: any) => {
    e.preventDefault();
    setTurno({ ...turno, [e.target.name]: e.target.value });
  };
  const handleFormTurn = (e: any) => {
    e.preventDefault();
    if (e.target.name === "office") {
      setTurno({ ...turno, barber: "", [e.target.name]: e.target.value });
    } else {
      setTurno({ ...turno, [e.target.name]: e.target.value });
    }
  };

  const putDate = (date: Date) => {
    setDate(date);
    setTurno({ ...turno, date: date });
  };

  const selectBarber = (e: any, barber: any) => {
    e.preventDefault();
    setTurno({ ...turno, barber: barber._id });
  };

  const sendTurno = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!turno.barber || !turno.block || !turno.service || !turno.office) {
      alert("Por favor asegurate de completar todos los campos");
    } else {
      dispatch(postAppointment(turno));
      setTurno(initialTurn);
      setDate(new Date(Date.now()));
    }
  };

  //==============================0render==============================
  return (
    <div className="lg:bg-white lg:bg-turnos-banner bg-no-repeat lg:pt-32 pb-20 bg-cover min-h-screen align-items- ">
      {user.email? (
        <>
          <h2 className="flex  justify-center my-auto text-5xl text-white mb-12">
            PEDI TU TURNO
          </h2>
          <div className="lg:border bg-white border-black rounded-xl py-10 lg:mx-40 my-auto">
            <form
              onChange={(e) => handleFormTurn(e)}
              className="lg:flex items-center place-content-baseline text-black"
            >
              <div className="flex flex-col-3 align-center justify-center lg:pl-8 grow pb-12">
                <div className=" justify-center align-center min  lg:border-r  border-black lg:pr-12 ">
                  <h2 className="flex justify-center my-auto lg:text-2xl text-xl text-black lg:pb-10 pb-5 ">
                    SELECCION DEL SERVICIO <br />
                  </h2>
                  <div className="m-auto border-b border-black  flex align-center">
                    <button
                      name="service"
                      value="Corte"
                      onClick={(e) => serviceSelect(e)}
                      className={`${
                        turno.service === "Corte" ? selected : ""
                      }  px-4 py-1  m-auto my-3 text-black bg-white border border-black`}
                    >
                      Corte
                    </button>
                    <br />
                    <button
                      name="service"
                      value="Afeitado"
                      onClick={(e) => serviceSelect(e)}
                      className={`${
                        turno.service === "Afeitado" ? selected : ""
                      } px-4 py-1 mx-3 m-auto my-3 bg-white border border-black`}
                    >
                      Afeitado
                    </button>
                    <br />
                    <button
                      name="service"
                      onClick={(e) => serviceSelect(e)}
                      value="Corte y Afeitado"
                      className={`${
                        turno.service === "Corte y Afeitado" ? selected : ""
                      } px-4 py-1  m-auto my-3 bg-white border border-black`}
                    >
                      Corte y Afeitado
                    </button>
                    <br />
                  </div>
                  <br />
                  <h2 className="flex justify-center my-auto lg:text-2xl text-xl text-black lg:pb-10 pb-5">
                    SELECCION DEL SUCURSAL
                  </h2>
                  <select
                    className="lg:inline lg:justify-center lg:p-2  lg:mt-1 lg:py-1 rounded-lg  border border-black ml-14"
                    name="office"
                    id=""
                    value={turno.office}
                  >
                    SELECCIONE UNA SUCURSAL:
                    <option value="">SELECCIONE UNA SUCURSAL:</option>
                    {sucursales?.map((sucursal) => {
                      return (
                        <option key={sucursal._id} value={sucursal._id}>
                          {sucursal.location ? sucursal.location : "Sucursal X"}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="text-center my-auto lg:mr-10 text-2xl text-black">
                <h2 className="flex justify-center my-auto lg:text-2xl text-xl text-black lg:pb-10 pb-5">
                  SELECCIONE UN BARBER@{" "}
                </h2>
                <div className="grid grid-cols-2  gap-4 m-10 mb-5">
                  {data.allBarbers?.map((datas: any) =>
                    turno.office === datas.office ? (
                      <div
                        onClick={(e) => selectBarber(e, datas)}
                        className={`${
                          turno.barber === datas._id ? selected : ""
                        } p-0 m-0 `}
                      >
                        <BarberCard
                          key={datas.name}
                          name={datas.name}
                          image={datas.image}
                          rating={datas.rating}
                          office={datas.office}
                        />
                      </div>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>
              <div className=" justify-center inline-block min lg:mr-12 pt-5 grow border-l border-black lg:pl-10 pl-1">
                <div className=" justify-center inline-block min  grow">
                  <h2 className="flex justify-center my-auto text-2xl text-black">
                    SELECCION DEL HORARIO
                    <br />
                  </h2>
                  <br />
                  <div className=" w-80 bg-white border border-black p-4 pt-2 rounded-lg text-black text-center">
                    <Calendar
                      minDate={new Date(Date.now())}
                      onChange={(val: Date) =>
                        val.getDay() === 6 || val.getDay() === 0
                          ? alert("Sin turnos para sabados y domingos")
                          : putDate(val)
                      }
                      value={date}
                    />
                  </div>
                  {/* <input  className="justify-center justify-center my-auto   text-xl  text-black" type="date" /> */}
                  <br />
                  <select
                    className="lg:inline justify-center lg:p-2 ml-10 lg:mt-5 py-1 rounded-lg border border-black"
                    name="block"
                    id=""
                    value={turno.block}
                  >
                    <option value="0">SELECCIONE UN HORARIO:</option>
                    <option value="1">8:00hs</option>
                    <option value="2">9:00hs</option>
                    <option value="3">10:00hs</option>
                    <option value="4">11:00hs</option>
                    <option value="5">14:00hs</option>
                    <option value="6">15:00hs</option>
                    <option value="7">16:00hs</option>
                    <option value="8">17:00hs</option>
                  </select>
                </div>

                <br />
                <button
                  type="submit"
                  onClick={(e) => sendTurno(e)}
                  className={`${buttonHover} px-4 py-1  m-auto mt-10 bg-white border border-black`}
                >
                  AGENDAR
                </button>
                <br />
                <Link to="/reserve/barber">
                  <button
                    className={`${buttonHover} px-4 py-1  m-auto mt-5 bg-white border border-black`}
                  >
                    MIS TURNOS
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="border h-86 bg-white border-black rounded-xl py-10 mx-40 my-auto">
          <h2 className="text-center text-xl text-red-500 font-bold">
            *Necesitas iniciar sesión para solicitar un Turno*
          </h2>
        </div>
      )}
    </div>
  );
};
export default Reserve;
