import { useState } from "react";

const CrearProducto = () => {
  // setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const [inputs, setInputs] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="background flex bg-bg-prods h-screen">
      <div className="container h-3/4 !w-full mx-20 my-16 py-4 px-8 bg-white/50 rounded-lg">
        <h1 className="text-5xl pb-8 font-bold flex justify-center">
          MODIFICAR PRODUCTO
        </h1>
        <div className=""></div>
        <div className="container grid grid-cols-3 gap-4">
          <input
            value={inputs.nombre}
            name="nombre"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 "
            placeholder="Nombre del producto"
          ></input>
          <input
            value={inputs.precio}
            name="precio"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 "
            placeholder="Precio"
          ></input>
          <input
            value={inputs.stock}
            name="stock"
            onChange={(e) => handleInput(e)}
            className="rounded-lg bg-white/70 "
            placeholder="Stock inicial"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default CrearProducto;
