import { RiArrowGoBackFill } from "react-icons/ri";

const cofirmacion = () => {
  return (
    <div className="h-screen bg-white">
      <div className="bg-black h-[30%] border border-black"></div>
      <div className="bg-white border-2 border-black -mt-8 mx-8">
        <h1 className="">COMPRA CONFIRMADA</h1>

        <div className="border border-black m-8 ">
          <div>
            <div className="grid grid-cols-2">id compra</div>
            <div>listado de prods</div>
          </div>

          <div>total</div>
          <div>$</div>
        </div>

        <RiArrowGoBackFill />
      </div>
    </div>
  );
};
// storage.removeItem(keyName);

export default cofirmacion;
