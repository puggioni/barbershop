import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import axios from "axios";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { auth } from "../../App";
import { useAppDispatch } from "../../app/hooks";
import logo from "../../imagenes/Logo.png";
import { logIn, checkTwoFa, setTwoFaState } from "../slices/logIn";
import { getFavoritesProducts } from "../slices/productSlice";
import { useSelector } from "react-redux";
const speakeasy = require("speakeasy");

export default function LoginUser() {
  const [password, setPassword] = useState("");
  const [email, setUserName] = useState("");
  const [twofaCode, setTwofaCode] = useState("");
  const [buttonStyle, SetButtonStyle] = useState(
    "bg-[#757575] w-[75%] mt-7 mx-10 justify-self-center py-3 rounded-lg text-white"
  );
  const [showTwoFa, SetshowTwoFa] = useState("visibility: hidden");
  const [emailErr, setEmailErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "{}");

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  function cargarFavs() {
    const aux = window.localStorage.getItem("user");
    const aux2 = window.localStorage.getItem("token");
    const aux3 = window.localStorage.getItem("favoritos");

    if (aux && aux2 && aux3) {
      // esta parte es para traerse los favoritos si el usuario se logueo
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);

      window.localStorage.removeItem("favoritos");
      dispatch(getFavoritesProducts(user._id, token));
    } else if (aux && aux2) {
      const user = JSON.parse(aux);
      const token = JSON.parse(aux2);
      dispatch(getFavoritesProducts(user._id, token));
    }
  }

  //=================handlers===============
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      setEmailErr("*Ingrese email valido");
    } else if (!password) {
      setEmailErr("");
      setPwdErr("*Ingrese contraseña");
    } else {
      dispatch(checkTwoFa(email, password));
    }
  };

  const handleVerify = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    var verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'ascii',
      token: twofaCode
    })
    if (verified) {
      SetshowTwoFa("visibility: hidden");
      dispatch(setTwoFaState({ twofa: false, secret: "" }));
      dispatch(logIn(email, password));
      if (user.name) {
        cargarFavs();
      }
      setEmailErr("");
      setPwdErr("");
      setPassword("");
      setUserName("");
    }
    else {
      alert("Codigo incorrecto");
    }
  };

  const logeado = useSelector((state: any) => state.logIn.logeado);
  const twofa = useSelector((state: any) => state.logIn.twoFaEnabled);
  const secret = useSelector((state: any) => state.logIn.secret);

  useEffect(() => { if (logeado) navigate("/") }, [logeado]);
  useEffect(() => { if (twofa) { SetshowTwoFa("visibility: visible bg-orange-100 p-4 rounded-lg") } }, [twofa]);

  const handleForgotPass = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      setEmailErr("*Ingrese email valido");
    } else {
      alert(
        "Si esta registrado un email de reseteo de contraseña sera enviado a su cuenta"
      );
      setEmailErr("");
      axios(
        `${process.env.REACT_APP_BASE_URL}/users/pwdRst/sendEmail/${email}`
      );
    }
  };

  const handleLogInWithGoogle = async (e: any) => {
    e.preventDefault();
    const response: any = await signInWithPopup(auth, new GoogleAuthProvider());
    cargarFavs();
    dispatch(logIn(response.user.email, response.user.email));
  };

  //=====================render====================================================
  return (
    <div className="bg-white h-[100vh]">
      <div className="z-10 w-[100vw] h-[40vh] bg-[#222222] lg:flex justify-center items-center hidden">
        <label className=" font-bold text-white text-5xl	">Log In</label>
      </div>
      <img className="lg:hidden m-auto h-[10%] mt-8" src={logo} alt="logo" />

      <div className=" lg:-mt-20 mt-6 lg:rounded-none rounded-lg mx-6 border-2 border-[#222222] lg:w-1/4 lg:mx-auto items-center">
        <div className=" w-full rounded-lg px-6 py-4 bg-white ">
          <span className="flex justify-center font-bold mx-[25%] pb-4 border-b text-xl border-b-black">
            Log In
          </span>

          <form className="mt-10">
            <span className="text-red-600 text-sm">{emailErr}</span>
            <input
              type="email"
              placeholder="Correo electronico"
              className="mb-3 border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              name="userName"
              value={email}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <span className="text-red-600 text-sm">{pwdErr}</span>
            <input
              type="password"
              placeholder="Contraseña"
              className=" mb-4 border-2 border-[#222222] pl-4 block w-full bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
                if (emailErr === "" && password.length <= 1) {
                  SetButtonStyle("bg-[#757575]");
                } else {
                  SetButtonStyle(
                    "bg-[#855C20] shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  );
                }
              }}
              value={password}
            />

            <button
              className="cursor-pointer"
              onClick={(e) => handleForgotPass(e)}
            >
              Olvidé mi contraseña
            </button>

            <button
              className={`${buttonStyle} lg:w-[75%] mt-7 mb-3 lg:mx-10 justify-self-center py-3 lg:rounded-lg text-white w-full `}
              onClick={(e) => handleSubmit(e)}>
              Ingresar
            </button>

            <div className={`${showTwoFa}`}>
              <span>2FA habilitado: ingrese su codigo</span>
              <input
                type="text"
                placeholder="2 Factor Authentication Code"
                className="mt-5 border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 appearance-none"
                name="twofa"
                onChange={(event) => {
                  setTwofaCode(event.target.value);
                }}
              />
              <button
                className={`bg-[#7db32d] w-[75%] mx-10 justify-self-center py-3 rounded-lg text-white lg:w-[75%] mt-7 lg:mx-10 justify-self-center py-3 lg:rounded-lg text-white w-full `}
                onClick={(e) => handleVerify(e)}>
                Validar Codigo
              </button>
            </div>

            <div className="flex mt-7 items-center text-center">
              <hr className="border-gray-300 border w-full rounded-md" />
              <label className="block font-medium text-sm text-600 w-full">
                Ingresa con
              </label>
              <hr className="border-gray-300 border w-full rounded-md" />
            </div>

            <div className="flex mt-7 justify-center w-full">
              <button
                onClick={(e) => {
                  handleLogInWithGoogle(e);
                }}
                className="bg-red-500 flex justify-center mx-auto lg:grid lg:justify-self-center w-1/2 col-span-2 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
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
