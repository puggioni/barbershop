import { useEffect } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { cancelOrders } from "../slices/purchaseOrder";
const Cancelacion = () => {
  type QuizParams = {
    idOrder: string;
  };
  const { idOrder } = useParams<QuizParams>();
  const { purchaseOrder } = useAppSelector((state: RootState) => state.orders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idOrder) {
      dispatch(cancelOrders(idOrder));
    }
    return window.localStorage.removeItem("product");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let total = 0;

  const navigate = useNavigate();

  if (purchaseOrder?.products?.length) {
    total = purchaseOrder.products.reduce((acc: number, prod) => {
      return acc + (prod.price*prod.quantity);
    }, 0);
  }
  total = Math.floor(total * 100) / 100;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#B1A26A] py-20 border-black"></div>
      <div className="bg-white border-2 border-black -mt-10 lg:mx-8">
        <h1 className="flex justify-center font-bold text-2xl">
          COMPRA CANCELADA
        </h1>

        <div className="border border-black m-8 ">
          <div className="lg:grid grid-cols-[1fr_2fr] lg:my-16 gap-4 flex flex-col lg:mx-0 mx-6">
            <div className="justify-self-center lg:ml-0 ml-6">id:{idOrder}</div>
            <div className="lg:border-l border-black lg:pl-16  grid gap-4">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] pb-4 lg:border-none border-b border-black">
                <p>nombre</p>
                <p>precio</p>
                <p>cantidad</p>
                <p>total</p>
              </div>
              {purchaseOrder?.products?.length &&
                purchaseOrder.products.map((prod: any) => {
                  const total = prod.price * prod.quantity;
                  return (
                    <div
                      key={prod._id}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr] lg:border-none border-b border-black"
                    >
                      <p>{prod.name}</p>
                      <p>{prod.price}</p>
                      <p>{prod.quantity}</p>
                      <p>{total}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="grid grid-cols-[2fr_.5fr] gap-16 mb-2">
            <div className="justify-self-end mr-16">total: </div>
            <div className="justify-self-center">${total}</div>
          </div>
        </div>

        <RiArrowGoBackFill
          onClick={() => {
            navigate("/");
          }}
          className="m-4 cursor-pointer"
          title="Home"
        />
      </div>
    </div>
  );
};

export default Cancelacion;
