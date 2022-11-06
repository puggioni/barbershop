import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPersonalOrder } from "../slices/purchaseOrder";

const MisCompras = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { idUser } = useParams();
  const userOrders = useAppSelector((state) => state.orders.ordersByUser);
  const cancelada = "w-1/5 text-red-600";
  const completa = "w-1/5 text-green-600";

  useEffect(() => {
    dispatch(getPersonalOrder(idUser || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //====================render==================================
  return (
    <div className="bg-white justify-center h-screen">
      <div className="w-[100vw] py-24 bg-[#222222] lg:flex hidden "></div>
      <div className="text-black lg:-mt-32 mt-16 lg:p-10 border bg-white border-black rounded-xl lg:mx-10 mx-4 ">
        <IoMdArrowBack onClick={() => navigate(-1)} className=" text-2xl" />
        <h2 className="font-bold text-lg text-center"> Mis Compras</h2>
        {userOrders.length ? (
          userOrders.map((orden) => {
            const precio = orden.products?.reduce((acc: number, prod) => {
              return acc + prod.price * prod.quantity;
            }, 0);
            return (
              <div>
                <div className="flex mt-5 p-2 border border-black rounded-lg lg:flex-row flex-col lg:mx-0 mx-6">
                  <p className="lg:w-2/6">{orden._id}</p>
                  <p className="lg:w-1/5">
                    {orden.date?.toString().slice(0, 10)}
                  </p>
                  <p
                    className={
                      orden.state === "Cancelada"
                        ? cancelada
                        : orden.state === "Completa"
                        ? completa
                        : "w-1/5"
                    }
                  >
                    {orden.state?.toUpperCase()}
                  </p>
                  <p className="lg:w-1/6">${precio && precio.toFixed(2)}</p>
                  <Link to={`/user/mis-compras/compra/${orden._id}`}>
                    <button className=" text-blue-600">Ver Compra</button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div>Aún no tienes compras registradas</div>
        )}
      </div>
    </div>
  );
};

export default MisCompras;
