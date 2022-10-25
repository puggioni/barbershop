<<<<<<< Updated upstream
=======
import React from "react";
>>>>>>> Stashed changes
import { Link } from "react-router-dom";

interface barberCard {
  name: string;
  image: string;
  rating: number;
  office: string
}

const BarberCard = (barber: barberCard) => {

  return (
    <div
      className=" flex flex-col bg-white items-center max-w-3xl max-h-full    
        justify-items-center rounded-xl hover:outline hover:outline-1	hover:outline-gray-300  m-auto my-3"
    >
      <img
        className=" object-cover bg-white rounded-xl h-full m-0"
        src={barber.image}
        alt="barber-image"
      />

      <h3>{barber.name.toUpperCase()}</h3>

      <Link to={`/reserve/barber`} className="">
        Pedir Turno 
      </Link>

      <h2 className="font-medium text-2xl">{barber.rating}</h2>

      <h2 className="font-medium text-2xl">{barber.office}</h2>

    </div>
  );
};

export default BarberCard;