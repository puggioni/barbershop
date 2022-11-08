import { ChangeEvent, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
// import { useNavigate } from "react-router";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createProd } from "../slices/admin";
import { categorias } from "../slices/productSlice";
export interface input {
  nombre: string;
  precio: number;
  stock: number;
  descripcion: string;
  categorias: Array<string>;
  available: boolean;
}

const CrearProducto = () => {
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const header = useHeaders(token);
  const dispatch = useAppDispatch();
  const categoriaProds = useAppSelector((state) => state.products.categorias);
  const [inputs, setInputs] = useState<input>({
    nombre: "",
    precio: 0,
    stock: 0,
    descripcion: "",
    categorias: [],
    available: false,
  });
  const [img, setImg] = useState();

  useEffect(() => {
    dispatch(categorias());
  }, [dispatch]);

  //================handlers===========
  const handleInput = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (e.target.name === "stock") {
      setInputs((prevState) => ({
        ...prevState,
        available: true,
      }));
    }
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteCate = (name: string) => {
    const filtered = inputs.categorias.filter((cate) => {
      return cate !== name;
    });
    setInputs({
      ...inputs,
      categorias: filtered,
    });
  };
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    !inputs.categorias.includes(e.target.value) &&
      setInputs({
        ...inputs,
        categorias: [...inputs.categorias, e.target.value],
      });
  };

  const handleImage = (e: ChangeEvent<any>) => {
    setImg(e.target.files);
  };

  const clearState = () => {
    setInputs(() => {
      return {
        nombre: "",
        precio: 0,
        stock: 0,
        descripcion: "",
        categorias: [],
        available: false,
      };
    });
  };

  const handleCreateOrder = () => {
    clearState();
    dispatch(createProd(header.headers, inputs, img));
  };

  //===================render========================
  return (
    <div className=" flex bg-bg-prods bg-cover">
      <div className="flex flex-col mx-auto my-16 py-4 px-8 bg-white/50 rounded-lg">
        <h1 className="text-5xl font-bold flex justify-center">
          CREAR PRODUCTO
        </h1>
        <div className="flex m-auto pt-4 border-b-2 border-black"></div>
        <div className="flex flex-row justify-around  my-16">
          <label htmlFor="precio">Nombre: </label>

          <input
            value={inputs.nombre}
            type="text"
            name="nombre"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 pl-4"
          />
          <div>
            <label htmlFor="precio">Precio: </label>
            <input
              value={inputs.precio}
              type="number"
              id="precio"
              name="precio"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
              placeholder="Precio"
            />
          </div>
          <div>
            <label htmlFor="precio">Stock: </label>
            <input
              value={inputs.stock}
              type="number"
              name="stock"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
              placeholder="Stock inicial"
            />
          </div>
        </div>

        <textarea
          value={inputs.descripcion}
          name="descripcion"
          onChange={(e) => handleInput(e)}
          rows={10}
          className="flex m-auto rounded-lg bg-white/70 p-4 mb-8 w-[90%]"
          placeholder="Descripción"
        />

        <div className="grid grid-cols-[1fr_4fr] gap-4 w-[80%] mx-auto mb-4 ">
          <input
            type="file"
            id="imagen"
            accept="image/*"
            className="hidden left-[10%] bottom-1 my-2"
            onChange={(e) => {
              handleImage(e);
            }}
          />

          <label
            className="left-[10%] bottom-1 cursor-pointer my-2"
            htmlFor="imagen"
          >
            <p className="bg-white/70 rounded-lg px-2">Choose file</p>
          </label>
        </div>

        <div className="flex justify-self-center flex-wrap gap-4  m-auto">
          <select
            name="categorias"
            onChange={(e) => handleGenreChange(e)}
            className="h-10 rounded-lg"
          >
            {categoriaProds.map((cate) => {
              return (
                <option key={cate._id} value={cate.name}>
                  {cate.name}
                </option>
              );
            })}
          </select>
          <div className="grid grid-cols-3 bg-white/70 rounded-lg gap-4 ">
            {inputs.categorias.map((cate) => {
              return (
                <div className="bg-white/70 relative rounded-lg p-2">
                  <p>{cate}</p>
                  <AiFillCloseCircle
                    size={15}
                    className="absolute top-0 right-0"
                    onClick={() => deleteCate(cate)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              handleCreateOrder();
            }}
            className="block mt-16 mb-4 bg-black text-white rounded-sm p-2 "
          >
            CREAR PRODUCTO
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearProducto;
