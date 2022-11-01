import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useHeaders from "../../app/header";
import { useAppDispatch } from "../../app/hooks";
import { createCate } from "../slices/admin";

const CrearCategoria = () => {
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const [categoria, setCategoria] = useState("");
  const header = useHeaders(token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //=========================handlers================

  const handleCreate = (e: any) => {
    if (categoria.length) {
      dispatch(createCate(header.headers, categoria));
      setCategoria("");
      navigate("/admin/products");
    }
  };

  //=================render==========
  return (
    <div className="flex bg-bg-categorias bg-center h-screen bg-white bg-cover justify-end items-center">
      <div className="flex flex-col relative bg-white/50 h-3/4 w-[35%] rounded-lg justify-around mr-16">
        <Link
          className="absolute top-1 left-1 hover:text-white"
          to="/admin/products/borrar-categoria"
        >
          BORRAR CATEGORIAS
        </Link>
        <div>
          <h1 className="flex text-3xl justify-center font-bold">
            CREAR CATEGORIA
          </h1>
          <div className="w-[40%] mx-auto border-b border-black"></div>
        </div>
        <input
          placeholder="Nombre de categoria"
          className="outline-none mx-auto rounded-lg w-3/4 bg-white/70 p-4"
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <button
          onClick={(e) => {
            handleCreate(e);
          }}
          className="bg-black text-white font-semibold mx-auto rounded-lg h-16 w-1/3"
        >
          Crear Categoria
        </button>
      </div>
    </div>
  );
};

export default CrearCategoria;
