import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { categorias } from "../slices/productSlice";
interface input {
  nombre: string;
  precio: number;
  stock: number;
  descripcion: string;
  categorias: Array<string>;
}

const CrearProducto = () => {
  const dispatch = useAppDispatch();
  const categoriaProds = useAppSelector((state) => state.products.categorias);
  const [inputs, setInputs] = useState<input>({
    nombre: "",
    precio: 0,
    stock: 0,
    descripcion: "",
    categorias: [],
  });

  useEffect(() => {
    dispatch(categorias());
  }, [dispatch]);

  //================handlers===========
  const handleInput = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
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
  return (
    <div className="background flex bg-bg-prods bg-cover">
      <div className="container h-screen !w-full mx-40 my-16 py-4 px-8 bg-white/50 rounded-lg">
        <h1 className="text-5xl font-bold flex justify-center">
          CREAR PRODUCTO
        </h1>
        <div className="flex m-auto w-[40%] pt-4 border-b-2 border-black"></div>
        <div className="container flex flex-row justify-around h-12 my-8">
          <input
            value={inputs.nombre}
            name="nombre"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 pl-4"
            placeholder="Nombre del producto"
          />
          <input
            value={inputs.precio}
            name="precio"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 pl-4"
            placeholder="Precio"
          />
          <input
            value={inputs.stock}
            name="stock"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 pl-4"
            placeholder="Stock inicial"
          />
        </div>

        <textarea
          value={inputs.descripcion}
          name="descripcion"
          onChange={(e) => handleInput(e)}
          className="flex m-auto w-[80%] rounded-lg bg-white/70 p-4 h-[50%] mb-8"
          placeholder="Descripción"
        />

        <input
          type="file"
          id="imagen"
          accept="image/*"
          className="chooseFile"
        />

        <div className="grid grid-cols-[.5fr_4fr] gap-3 max-w-[80%] m-auto">
          <select
            name="categorias"
            onChange={(e) => handleGenreChange(e)}
            className="categorias rounded-lg"
          >
            {categoriaProds.map((cate) => {
              return (
                <option key={cate.id} value={cate.name}>
                  {cate.name}
                </option>
              );
            })}
          </select>
          <div className="categoriasagregadas grid grid-cols-7 bg-white/70 rounded-lg gap-4">
            {inputs.categorias.map((cate) => {
              return (
                <div className="bg-white/70 flex flex-row rounded-lg gap-1">
                  <p>{cate}</p>
                  <AiFillCloseCircle
                    className=""
                    onClick={() => deleteCate(cate)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button>CREAR PRODUCTO</button>
      </div>
    </div>
  );
};

export default CrearProducto;
