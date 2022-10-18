import { useAppDispatch } from "../app/hooks";
import { filter } from "./products/productSlice";

const Caregorias = () => {
  const dispatch = useAppDispatch();

  const handleClick = (event: any) => {
    console.log(event.target.value);
    if (event.target.value.length) dispatch(filter(event.target.value));
  };

  return (
    <div
      className="grid fixed justify-items-start
    ml-4
    
    text-lg
    rounded-xl
    bg-slate-500/50 z-1 h-1/2 w-[10%] p-4"
    >
      <label className="text-xl text-slate-200">Filters: </label>
      <button
        name="Cabello"
        value="Cabello"
        onClick={(event) => handleClick(event)}
        className="my-4 px-4 border-b border-gray-600 hover:text-white"
      >
        Cabello
      </button>
      <button
        name="Barba"
        value="Barba"
        onClick={(event) => handleClick(event)}
        className="my-4 px-4 border-b border-gray-600 hover:text-white"
      >
        Barba
      </button>
      <button
        name="Afeitado"
        value="Afeitado"
        onClick={(event) => handleClick(event)}
        className="my-4 px-4 border-b border-gray-600 hover:text-white"
      >
        Afeitado
      </button>
      <button
        name="Facial"
        value="Facial"
        onClick={(event) => handleClick(event)}
        className="my-4 px-4 border-b border-gray-600 hover:text-white"
      >
        Facial
      </button>
      <button
        name="Accesorios"
        value="Accesorios"
        onClick={(event) => handleClick(event)}
        className="my-4 px-4 border-b border-gray-600 hover:text-white"
      >
        Accesorios
      </button>
    </div>
  );
};

export default Caregorias;
