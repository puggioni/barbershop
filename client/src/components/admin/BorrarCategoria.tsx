import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { borrarCate } from "../slices/admin";
import { categorias } from "../slices/productSlice";

const CrearCategoria = () => {
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const header = useHeaders(token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const category = useAppSelector((state) => state.products.categorias);

  useEffect(() => {
    dispatch(categorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //=========================handlers================

  const handleDelete = (id: string) => {
    dispatch(borrarCate(header.headers, id));
    navigate("/admin/products");
  };

  //=================render==========
  return (
    <div className="flex bg-bg-categorias bg-center h-screen bg-white bg-cover justify-end items-center">
      <div className="flex flex-col bg-white/50 my-16 w-[35%] rounded-lg justify-around mr-16">
        <div>
          <h1 className="flex text-3xl justify-center font-bold">
            BORRAR CATEGORIA
          </h1>
          <div className="w-[40%] mx-auto border-b border-black"></div>
        </div>
        {category.map((data) => {
          return (
            <div
              key={data._id}
              className="bg-white/70 p-3 flex justify-between rounded-lg border border-black m-4"
            >
              <p>{data.name}</p>
              <FaTrashAlt
                size={25}
                onClick={() => {
                  handleDelete(data._id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrearCategoria;
