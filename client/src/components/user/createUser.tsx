import { Link } from "react-router-dom"
import {useState} from 'react'
import {logUp} from "../slices/logIn";
import { useAppDispatch } from "../../app/hooks";


export default function CreateUser() {

    const dispatch=useAppDispatch();

    const[formUser, setFormUser]=useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone_number: "",
        role: "",
        repassword:""
    })   

    function handleSubmit(e:React.FormEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        console.log(formUser)
        dispatch(logUp(formUser))
        setFormUser({ 
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone_number: "",
        role: "",
        repassword:""
    })
    }
    function loadForm(e:any){
       if(e.target.name && typeof(e.target.value)==="string"){
    setFormUser({
        ...formUser,
        [e.target.name]: e.target.value,
      });
    }

    switch(e.target.name){
        // case "name":
        // if(!/^[A-Za-z0-9:'\s]+$/g.test(e.target.value)){
        //   setErrorName(" * The name is mandatory and only letters and numbers are allowed")
        // }else{setErrorName("")}
        // break;
        // case "image":
        // if(!/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)||e.target.value.length>255){
        //   setErrorImage("You must enter a valid image URL")
        // }else{setErrorImage("")}
        // break;
        // case "description":
        // if(!e.target.value){
        //   setErrorDescription("* The description is mandatory.")
        // }else if(e.target.value.length>2000){
        //   setErrorDescription("* The description is too long, please make sure it is less than 2000 characters.")
        // }
        // else{setErrorDescription("")}
        // break;
        // case "released":
        // if(isNaN(Date.parse(e.target.value))||e.target.value.split("-")[0]>2023||e.target.value.split("-")[0]<1900){
        //     setErrorReleased("You must enter a valid date, dd/mm/yyyy")
        // }else{setErrorReleased("")}
        // break;
        // case "rating":
        // if(e.target.value>5 || e.target.value<0){
        //   setErrorRating("The value of the rating must be in a range from 0.0 to 5.0")
        // }else{setErrorRating("")}
      
        // break;

        default:
            break;
      }

    }

    return(
        <div className="font-sans">
            <Link to={"/"}><h1 className=" ml-8 text-white">Home</h1></Link> 
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
            <div className="relative sm:max-w-sm w-full">
                <div className="relative w-full rounded-3xl  px-6 py-4  bg-slate-200/50  shadow-md">
                    <label className="block mt-3 text-sm text-700 text-center font-semibold">
                        Registrate
                    </label>
                    <form 
                    name="form"
                    onChange={loadForm} 
                    method="#" action="#" className="mt-10">

                        <div>
                            <input value={formUser.name}name="name" type="text" placeholder="Nombre" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                        </div>
                        <div className="mt-7">
                            <input value={formUser.lastname} name="lastname" type="text" placeholder="Apellidos" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                        </div>

                        <div className="mt-7">
                            <input value={formUser.email} name="email" type="email" placeholder="Correo electronico" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                        </div>
                        <div className="mt-7">
                            <input value={formUser.phone_number} name="phone_number" type="number" placeholder="Número telefónico" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                        </div>
                        <div className="mt-7">
                            <input value={formUser.password} name="password" type="password" placeholder="Contraseña" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                        </div>

                        <div className="mt-7">
                            <input value={formUser.repassword}  name="repassword"  type="password" placeholder="Confirmar contraseña" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                        </div>



                        <div className="mt-7">
                            <button type="submit" 
                            onClick={(event) => {handleSubmit(event);}} 
                            className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                Registrar
                            </button>
                        </div>

                        <div className="flex mt-7 items-center text-center">
                            <hr className="border-gray-300 border-1 w-full rounded-md"/>
                            <label className="block font-medium text-sm text-600 w-full">
                                Registrate con
                            </label>
                            <hr className="border-gray-300 border-1 w-full rounded-md"/>
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
                                <label className="mr-2" >¿Ya tienes una cuenta?</label>
                                <Link to={"/user/login"}>
                                <a href="#" className=" text-white-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Iniciar sesion
                                </a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}