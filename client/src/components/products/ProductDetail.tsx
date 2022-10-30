import { useCallback, useEffect, useState } from "react";
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { clearProducDetail, productDetail } from "../slices/productSlice";
import ReviewsProduct from "./ReviewsProduct";

type QuizParams = {
  idProduct: string;
};

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const { idProduct } = useParams<QuizParams>();
  const { product } = useAppSelector((state: RootState) => state.products);
  let navigate = useNavigate();
  const buttonStyle =
    "m-auto px-3 py-1.5 bg-white rounded-lg border-2 border-black text-black";

  const inicializar = useCallback(async () => {
    if (idProduct) {
      dispatch(productDetail(idProduct));
    }
  }, [dispatch, idProduct]);

  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    inicializar();
    return () => {
      dispatch(clearProducDetail());
    };
  }, [dispatch, inicializar]);

  function goBack(): void {
    navigate(-1);
  }
  const paraCarrito = {
    available: product?.available,
    image: product?.image,
    name: product?.name,
    price: product?.price,
    rating: product?.rating,
    _id: product?._id,
  };
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
    setCantidad(parseInt(event.target.value));
  };

  return (
    <div className="pt-20 bg-white bg-store-banner bg-no-repeat pb-8 bg-contain font-homenaje rounded-xl">
      <div className="  mx-20 bg-white rounded-xl">
        <div className="border-2 border-black rounded-xl">
          {product ? (
            <div className="grid grid-cols-[1fr_2fr]">
              <div className=" overflow-hidden p-4">
                <img className="" src={product.image} alt="product" />
              </div>

              <div className="flex flex-col  ">
                <div className="flex flex-row mt-16 border-b border-black gap-8 mr-[30%] ml-12 ">
                  <h1 className=" text-center text-3xl">{product.name}</h1>
                  <h2 className=" text-[#C0914CA1] text-3xl">
                    $ {product.price}
                  </h2>
                </div>

                <p className="h-[30vh] mr-4 my-12">{product.description}</p>

                <div className="flex flex-row mb-16 ml-8">
                  <div className="relative border border-black py-1 pr-2 mr-4 items-center text-center">
                    <input
                      type="text"
                      className="pl-4 w-12"
                      name="cantidad"
                      value={cantidad}
                      onChange={(e) => {
                        handleCantidadChange(e);
                      }}
                    />
                    <HiOutlineArrowLongDown
                      onClick={(e) => {
                        setCantidad((prev) => prev - 1);
                        handleCantidadChange(e);
                      }}
                      size={10}
                      className="absolute bottom-0 right-0 cursor-pointer mb-1"
                    />
                    <HiOutlineArrowLongUp
                      onClick={(e) => {
                        setCantidad((prev) => prev + 1);
                        handleCantidadChange(e);
                      }}
                      size={10}
                      className="absolute top-0 right-0 cursor-pointer mt-1"
                    />
                  </div>
                  <button
                    onClick={(event) => {
                      handleClick(event);
                    }}
                    className="text-[#C0914CA1] border border-[#C0914CA1] py-1 px-10"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h1>El producto requerido no existe o no esta activo🤔</h1>
          )}
        </div>

        <div className="">
          <div className="flex flex-col ml-4 md:ml-16">
            {product ? (
              <ReviewsProduct reviews={product.reviews} idProduct={idProduct} />
            ) : (
              <>Agrega un review al producto</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
