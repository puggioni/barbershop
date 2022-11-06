import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchAllBarbers } from "./slices/barbers";
import { useEffect } from "react";
import BarberCard from "./Reserve/BarberCard";
import { buttonHover } from "./NavBar";
import Footer from "./Footer";
import { fetchAllOffices } from "./slices/offices";

const AboutUs = () => {
  const dispatch = useAppDispatch();




  const inicializar = useCallback(async () => {
    dispatch(fetchAllBarbers());
    dispatch(fetchAllOffices());
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const dataBarbers = useAppSelector((state: RootState) => state.barbers);
  const dataOffices = useAppSelector((state: RootState) => state.offices);

  return (
    <div className="bg-white  lg:bg-bg-prods lg:pt-80">
      <div className="bg-white bg-contain block bg-no-repeat align-bottom p-2 border-t-2 border-black pt-10 ">
        <div className="lg:flex lg:flex-col-2 lg:pt-10 ">
          <div className="lg:w-2/3  lg:px-28 lg:text-center text-center m-auto p-2">
            <h1 className=" py-8 mt-20 text-center text-6xl">SOBRE NOSOTROS</h1>
            <p className="font-display text-xl m-10 text-center">
              Con todas las sucursales distribuidas a lo largo del país,
              formadas por un gran staff de profesionales entrenados con las
              últimas tendencias en el segmento masculino. Abarcamos tanto un
              estilo tradicional como asi también barbería moderna. Siendo asi
              una de las barberias mas reconocidas de Argentina.
              <br />
              Conocemos las demandas de nuestros clientes y estamos a la altura
              de ellos. Brindamos servicios de afeitado, modernos en frío,
              perfilado de barba y cortes de cabello vanguardistas.
              <br />
              <br />
              Nuestros barberos están listos para proponerte las nuevas
              tendencias que hoy son de índole mundial.
              <br />
              <br />
              Si estás pensando en lugar que realmente te haga sentir diferente
              entre la multitud, Henry BarberShop es tu espacio en el mundo.Si estás pensando en lugar que realmente te haga sentir diferente
              entre la multitud, Henry BarberShop es tu espacio en el mundo.
            </p>
          </div>
        </div>
      </div>
      <div className="place-items-center  bg-zinc-900 block bg-no-repeat align-bottom h-full pt-10">
        <img
          className="m-auto h-52"
          src="https://www.barbershop.cat/img/es/titol_serveis.png"
          alt="Servicios"
        />
        <div className="place-items-center  lg:flex lg:flex-col-2 bg-zinc-900 bg-no-repeat align-bottom  m-10 py-4">
          <div className="text-center lg:w-1/2 text-xl lg:border-r-2  p-3 border-white">
            <p className="text-white">
              Nuestro sistema de reserva, permite asegurar el menor tiempo de
              espera posible y comodidad en el acceso a los servicios.
            </p>
            <Link to="/reserve">
              <button
                className="bg-white px-4 py-1 rounded-lg m-auto my-3 border-r-2 border-b-2 font-display mt-10 border-black
              hover:text-white hover:bg-[#855C20] hover:transition hover:delay-100"
              >
                RESERVA ACÁ
              </button>
            </Link>
          </div>
          <div className="my-10 text-center lg:w-1/2 text-xl ">
            <p className="text-white">
              Descubri nuestro catalogo de productos donde podes conseguir todos
              los elementos que utilizamos a diario en nuestros locales.
            </p>
            <Link to="/product">
              <button
                className="bg-white px-4 py-1 rounded-lg m-auto my-3 border-r-2 border-b-2 font-display mt-10 border-black 
              hover:text-white hover:bg-[#855C20] hover:transition hover:delay-100"
              >
                NUESTRA TIENDA
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white block bg-no-repeat align-bottom bg-contain p-10  ">
        <img
          className="m-auto h-60"
          src="https://www.barbershop.cat/img/es/titol_barberies.png"
          alt="Barberias"
        />
        <div className="py-8 mt-5 font-display text-center text-2xl">
          {dataOffices.allOffices?.map((datas: any) => (
            <h1 className="mb-8">{datas.location}</h1>
          ))}
        </div>

        <div>
              <img
            className="h-60 m-auto"
            src="https://www.theshaveclub.es/wp-content/uploads/2022/02/IMG_1452-2-scaled.jpg"
            alt="barber1"
              />   
        </div>
      </div>
      <div className="bg-zinc-900 block bg-no-repeat align-bottom bg-contain p-10 pt-20 ">
        <img
          className="m-auto h-32"
          src="https://www.barbershop.cat/img/es/titol_horaris.png"
          alt="Horarios"
        />
        <h1 className="text-center mt-20 text-2xl font-display text-white">
          LUNES A VIERNES
          <br />
          <br />
          MATUTINO: 8:00hs A 12:00hs
          <br />
          <br />
          VESPERTINO: 14:00hs A 18:00hs
        </h1>
      </div>
      <div className="bg-white block bg-no-repeat align-bottom bg-contain p-10  pt-20 ">
        <img
          className="m-auto h-60"
          src="https://www.barbershop.cat/img/es/titol_equip.png"
          alt="Equipo"
        />
        <div className="grid grid-cols-2 my-10 justify-center m-auto lg:flex">
          {dataBarbers.allBarbers?.map((datas: any) => (
            <div className={`h-50 w-40 m-auto hover:rounded-lg my-5`}>
              <BarberCard
                key={datas.name}
                name={datas.name}
                image={datas.image}
                rating={datas.rating}
                office={datas.office}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
