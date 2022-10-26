import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logIn } from "../slices/logIn";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getFavoritesProducts } from "../slices/productSlice";
export default function LoginUser() {
  const [password, setPassword] = useState("");
  const [email, setUserName] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  const auth = getAuth();
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logIn(email, password));
    console.log(user);

    if (user.name) {
      cargarFavs();
    }

    setPassword("");
    setUserName("");
    navigate("/");
  };

  const handleLogInWithGoogle = async (e: any) => {
    e.preventDefault();

    const response: any = await signInWithPopup(auth, new GoogleAuthProvider());
    cargarFavs();
    navigate("/");
    dispatch(logIn(response.user.email, response.user.email));
  };
  let string = "Log In" + email + password;
  console.log(string);

  function cargarFavs() {
    const aux = window.localStorage.getItem("user");
    const aux2 = window.localStorage.getItem("token");
    const aux3 = window.localStorage.getItem("favoritos");

    if (aux && aux2 && aux3) {
      // esta parte es para traerse los favoritos si el usuario se logueo
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      const favoritos = JSON.parse(aux3);

      window.localStorage.removeItem("favoritos");
      dispatch(getFavoritesProducts(user._id, token));
    } else if (aux && aux2) {
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      dispatch(getFavoritesProducts(user._id, token));
    }
  }

  return (
    <div className="bg-white h-[100vh]">
      <div className="z-10 w-[100vw] h-[40vh] bg-[#222222] flex justify-center items-center">
        <label className=" font-bold text-white text-5xl	">Log In</label>
      </div>

      <div className=" -mt-20 border-2 border-[#222222] flex flex-col sm:justify-center w-1/4 mx-auto items-center">
        <div className=" w-full rounded-lg px-6 py-4 bg-white ">
          <form className="mt-10">
            <input
              type="email"
              placeholder="Correo electronico"
              className="mt-7 border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              name="userName"
              value={email}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />

            <input
              type="password"
              placeholder="Contraseña"
              className=" mt-7 border-2 border-[#222222] pl-4 block w-full bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />

            <button
              className="bg-[#855C20] w-[75%] mt-7 mx-10 justify-self-center py-3 rounded-lg text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              onClick={(e) => handleSubmit(e)}
            >
              Ingresar
            </button>

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

              <button
                onClick={(e) => {
                  handleLogInWithGoogle(e);
                }}
                className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              >
                Google
              </button>
            </div>
            <div className="flex justify-center items-center mt-7">
              <label className="mr-2">¿No tienes una cuenta?</label>
              <Link
                to={`/user/create`}
                className=" text-white-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              >
                Registrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
