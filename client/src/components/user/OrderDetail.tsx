import { useParams,useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import	{getDetailOrder} from "../slices/purchaseOrder"
import { RiArrowGoBackFill } from "react-icons/ri";


const OrderDetail=()=>{
    const {idOrder}=useParams();
    const dispatch=useAppDispatch();
    const order=useAppSelector((state)=>state.orders.order)
    const navigate = useNavigate();
    const total = order?.products?.length
    ? order.products.reduce((acc: number, prod) => {
        return acc + (prod.price*prod.quantity);
      }, 0)
    : 0;

    useEffect(()=>{
        dispatch(getDetailOrder(idOrder))
    },[])

    return(
        <div className="bg-white min-h-screen">
        <div className="bg-[#222222] py-24 border-black"></div>
        <div className="bg-white border-2 border-black -mt-20 mx-8 rounded-lg">
          <h1 className="flex justify-center font-bold text-2xl">
            ORDEN DE COMPRA
          </h1>
  
          <div className="border border-black m-8 rounded-lg">
            <div className="grid grid-cols-[1fr_2fr] my-16 gap-4">
              <div className="justify-self-center font-medium"> 
              <p className="mb-2"> <label className=" font-bold">Número de Pedido:</label>  {idOrder}</p>
              <p className="mb-2"><label className=" font-bold">Fecha de Pedido:</label> {order.date?.toString().slice(0,10)}</p>
              <p className="mb-2"> <label className=" font-bold">Estado:</label>  {order.state}</p>
               </div>
              
              <div className="border-l border-black pl-16  grid gap-4">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] pb-4 font-bold">
                  <p>Nombre</p>
                  <p>Precio</p>
                  <p>Cantidad</p>
                  <p>Total</p>
                </div>
                {order?.products?.length &&
                  order.products.map((prod: any) => {
                    const total = prod.price * prod.quantity;
                    return (
                      <div
                        key={prod._id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr]"
                      >
                        <p>{prod.name[0].toUpperCase() + prod.name.slice(1)}</p>
                        <p>${prod.price}</p>
                        <p>{prod.quantity} Unds</p>
                        <p>${total}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="grid grid-cols-[2fr_.5fr] gap-16 mb-2 font-bold">
              <div className="justify-self-end mr-16">Total: </div>
              <div className="justify-self-center ">$ {total.toFixed(2)}</div>
            </div>
          </div>
  
          <RiArrowGoBackFill
            onClick={() => {
              navigate(-1);
            }}
            className="m-4 cursor-pointer"
            title="Home"
          />
        </div>
      </div>
    )

}

export default OrderDetail;