import { useEffect, useState } from "react";
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearProducDetail, productDetail } from "../slices/productSlice";
import ReviewsProduct from "./ReviewsProduct";

type QuizParams = {
  idProduct: string;
};

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const { idProduct } = useParams<QuizParams>();
  const { product } = useAppSelector((state) => state.products);

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (idProduct) {
      dispatch(productDetail(idProduct));
    }
    return () => {
      dispatch(clearProducDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paraCarrito = {
    available: product?.available,
    image: product?.image,
    name: product?.name,
    price: product?.price,
    rating: product?.rating,
    _id: product?._id,
  };

  //====================handlers=====================================
  const handleClick = (event: any) => {
    event.preventDefault();
    let productos: any = JSON.parse(
      window.localStorage.getItem("product") || "[]"
    );
    const prod = productos.findIndex(
      (prod: { productos: any; _id: string | undefined }) =>
        prod.productos._id === paraCarrito._id
    );

    if (prod !== -1) {
      productos[prod].cantidad = cantidad;
      window.localStorage.setItem("product", JSON.stringify(productos));
    } else {
      productos.push({ productos: paraCarrito, cantidad: cantidad });
      window.localStorage.setItem("product", JSON.stringify(productos));
    }
  };

  const handleCantidadChange = (event: any) => {
    if (product?.stock) {
      if (cantidad > 0 && cantidad < product?.stock) {
        setCantidad(event.target.value);
      } else if (cantidad > 0) {
        setCantidad(product?.stock);
      } else {
        setCantidad(1);
      }
    }
  };

  const handleInputChange = (event: any) => {
    setCantidad(event.target.value);
  };

  const handleAgregar = () => {
    if (product?.stock && cantidad > 0 && cantidad < product?.stock) {
      setCantidad((prev) => {
        return prev + 1;
      });
    }
  };

  const handleRestar = () => {
    if (cantidad > 1) {
      setCantidad((prev) => {
        return prev - 1;
      });
    }
  };
  //====================render=====================================
  return (
    <div className="pt-20 bg-white bg-store-banner bg-no-repeat pb-8 bg-contain font-homenaje rounded-xl">
      <div className="  mx-20 bg-white rounded-xl">
        <div className="border-2 border-black rounded-xl">
          {product ? (
            <div>
              <div className="grid grid-cols-[1fr_2fr]">
                <div className=" overflow-hidden p-4">
                  <img className="" src={product.image} alt="product" />
                </div>

                <div className="flex flex-col  ">
                  <div className="flex flex-row mt-16 border-b border-black gap-8 mr-[30%] ml-12 ">
                    <h1 className=" text-center text-3xl">{product.name}</h1>
                    <h2 className=" text-[#855C20] text-3xl">
                      $ {product.price}
                    </h2>
                  </div>

                  <p className="h-[30vh] mr-4 my-12">{product.description}</p>

                  <div className="flex flex-row gap-8 mb-16 ml-8">
                    <div className="flex flex-row relative border border-black py-1 pr-2 mr-4 items-center text-center">
                      <input
                        type="text"
                        className="pl-4 w-10"
                        name="cantidad"
                        value={cantidad}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => {
                          handleCantidadChange(e);
                        }}
                      />
                      <div>
                        <HiOutlineArrowLongUp
                          onClick={() => {
                            handleAgregar();
                          }}
                          size={10}
                          className="cursor-pointer mt-1"
                        />
                        <HiOutlineArrowLongDown
                          onClick={() => {
                            handleRestar();
                          }}
                          size={10}
                          className=" cursor-pointer mb-1"
                        />
                      </div>
                    </div>
                    <button
                      disabled={product?.stock ? false : true}
                      onClick={(event) => {
                        handleClick(event);
                      }}
                      className="text-[#855C20] border mr-4 border-[#855C20] py-1 px-10 select-none	"
                    >
                      Agregar al Carrito
                    </button>
                    {!product?.stock && (
                      <p className="border-none outline-none ml-4 text-red-500 text-xl">
                        Sin stock
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center text-2xl mt-8 select-none">
                  COMENTARIOS
                </div>
                <div className="justify-center mx-auto border-b border-black w-[50%]"></div>
                <div className=" flex-col ml-4 md:ml-16">
                  <ReviewsProduct
                    reviews={product.reviews}
                    idProduct={idProduct}
                  />
                </div>
              </div>
            </div>
          ) : (
            <h1>El producto requerido no existe o no esta activo🤔</h1>
          )}
        </div>
      </div>
    </div>
  );
}
