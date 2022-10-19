import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logIn } from "../slices/logIn";

export default function LoginUser() {
  const [password, setPassword] = useState("");
  const [email, setUserName] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
   
  },[]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logIn(email, password));
    setPassword("");
    setUserName("");
  };

  return (
    <div className="font-sans">
      <Link to={"/"}>
        <h1 className=" ml-8 text-white">Home</h1>
      </Link>
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
        <div className="relative sm:max-w-sm w-full">
          <div className="relative w-full rounded-3xl  px-6 py-4  bg-slate-200/50  shadow-md">
            <label className="block mt-3 text-sm text-700 text-center font-semibold">
              Ingresa
            </label>
            <form method="#" action="#" className="mt-10">
              <div className="mt-7">
                <input
                  type="email"
                  placeholder="Correo electronico"
                  className="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  name="userName"
                  value={email}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="mt-1 pl-4 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </div>

              <div className="mt-7">
                <button
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  onClick={(e) => handleSubmit(e)}
                >
                  Ingresar
                </button>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-600 w-full">
                  Ingresa con
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-7 justify-center w-full">
                <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Facebook
                </button>

                <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Google
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">¿No tienes una cuenta?</label>
                  <Link
                    to={`/user/create`}
                    className=" text-white-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Registrate
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
