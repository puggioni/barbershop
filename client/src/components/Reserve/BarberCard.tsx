import { Link } from "react-router-dom";

interface barberCard {
  name: string;
  image: string;
  rating: number;
  office: string
}



const BarberCard = (barber: barberCard) => {

  return (
    <div className="h-86 border rounded-lg align-center p-3 my-0 border-black">

      <img
        className="h-48 w-48 object-cover bg-white  rounded-xl m-auto mt-2"
        src="https://web-ontime.com/wp-content/uploads/2020/02/19-min.jpg"
        alt="barber-image" />

      <h3 className="font-medium align-center inline-block text-2xl">{barber.name.toUpperCase()}</h3>

      
      <h2 className="text-2xl">{barber.rating} Stars</h2>
    
      <h2 className="mb-4 text-l">Office</h2>

    </div>
  );
};

export default BarberCard;