import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { createOffice } from "../slices/admin";
import { buttonHover } from "../NavBar";

export interface inputs {
    lat:0;
    long:0;
    location: string;
  }

const CrearOffice = () =>{
    const token = JSON.parse(window.localStorage.getItem("token") || "{}");
    // const navigate = useNavigate();
    const header = useHeaders(token);
    const dispatch = useAppDispatch();
    const [inputs, setInputs] = useState({
        lat:0,
        long:0,
        location: "",
      } as inputs);

    const handleInput = (e: React.ChangeEvent<any>) => {
        e.preventDefault();

        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

      const sendOffice = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!inputs.location || !inputs.lat || !inputs.long ) {
          alert("Por favor asegurate de completar todos los campos");
        } else {
          
          dispatch(createOffice(inputs));

        }
      };


    return (
        <div  className="bg-white bg-admin-banner h-screen bg-no-repeat pt-40 pb-1  bg-contain">
            
          <div className=" -mt-20 border-2 border-[#222222] flex flex-col sm:justify-center w-1/4 mx-auto items-center">
          <div className=" w-full rounded-lg px-6 py-4 bg-white ">
            <div className="my-10">
            <label htmlFor="Location">Ubicación: </label>
            <input
              value={inputs.location}
              type="text"
              name="location"
              onChange={(e) => handleInput(e)}
              className="rounded-lg border border-black bg-white/70 pl-4"
              placeholder="Ubicación"
            />
          </div>
            <div className="my-10">
            <label htmlFor="Latitud">Latitud: </label>
            <input
              value={inputs.lat}
              type="number"
              name="lat"
              onChange={(e) => handleInput(e)}
              className="rounded-lg border border-black bg-white/70 pl-4"
              placeholder="lat"
            />
          </div>
            <div className="my-10">
            <label htmlFor="Longitud">Longitud: </label>
            <input
              value={inputs.long}
              type="number"
              name="long"
              onChange={(e) => handleInput(e)}
              className="rounded-lg border border-black bg-white/70 pl-4"
              placeholder="long"
            />
            </div>
            <button
                  type="submit"
                  onClick={(e) => sendOffice(e)}
                  className={`${buttonHover} px-4 py-1 m-auto rounded-lg mt-10 border-b border-black`}
                >
                  AGENDAR
                </button>
          </div>
          </div>

        </div>
    )









}

export default CrearOffice