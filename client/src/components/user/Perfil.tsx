import { Link } from "react-router-dom";
// import { FaEdit} from "react-icons/fa";
// import { useState } from "react";

const Perfil = () => {
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  // const adminAuth = user.role[0].name === "admin" ? true : false;
  // const [iputsStates, setStateInputs]=useState({name:true})

  const img = user?.user_image.length
    ? user.user_image
    : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

  return (
    <div className=" bg-white h-[100vh] justify-center bg-no-repeat ">
      <div className="z-10 w-[100vw] h-[30vh] bg-[#222222] flex justify-center items-center"></div>

      <Link className=" text-white" to="/">
        Home
      </Link>
      <div>
        <div className=" -mt-40  md:p-10 border bg-white border-black rounded-xl h-full md:mx-40 my-auto">
          <div className="flex md:flex-row flex-col ">
            <div className=" grid  justify-items-stretch ">
              <img
                className="border border-black rounded-xl w-1/2 justify-self-center"
                src={img}
                alt="user pic"
              />
              <p className="justify-self-center font-bold">{user.email}</p>
            </div>

            <div className="grid justify-items-stretch md:w-2/3">
              <div className="border border-black rounded-xl w-full justify-self-center p-5">
                <h1 className=" text-center font-bold text-lg">
                  DATOS DE LA CUENTA
                </h1>
                <div className="w-5/6  justify-items-stretch">
                  <div className=" flex mt-5">
                    <label className="rounded-lg bg-red-100 mr-5 w-1/2 text-left p-1">
                      {user.name}
                    </label>
                    <label className="rounded-lg bg-red-100 w-1/2 text-left p-1">
                      {user.lastname}
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="rounded-lg bg-red-100 w-2/3 text-left p-1">
                      {user.email}{" "}
                    </label>
                  </div>

                  <div className="mt-4 mb-10">
                    <label className="rounded-lg bg-red-100 w-2/3 text-left p-1 ">
                      Tel. {user.phone_number}{" "}
                    </label>
                  </div>

                  <button>Cambiar Contraseña</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <p>Ver mis compras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
