import React from "react";
import { Link } from "react-router-dom";
import Products from "./Products";

const buttonStyle =
  "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black";

const Home = () => {
  return (
    <div className=" h-screen text-white">
      <button className="absolute top-0 right-0 m-4 ">Log In/Sign Up</button>
      <div className="flex flex-col gap-y-10 font-semibold translate-y-1/2">
        <h1 className="my-auto text-5xl text-center ">
          Henry Barber <br />
          Shop
        </h1>
        <Link className={buttonStyle} to="/product">
          Store
        </Link>
        <button className={buttonStyle}>Pedí Tu Turno</button>
        <button className={buttonStyle}>Conocenos</button>
      </div>
    </div>
  );
};

export default Home;
