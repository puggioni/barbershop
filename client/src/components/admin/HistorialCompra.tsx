import { useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useNavigate } from "react-router";
import useHeaders from "../../app/header";
import { useAppDispatch } from "../../app/hooks";

const HistorialCompra = () => {
  //===========pagination=============
  const [currentPage] = useState<number>(1);
  const [productsPerPage] = useState(9);
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentProducts = [].slice(firstPostIndex, lastPostIndex);
  const dispatch = useAppDispatch();
  // const data = useAppSelector((state: RootState) => state.products);
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const navigate = useNavigate();
  const header = useHeaders(token);

  return (
    <div className="flex flex-col bg-white bg-bg-historial bg-no-repeat bg-auto h-screen">
      <h1 className="text-white justify-center py-20 mb-2 text-5xl font-bold flex align-middle items-center">
        HISTORIAL DE COMPRAS
      </h1>
      <div className=" mx-8 bg-white border-2 px-4 border-black rounded-lg">
        <div>
          <div className="grid grid-cols-[1.5fr_1fr] gap-8">
            <div className="grid grid-cols-[2fr_1fr_1fr_.2fr] gap-16  my-8">
              <BsArrowCounterclockwise
                // onClick={(e) => handleRestore(e)}
                size={30}
                title="restore products cursor-pointer"
              />
            </div>
          </div>
          <div className="relative">
            <div className=" grid grid-cols-[1fr_.2fr_.2fr_.2fr] w-[55%] pr-8 gap-16 justify-items-center">
              <p>Email</p>
              <p>Id de orden</p>
              <p>Precio total</p>
              <p>Estado</p>
            </div>
            <button className="absolute right-8 top-0 text-blue-800	">
              Ver orden de compra
            </button>

            {[].map((data) => {
              return null;
              // <div
              //   className="grid grid-cols-[1fr_.2fr_.2fr_1fr_.2fr_.2fr_.2fr]  gap-16 py-2 pl-2 mt-8 border border-black rounded-lg items-center"
              //   key={data.id}
              // >
              //   <p>{data.email}</p>
              //   <p>{data.id}</p>
              //   <p>{data.price}</p>
              //   <p>{data.state}</p>
              // </div>
            })}
          </div>
          {/* <Paginate
                allProducts={}
                productsPerPage={}
                setCurrentPage={}
              /> */}
        </div>
      </div>
    </div>
  );
};

export default HistorialCompra;
