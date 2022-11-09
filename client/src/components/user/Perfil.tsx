import { Link } from "react-router-dom";
// import { FaEdit} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../App";
import useHeaders from "../../app/header";
import { useAppDispatch } from "../../app/hooks";
import { updateUser } from "../slices/logIn";
const qrcode = require('qrcode');
const speakeasy = require("speakeasy");

const Perfil = () => {
  let user: any = JSON.parse(window.localStorage.getItem("user") || "{}");
  const token: string = JSON.parse(window.localStorage.getItem("token") || "");
  const dispatch = useAppDispatch();
  const header = useHeaders(token);
  const [formUser, setFormUser] = useState(user);
  const [enabledTwoFA, setEnabledTwoFA] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [showTwoFa, SetshowTwoFa] = useState("visibility: hidden");
  const [twofaCode, setTwofaCode] = useState("");
  const [stateSecret, setStateSecret] = useState("");
  const img: any =
    auth.currentUser !== null
      ? auth.currentUser.photoURL
      : "https://media.istockphoto.com/vectors/black-hipster-vector-mustache-vector-id485318064?k=20&m=485318064&s=170667a&w=0&h=krFPiCXz9kaEOS3gmFxGwYSOzTIxgOXqos7hEELiaTY=";

  useEffect(() => {
    formUser.twofa ? setEnabledTwoFA("habilitado") : setEnabledTwoFA("deshabilitado");
  }, [formUser]);

  //==================================handlers==================================
  const handleVerify = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    var verified = speakeasy.totp.verify({
      secret: stateSecret,
      encoding: 'ascii',
      token: twofaCode
    })
    if(verified){
      formUser.twofa = true;
      formUser.secret = stateSecret;
      dispatch(updateUser(user._id, formUser, header));
      setEnabledTwoFA("habilitado");
      SetshowTwoFa("visibility: hidden");
    }
    else{
      alert("Codigo incorrecto");
    }
  };
  function fillFormUser(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  }
  function submitUserInfo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(updateUser(user._id, formUser, header));
  }
  function showQrCode(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if(enabledTwoFA === "deshabilitado"){
      var secret = speakeasy.generateSecret({ name : "barbershop" });
      setStateSecret(secret.ascii);
      qrcode.toDataURL(secret.otpauth_url, (err: any, data: any) => setQrCodeSrc(data));
      SetshowTwoFa("visibility: visible");
    }
    else{
      formUser.twofa = false;
      dispatch(updateUser(user._id, formUser, header));
      setEnabledTwoFA("deshabilitado");
    }
  }
  //=======================render=============================
  return (
    <div className=" bg-white h-[100vh] justify-center bg-no-repeat ">
      <div className="lg:flex w-[100vw] h-[30vh] bg-[#222222] justify-center hidden"></div>
      <div>
        <div className=" lg:-mt-40 mt-0 lg:p-10 lg:border bg-white border-black rounded-xl h-full md:mx-40 my-auto">
          <div className="flex lg:flex-row flex-col lg:mt-0 mt-8">
            <div className=" grid  justify-items-stretch ">
              <img
                className="border border-black rounded-xl w-1/2 justify-self-center"
                src={img}
                alt="user pic"
              />
              <p className="justify-self-center font-bold">{formUser.email}</p>
            </div>

            <div className="grid justify-items-stretch lg:w-2/3">
              <div className="border border-black rounded-xl w-full justify-self-center p-5">
                <h1 className=" text-center font-bold text-lg">
                  DATOS DE LA CUENTA
                </h1>
                <div className="w-5/6  justify-items-stretch">
                  <div className=" flex mt-5">
                    <input
                      type="text"
                      value={formUser.name}
                      className="rounded-lg bg-red-100 mr-5 w-1/2 text-left p-1"
                      placeholder="Nombre"
                      name="name"
                      onChange={(e) => fillFormUser(e)}
                    />
                    <input
                      type="text"
                      value={formUser.lastname}
                      className="rounded-lg bg-red-100 mr-5 w-1/2 text-left p-1 "
                      placeholder="Apellido"
                      name="lastname"
                      onChange={(e) => fillFormUser(e)}
                    />
                  </div>

                  <div className="mt-4">
                    <input
                      type="text"
                      value={formUser.email}
                      className="rounded-lg bg-red-100 w-2/3 text-left p-1 "
                      placeholder="Email"
                      name="email"
                      onChange={(e) => fillFormUser(e)}
                    />
                  </div>

                  <div className="mt-4 mb-5">
                    <input
                      type="number"
                      value={formUser.phone_number}
                      className="rounded-lg bg-red-100 w-2/3 text-left p-1"
                      placeholder="Teléfono"
                      name="phone_number"
                      onChange={(e) => fillFormUser(e)}
                    />
                    <div className="block mt-3">
                      <span>Autenticación de 2 factores: {enabledTwoFA}</span>
                      <button
                        className="border border-black rounded-lg hover:bg-gray-200 p-1 inline-block ml-4"
                        onClick={(e) => showQrCode(e)}>
                        Cambiar
                      </button>
                    </div>
                    <div className={`${showTwoFa} border border-black rounded-xl w-full p-5 mt-4 grid place-items-center`}>
                      <p>Abra la app Google Authenticator y escanee el siguiente codigo QR: </p>
                      <img className="mx-auto" src={qrCodeSrc} alt="qrcode" />
                      <p className="mb-3">Luego introduzca el codigo numerico llamado "barbershop":</p>
                      <input
                        type="text"
                        className="rounded-lg bg-yellow-100 w-2/3 text-left p-1"
                        name="twofa"
                        onChange={(event) => {
                          setTwofaCode(event.target.value);
                        }}/>
                      <button
                        className="border border-black rounded-lg bg-lime-200 hover:bg-lime-600 p-1 inline-block mt-4 ml-4"
                        onClick={(e) => handleVerify(e)}>
                        Verificar
                      </button>
                    </div>
                  </div>
                  <div className="grid justify-items-stretch">
                    <button
                      className=" border border-black rounded-lg hover:bg-gray-200 p-1 mb-10 justify-self-center"
                      onClick={(e) => submitUserInfo(e)}>
                      Actualizar Info
                    </button>
                  </div>

                  <button>Cambiar Contraseña</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <Link to={`/user/mis-compras/${user._id}`}>
              <p>Ver mis compras</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
