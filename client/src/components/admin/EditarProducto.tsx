import { ChangeEvent, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate,useParams } from "react-router";
import useHeaders from "../../app/header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createProd } from "../slices/admin";
import { categorias,productDetail,clearDetail } from "../slices/productSlice";
export interface input {
  nombre: string;
  precio: number;
  stock: number;
  descripcion: string;
  categorias: Array<string>;
}
type QuizParams = {
    idProduct: string;
  };

const EditarProducto = () => {
    const token = JSON.parse(window.localStorage.getItem("token") || "{}");
    const { idProduct } = useParams<QuizParams>();
    // const navigate = useNavigate();
    const header = useHeaders(token);
    const dispatch = useAppDispatch();
    const producto = useAppSelector((state) => state.products.product);
    const categoriaProds = useAppSelector((state) => state.products.categorias);
    const [img, setImg] = useState();
    const [inputs, setInputs] = useState<input>({
      nombre: producto?.name||"",
      precio: producto?.price||0,
      stock: producto?.stock||0,
      descripcion:producto?.description||"",
      categorias: producto?.category||[],
    });
  
    useEffect(() => {
      dispatch(categorias());
      dispatch(productDetail(idProduct||""))
      return ()=>{dispatch(clearDetail())}
    }, [dispatch,inputs]);


    
  
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
  
    const handleImage = (e: ChangeEvent<any>) => {
      setImg(e.target.files);
    };
  
    const handleCreateOrder = () => {
      dispatch(createProd(header.headers, inputs, img));
    };
  
    //===================render========================
    return (
      <div className="background flex bg-bg-prods bg-cover">
        <div className="flex flex-col container h-screen !w-full mx-40 my-16 py-4 px-8 bg-white/50 rounded-lg">
          <h1 className="text-5xl font-bold flex justify-center">
            EDITAR PRODUCTO
          </h1><br />
          <h1 className="text-5xl font-bold flex justify-center">
            {producto?.name.toUpperCase()}
          </h1>
          <div className="flex m-auto w-[40%] pt-4 border-b-2 border-black"></div>
          <div className="container flex flex-row justify-around h-12 my-16">
            <input
              value={producto?.name}
              type="text"
              name="nombre"
              onChange={(e) => handleInput(e)}
              className="rounded-lg bg-white/70 pl-4"
              placeholder="Nombre del producto"
            />
            <div>
              <label htmlFor="precio">Precio: </label>
              <input
                value={producto?.price}
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
                value={producto?.stock}
                type="number"
                name="stock"
                onChange={(e) => handleInput(e)}
                className="rounded-lg bg-white/70 pl-4"
                placeholder="Stock inicial"
              />
            </div>
          </div>
  
          <textarea
            value={producto?.description}
            name="descripcion"
            onChange={(e) => handleInput(e)}
            className="flex m-auto w-[80%] rounded-lg bg-white/70 p-4 h-[30vh] mb-8"
            placeholder="Descripción"
          />


  
          <div className="grid grid-cols-[1fr_4fr] gap-4 w-[80%] mx-auto mb-4 ">
            <div>
              <img src={img? img: producto?.image} alt="" />
            </div> <br />
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
              <p className="bg-white/70 rounded-lg px-2">Cambiar imagen?</p>
            </label>
            {/* <div className="categoriasagregadas grid grid-cols-7 bg-white/70 rounded-lg gap-4">
              {inputs.imagen.map((img) => {
                return (
                  <div className="bg-white/70 flex flex-row rounded-lg gap-1">
                    <p>{img}</p>
                    <AiFillCloseCircle
                      className=""
                      onClick={() => deleteImg(img)}
                    />
                  </div>
                );
              })}
            </div> */}
          </div>
  
          <div className="grid grid-cols-[.5fr_4fr] justify-self-center gap-4 w-[80%] m-auto">
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
            <div className="categoriasagregadas grid grid-cols-7 bg-white/70 rounded-lg gap-4 ">
              {producto?.category?.map((cate) => {
                return (
                  <div className="bg-white/70 flex flex-row rounded-lg w-fit pl-2">
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
          <div className="flex justify-end">
            <button
              onClick={() => {
                handleCreateOrder();
              }}
              className="mt-20 mb-4 bg-black text-white w-[10%] rounded-sm p-2 "
            >
              EDITAR PRODUCTO
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditarProducto;
  