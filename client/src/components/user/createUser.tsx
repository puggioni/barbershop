import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import logo from "../../imagenes/Logo.png";
import { logUp } from "../slices/logIn";

export default function CreateUser() {
  const dispatch = useAppDispatch();
  const initialFormUser = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    repassword: "",
  };

  const initialWarnToPrint = {
    name: "*El nombre es obligatorio",
    lastname: "*Apellidos son obligatorios",
    email: "*Email obligatorio",
    password:
      "La contraseña debe tener números y letras y mínimo de 6 caracteres",
    phone_number: "",
    repassword: "",
  };

  const [formUser, setFormUser] = useState(initialFormUser);
  const [warnToPrint, setWarnToPrint] = useState(initialWarnToPrint);

  const auth = getAuth();

  //===============================handlers===================================

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    const response = await signInWithPopup(auth, new GoogleAuthProvider());
    const datos = {
      name: response.user.displayName,
      email: response.user.email,
      password: response.user.email,
      phone_number: response.user.phoneNumber,
      image: response.user.photoURL,
    };
    dispatch(logUp(datos));
  };
  function handleSubmit(
    e:
      | React.FormEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (
      warnToPrint.name ||
      warnToPrint.lastname ||
      warnToPrint.email ||
      warnToPrint.password ||
      warnToPrint.phone_number ||
      warnToPrint.repassword
    ) {
      alert(
        "Por favor asegurese que los campos requeridos esten llenos correctamente"
      );
    } else {
      dispatch(logUp(formUser));
      setFormUser(initialFormUser);
      setWarnToPrint(initialWarnToPrint);
    }
  }
  function loadForm(e: any) {
    if (e.target.name && typeof e.target.value === "string") {
      setFormUser({
        ...formUser,
        [e.target.name]: e.target.value,
      });
    }

    switch (e.target.name) {
      case "name":
        if (!/^[A-Za-z\s]+$/g.test(e.target.value)) {
          setWarnToPrint({
            ...warnToPrint,
            name: "*No debe tener Caracteres especiales ni números",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, name: "" });
        }
        break;
      case "lastname":
        if (!/^[A-Za-z\s]+$/g.test(e.target.value)) {
          setWarnToPrint({
            ...warnToPrint,
            lastname: "*No debe tener Caracteres especiales ni números",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, lastname: "" });
        }
        break;
      case "email":
        if (
          !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(e.target.value)
        ) {
          setWarnToPrint({
            ...warnToPrint,
            email: "*Debe ser un correo eletrónico valido",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, email: "" });
        }
        break;
      case "phone_number":
        if (
          !/^[0-9\s]+$/g.test(e.target.value) ||
          e.target.value.length !== 10
        ) {
          setWarnToPrint({
            ...warnToPrint,
            phone_number:
              "*Solo números son admitidos con un tamaño de 10 dígitos",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, phone_number: "" });
        }
        break;
      case "password":
        if (!/^[A-Za-z]*[0-9][a-z0-9]*$/.test(e.target.value)) {
          setWarnToPrint({
            ...warnToPrint,
            password: "*Debe tener letras y números",
          });
        } else if (e.target.value.length < 6 || e.target.value.length > 12) {
          setWarnToPrint({
            ...warnToPrint,
            password: "*Debe tener mas de 6 y menos de 12 digitos",
          });
        } else if (formUser.repassword !== e.target.value) {
          setWarnToPrint({
            ...warnToPrint,
            repassword: "*Las contraseñas deben ser iguales",
            password: "",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, password: "", repassword: "" });
        }
        break;
      case "repassword":
        if (formUser.password !== e.target.value) {
          setWarnToPrint({
            ...warnToPrint,
            repassword: "*Las contraseñas deben ser iguales",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, repassword: "" });
        }
        break;

      default:
        break;
    }
  }

  //======================================render===========================================
  return (
    <div className="bg-white">
      <div className="z-1 w-[100vw] h-[40vh] bg-[#222222] lg:flex hidden justify-center items-center">
        <label className=" font-bold text-white text-5xl	">Sign Up</label>
      </div>
      <img className="lg:hidden m-auto h-[10%] mt-8" src={logo} alt="logo" />

      <div className="lg:-mt-20 mt-6 border-2 border-[#222222] lg:w-1/2 lg:mx-auto mx-6 items-center lg:rounded-none rounded-lg">
        <div className=" w-full rounded-lg px-6 py-4 bg-white">
          <span className="flex justify-center font-bold mx-[25%] pb-4 border-b text-xl border-b-black">
            Sign up
          </span>
          <form
            name="form"
            onChange={loadForm}
            className="lg:grid grid-cols-2 gap-8 mt-10"
          >
            <div>
              <input
                value={formUser.name}
                name="name"
                type="text"
                placeholder="Nombre"
                className=" border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {!warnToPrint.name ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.name}
                </span>
              )}
            </div>

            <div className="">
              <input
                value={formUser.lastname}
                name="lastname"
                type="text"
                placeholder="Apellidos"
                className=" border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {!warnToPrint.lastname ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.lastname}
                </span>
              )}
            </div>

            <div className="">
              <input
                value={formUser.email}
                name="email"
                type="email"
                placeholder="Correo electronico"
                className=" border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {!warnToPrint.email ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.email}
                </span>
              )}
            </div>

            <div className="">
              <input
                value={formUser.phone_number}
                name="phone_number"
                type="number"
                placeholder="Número telefónico"
                className=" border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {!warnToPrint.phone_number ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.phone_number}
                </span>
              )}
            </div>

            <div className="">
              <input
                value={formUser.password}
                name="password"
                type="password"
                placeholder="Contraseña"
                className="lg:mt-0 mt-6 border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />

              {!warnToPrint.password ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.password}
                </span>
              )}
            </div>

            <div className="">
              <input
                value={formUser.repassword}
                name="repassword"
                type="password"
                placeholder="Confirmar contraseña"
                className=" border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {!warnToPrint.repassword ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.repassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              onClick={(event: any) => {
                handleSubmit(event);
              }}
              className=" col-span-2 bg-[#855C20] lg:w-[75%] w-full lg:mt-0 mt-6 lg:mx-10 justify-self-center py-3 lg:rounded-lg text-white shadow-xl focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
            >
              Registrar
            </button>

            <div className="col-span-2 lg:flex lg:my-0 my-8 items-center text-center">
              <hr className="border-gray-300 border-1 w-full rounded-md" />
              <label className="block font-medium text-sm text-600 w-full">
                Registrate con
              </label>
              <hr className="border-gray-300 border-1 w-full rounded-md" />
            </div>

            <button
              onClick={(e) => handleGoogleSignIn(e)}
              className="bg-red-500 flex justify-center mx-auto lg:grid lg:justify-self-center w-1/2 col-span-2 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
            >
              Google
            </button>

            <div className="col-span-2  flex justify-center items-center">
              <label className="mr-2">¿Ya tienes una cuenta?</label>
              <Link
                to={"/user/login"}
                className=" text-white-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              >
                Iniciar sesion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
