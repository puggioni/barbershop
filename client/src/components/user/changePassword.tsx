import React from "react";
import { useState, MouseEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { changePassword } from "../slices/logIn";
export default function ChangePassword() {
  type QuizParams = {
    idUser: string;
  };
  const { idUser } = useParams<QuizParams>();
  console.log(typeof idUser);
  const dispatch = useAppDispatch();
  const passwordReset = {
    password: "",
    repassword: "",
  };

  const initialWarnToPrint = {
    password:
      "La contraseña debe tener múmeros y letras y mínimo de 6 caracteres",
    repassword: "",
  };
  const [password, setPassword] = useState(passwordReset);

  const [warnToPrint, setWarnToPrint] = useState(initialWarnToPrint);

  const body = {
    idUsr: idUser,
    newPwd: password.password,
  };
  function handleSubmit(
    e:
      | React.FormEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (warnToPrint.password || warnToPrint.repassword) {
      alert("Por favor complete los campos correctamente");
    } else {
      dispatch(changePassword(idUser, password.password));
      setPassword(passwordReset);
      setWarnToPrint(initialWarnToPrint);
    }
  }

  console.log(body);
  function loadForm(e: any) {
    const { name, value } = e.target as HTMLInputElement;
    setPassword({
      ...password,
      [name]: value,
    });
    switch (name) {
      case "password":
        if (!/^[A-Za-z]*[0-9][a-z0-9]*$/.test(value)) {
          setWarnToPrint({
            ...warnToPrint,
            password: "*Debe tener letras y números",
          });
        } else if (value.length < 6 || value.length > 12) {
          setWarnToPrint({
            ...warnToPrint,
            password: "*Debe tener mas de 6 y menos de 12 digitos",
          });
        } else if (passwordReset.repassword !== value) {
          setWarnToPrint({
            ...warnToPrint,
            repassword: "*Las contraseñas deben ser iguales",
            password: "",
          });
        } else {
          setWarnToPrint({ ...warnToPrint, password: "", repassword: "" });
        }
        break;
    }
  }
  return (
    <div className="bg-white h-[100vh]">
      <div className="z-10 w-[100vw] h-[40vh] bg-[#222222] flex justify-center items-center">
        <label className=" font-bold text-white text-5xl	">
          Renova tu contraseña
        </label>
      </div>

      <div className=" -mt-20 border-2 border-[#222222] flex flex-col sm:justify-center w-1/4 mx-auto items-center">
        <div className=" w-full rounded-lg px-6 py-4 bg-white ">
          <form className="mt-10" name="form" onChange={loadForm}>
            <span className="text-red-600 text-sm"></span>
            <div className="">
              <input
                type="password"
                placeholder="Contraseña"
                className="mb-3 border-2 border-[#222222] pl-4 block w-full  bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                name="password"
                value={password.password}
              />
              {!warnToPrint.password ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.password}
                </span>
              )}
            </div>
            <div className="">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className=" mb-4 border-2 border-[#222222] pl-4 block w-full bg-gray-100 h-11 rounded-lg shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                name="repassword"
                value={password.repassword}
              />
              {!warnToPrint.repassword ? null : (
                <span className=" text-red-700 font-semibold">
                  {warnToPrint.repassword}
                </span>
              )}
            </div>

            <button className="bg-[#855C20] w-[75%] mt-7 mx-10 justify-self-center py-3 rounded-lg text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
              Resetear
            </button>

            <div className="flex mt-7 justify-center w-full">
              {/* <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Facebook
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
