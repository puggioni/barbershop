import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import MapView from "./Map/MapView";

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
