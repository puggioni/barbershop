import { useEffect, useState } from "react";
import useHeaders from "../../app/header";
import { useAppDispatch } from "../../app/hooks";
import { comprar } from "../slices/purchaseOrder";

export interface input {
  nombre: string;
  apellido: string;
  email: string;
  direccionEnvio: string;
  localidad: string;
  CP: number;
  tel: string;
}

const CrearProducto = () => {
  const dispatch = useAppDispatch();
  const user: any = JSON.parse(window.localStorage.getItem("user") || "[]");
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const header = useHeaders(token);
  const products: any = JSON.parse(
    window.localStorage.getItem("product") || "[]"
  );
  const compra = products?.map((productos: any) => {
    return {
      price: productos.productos.price,
      cantidad: productos.cantidad,
      name: productos.productos.name,
    };
  });
  const [inputs, setInputs] = useState<input>({
    nombre: "",
    apellido: "",
    email: "",
    tel: "",
    direccionEnvio: "",
    localidad: "",
    CP: 0,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setInputs((prev) => ({ ...prev, email: user.email }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //================handlers===========
  const validate = (input: any) => {
    let errors: any = {};
    if (!input.nombre) {
      errors.nombre = "Nombre es requerido";
    } else if (!/^[a-zA-Z0-9_. -]*$/.test(input.nombre)) {
      errors.nombre = "Nombre invalido";
    }

    if (!input.apellido) {
      errors.apellido = "Apellido es requerido";
    } else if (!/^[a-zA-Z0-9_. -]*$/.test(input.apellido)) {
      errors.apellido = "Apellido invalido";
    }

    if (!input.email) {
      errors.email = "email es requerido";
    } else if (
      !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(input.email)
    ) {
      errors.email = "email invalido";
    }

    if (!input.tel) {
      errors.tel = "telefono es requerido";
    } else if (!/\d{3}[-\s]?\d{3}[-\s]?\d{4}$/.test(input.tel)) {
      errors.tel = "telefono invalido";
    }

    if (!input.direccionEnvio) {
      errors.direccionEnvio = "Direccion de envio es requerido";
    } else {
      setErrors((prev: any) => ({ ...prev, direccionEnvio: "" }));
    }

    if (!input.CP) {
      errors.CP = "Codigo Postal es requerido";
    } else if (input.CP < 1000) {
      errors.CP = "Codigo Postal invalido";
    }
    return errors;
  };

  // setErrors(validator({ ...values, [e.target.name]: e.target.value }));

  const handleInput = (e: React.ChangeEvent<any>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }));
  };

  const clearState = () => {
    setInputs(() => {
      return {
        nombre: "",
        apellido: "",
        email: "",
        direccionEnvio: "",
        localidad: "",
        CP: 0,
        tel: "",
      };
    });
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length) {
      alert("Debe completar los campos requeridos");
    } else {
      dispatch(comprar(header.headers, laCompra));
      clearState();
    }
  };

  const laCompra = {
    user: inputs,
    compra,
  };

  //===================render========================//
  return (
    <div className="flex h-screen bg-bg-prods bg-cover">
      <div className="  lg:w-[40%] lg:mx-auto mx-4 my-16 py-8 px-8 bg-white/50 rounded-lg">
        <h1 className="text-lg  flex ">
          Por favor llene los campos para finalizar su compra
        </h1>
        <div className="lg:grid flex flex-col grid-cols-2 my-16 gap-y-8">
          <div className="lg:block flex flex-col">
            <label
              className="after:content-['*'] after:text-red-600"
              htmlFor="nombre"
            >
              Nombre:
            </label>
            <input
              value={inputs.nombre}
              type="text"
              name="nombre"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
            />
            {errors.nombre ? (
              <p className="text-red-600">{errors.nombre}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="lg:block flex flex-col">
            <label
              className="after:content-['*'] after:text-red-600"
              htmlFor="apellido"
            >
              Apellido:
            </label>
            <input
              value={inputs.apellido}
              type="text"
              name="apellido"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
            />
            {errors.apellido ? (
              <p className="text-red-600">{errors.apellido}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="col-span-2 flex flex-col">
            <label
              className="after:content-['*'] after:text-red-600"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              value={inputs.email}
              type="text"
              name="email"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
            />
            {errors.email ? (
              <p className="text-red-600">{errors.email}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="col-span-2 flex flex-col">
            <label
              className="after:content-['*'] after:text-red-600"
              htmlFor="email"
            >
              Telefono:
            </label>
            <input
              value={inputs.tel}
              type="text"
              name="tel"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
            />
            {errors.tel ? (
              <p className="text-red-600">{errors.tel}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="col-span-2 flex flex-col">
            <label
              className="after:content-['*'] after:text-red-600"
              htmlFor="direccionEnvio"
            >
              Direccion de envio:
            </label>
            <input
              value={inputs.direccionEnvio}
              type="text"
              name="direccionEnvio"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
            />
            {errors.direccionEnvio ? (
              <p className="text-red-600">{errors.direccionEnvio}</p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="flex flex-col mr-8">
            <label htmlFor="localidad">Localidad: </label>
            <input
              value={inputs.localidad}
              type="text"
              name="localidad"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="after:content-['*'] after:text-red-600"
              htmlFor="precio"
            >
              CP:
            </label>
            <input
              value={inputs.CP}
              type="text"
              minLength={4}
              maxLength={4}
              name="CP"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4 "
            />
            {errors.CP ? <p className="text-red-600">{errors.CP}</p> : <p></p>}
          </div>
        </div>

        <button
          onClick={() => {
            handleSubmit();
          }}
          className="justify-self-end bg-black text-white block rounded-sm p-4 ml-auto "
        >
          FINALIZAR COMPRA
        </button>
      </div>
    </div>
  );
};

export default CrearProducto;
