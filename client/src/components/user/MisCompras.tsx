import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getPersonalOrder} from "../slices/purchaseOrder";
import { useParams, useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const MisCompras = () => {
  const navigate=useNavigate();  
  const  dispatch=useAppDispatch();
  const {idUser}=useParams()
  const userOrders=useAppSelector((state) => state.orders.ordersByUser)
  const cancelada="w-1/5 text-red-600"
  const completa="w-1/5 text-green-600"

useEffect(()=>{
    dispatch(getPersonalOrder(idUser||""))
},[dispatch])

    return(
        <div className="bg-white justify-center h-screen">
        <div className="w-[100vw] py-24 bg-[#222222] ">
        </div>

            <div className="text-black -mt-32  md:p-10 border bg-white border-black rounded-xl md:mx-10 my-auto">
            <IoMdArrowBack onClick={()=>navigate(-1)} className=" text-2xl"/>
            <h2 className="font-bold text-lg text-center"> Mis Compras</h2>
            {userOrders.length? userOrders.map((orden)=>(
            <div>
            <div className="flex mt-5 p-2 border border-black rounded-lg md:flex-row flex-col">
            <p className="md:w-2/6">{orden._id}</p>   
            <p className="md:w-1/5">{orden.date?.toString().slice(0,10)}</p>
            <p className={orden.state==="Cancelada"?cancelada:orden.state==="Completa"?completa:"w-1/5"}>{orden.state?.toUpperCase()}</p>
            <p className="md:w-1/6">$
            {orden.products?.reduce((acc: number, prod) => {
                return acc + (prod.price*prod.quantity);
                }, 0)}
            </p>
            <Link to={`/user/mis-compras/compra/${orden._id}`}>
             <button className=" text-blue-600">Ver Compra</button>
            </Link>
            </div>

            
            </div>
        )) : <div>
            Aún no tienes compras registradas
            </div>}
        </div>
        </div>
    )
}

export default MisCompras;