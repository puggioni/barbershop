import { useEffect } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchOrderId } from "../slices/admin";
const Cofirmacion = () => {
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const order = useAppSelector((state) => state.admin.orders);
  console.log(
    "🚀 ~ file: OrderUsuario.tsx ~ line 10 ~ Cofirmacion ~ order",
    order
  );
  const { idOrder } = useParams<{ idOrder: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const total = order[0]?.products?.length
    ? order[0].products.reduce((acc: number, prod) => {
        return acc + (prod.price*prod.quantity);
      }, 0)
    : 0;
  const header = useHeaders(token);

  useEffect(() => {
    if (idOrder) {
      dispatch(searchOrderId(header.headers, idOrder));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#B1A26A] py-20 border-black"></div>
      <div className="bg-white border-2 border-black -mt-10 mx-8">
        <h1 className="flex justify-center font-bold text-2xl">
          ORDEN DE COMPRA
        </h1>

        <div className="border border-black m-8 ">
          <div className="grid grid-cols-[1fr_2fr] my-16 gap-4">
            <div className="justify-self-center">
              id: {idOrder} <br></br>
              {order[0]?.user} <br></br>
              <div>
                Direccion <br></br>
                {/* <p>{order[0]?.address["direccion"]}</p>
                <p>{order[0]?.address["localidad"]}</p>
                <p>{order[0]?.address["CP"]}</p> */}
              </div>
            </div>
            <div className="border-l border-black pl-16  grid gap-4">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] pb-4">
                <p>nombre</p>
                <p>precio</p>
                <p>cantidad</p>
                <p>total</p>
              </div>
              {order[0]?.products?.length &&
                order[0].products.map((prod: any) => {
                  const total = prod.price * prod.quantity;
                  return (
                    <div
                      key={prod._id}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr]"
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
            <div className="justify-self-center">$ {total.toFixed(2)}</div>
          </div>
        </div>

        <RiArrowGoBackFill
          onClick={() => {
            navigate("/admin/compras");
          }}
          className="m-4 cursor-pointer"
          title="Home"
        />
      </div>
    </div>
  );
};

export default Cofirmacion;
