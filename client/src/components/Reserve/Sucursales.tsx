import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchAllBarbers } from "../slices/barbers";
import { fetchAllOffices } from "../slices/offices";
import MapView from "./Map/MapView";

const Sucursales = () => {
  const dispatch = useAppDispatch();
  const dataOffices = useAppSelector(
    (state: RootState) => state.offices.allOffices
  );

  useEffect(() => {
    dispatch(fetchAllBarbers());
    dispatch(fetchAllOffices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //============================render====================================
  return (
    <div className=" bg-white lg:bg-sucursales-banner bg-no-repeat lg:pt-52 pb-2 bg-cover">
      <div className="border bg-white border-black lg:m-0 m-8 mt-12 rounded-xl lg:mx-40 ">
        <div className="lg:flex lg:flex-col-2 lg:mt-0 mt-4 align-center pb-12 text-center">
          <div className="flex justify-center lg:mx-12 lg:my-8 mx-4">
            <MapView />
          </div>
          <div className=" justify-center block lg:ml-12 lg:mx-0 mx-8 mt-8">
            <h2 className="flex justify-center lg:mr-auto text-3xl">
              NUESTRAS SUCURSALES
            </h2>
            <br />
            <div className="content-none border-b  border-black"></div>
            <br />
            <div className="m-auto">
              {dataOffices?.map((office) => (
                <div key={office._id}>
                  <br />
                  <h1 className="flex justify-center m-auto mb-5 mt-10 text-2xl">
                    {office.location.toUpperCase()}
                  </h1>
                  <div className="content-none border-b w-24 m-auto border-black"></div>
                </div>
              ))}
              <h2 className="flex justify-center mt-20 text-xl">
                horario de atención
              </h2>
              <h1 className="flex justify-center mt-2 align-center ">
                Matutino: 8:00hs a 12:00hs <br />
                Vespertino: 14:00hs a 18:00hs
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sucursales;
