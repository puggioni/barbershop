import { Link } from "react-router-dom"
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
    dispatch(fetchAllOffices())
  }, [dispatch]);

  useEffect(() => {
    inicializar();
  }, [inicializar]);

  const dataBarbers = useAppSelector((state: RootState) => state.barbers);
  const dataOffices = useAppSelector((state: RootState) => state.offices)


  return (
    <div className="bg-white  block bg-bg-prods pt-80 h-screen mb-10">
      <div className="bg-white block bg-no-repeat align-bottom h-screen pt-10 ">
        <div className="flex flex-col-2 pt-10 h-full">
            <div className="w-2/3  px-28 mt-4 items-center">
              <h1 className=" py-8 mt-20 text-center text-6xl">SOBRE NOSOTROS</h1>
              <p className="font-display text-xl m-10">Con todas las sucursales distribuidas a lo largo del país, formadas por un gran staff de profesionales entrenados con las últimas tendencias en el segmento masculino. Abarcamos tanto un estilo tradicional como asi también barbería moderna. Siendo asi una de las barberias mas reconocidas de Argentina.
              <br />
              <br />
              Conocemos las demandas de nuestros clientes y estamos a la altura de ellos. Brindamos servicios de afeitado, modernos en frío, perfilado de barba y cortes de cabello vanguardistas.
              <br />
              <br />
              Nuestros barberos están listos para proponerte las nuevas tendencias que hoy son de índole mundial.
              <br />
              <br />
              Si estás pensando en lugar que realmente te haga sentir diferente entre la multitud, Henry BarberShop es tu espacio en el mundo.
              
              </p>
            </div>
            <div className="flex m-4 w-1/3">
                <img src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=437&q=80"
                alt="Barbero"
                className="h-5/6"/>
            </div>
        </div>
      </div>


        <div className="place-items-center  bg-zinc-900 block bg-no-repeat align-bottom h-full pt-10" >
        <img className="m-auto h-58" src="https://www.barbershop.cat/img/es/titol_serveis.png" alt="Servicios" />
      <div className="place-items-center  flex flex-col-2 bg-zinc-900 block bg-no-repeat align-bottom   ">
        <div className="text-center w-1/2 text-xl border-r-2 border-white">
            <p className="text-white">Nuestro sistema de reserva, permite asegurar el menor tiempo de espera posible y comodidad en el acceso a los servicios.</p>
            <Link to="/reserve">
              <button className="bg-white px-4 py-1 rounded-lg m-auto my-3 border-r-2 border-b-2 font-display mt-10 border-black
              hover:text-white hover:bg-[#855C20] hover:transition hover:delay-100">RESERVA ACÁ</button>
            </Link>
        </div>
        <div className="my-10 text-center w-1/2 text-xl ">
            <p className="text-white">Descubri nuestro catalogo de productos donde podes conseguir todos los elementos que utilizamos a diario en nuestros locales.</p>
            <Link to="/product">
              <button className="bg-white px-4 py-1 rounded-lg m-auto my-3 border-r-2 border-b-2 font-display mt-10 border-black 
              hover:text-white hover:bg-[#855C20] hover:transition hover:delay-100">NUESTRA TIENDA</button>
            </Link>
        </div>
      </div>
      </div>    
      
    <div className="bg-white block bg-no-repeat align-bottom h-screen pt-10 ">
        <img className="m-auto h-60" src="https://www.barbershop.cat/img/es/titol_barberies.png" alt="Barberias" />

        <div className="py-8 mt-5 font-display text-center text-2xl">
        {dataOffices.allOffices?.map((datas: any) =>(    
          <h1 className="mb-8">{datas.location}</h1>
        ))}
      </div>
        

        <div className="flex justify-center flex-col-3">
            <img className="h-60 flex mx-5" src="https://www.theshaveclub.es/wp-content/uploads/2022/02/IMG_1452-2-scaled.jpg" alt="barber1" />
            <img className="h-60 flex mx-20" src="https://www.baronsbarbershop.com/wp-content/uploads/2020/02/vistares_3_1200x800.jpg" alt="barber2" />
            <img className="h-60  flex mx-5" src="https://cdn.shopify.com/s/files/1/0606/1157/files/1_7_grande.jpg?6443" alt="barber3" />            
        </div>

      </div>

      <div className="bg-zinc-900 block bg-no-repeat align-bottom h-full pt-20 "> 
        <img className="m-auto h-32" src="https://www.barbershop.cat/img/es/titol_horaris.png" alt="Horarios" />
        <h1 className="text-center mt-20 text-2xl font-display text-white">
          LUNES A VIERNES
          <br />
          <br />
          MATUTINO: 8:00hs A 12:00hs
          <br />
          <br />
          VESPERTINO: 14:00hs A 18:00hs</h1>

      </div>

      <div className="bg-white block bg-no-repeat align-bottom h-screen pt-20 "> 
        <img className="m-auto h-60" src="https://www.barbershop.cat/img/es/titol_equip.png" alt="Equipo" />

        <div className="flex my-20 justify-center">
        {dataBarbers.allBarbers?.map((datas: any) =>(
                      
            <div className={`${buttonHover} hover:rounded-lg m-10`}>            
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
)}

export default AboutUs 