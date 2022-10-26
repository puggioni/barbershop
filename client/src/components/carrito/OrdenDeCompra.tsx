import { RiArrowGoBackFill } from "react-icons/ri";

const OrdenDeCompra = () => {
  return (
    <div>
      <div className="bg-black">
        <div className="bg-white">
          <h1>ORDEN DE COMPRA</h1>
          <div className="border border_black">
            <div>
              <div>id compra</div>
              <div>listado de prods</div>
            </div>
            <div>total</div>
            <div>$</div>
          </div>
          <RiArrowGoBackFill />
        </div>
      </div>
    </div>
  );
};

export default OrdenDeCompra;
