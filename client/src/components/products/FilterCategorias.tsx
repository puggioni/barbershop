import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filter } from "../slices/productSlice";

const Caregorias = () => {
  const dispatch = useAppDispatch();
  const { categorias } = useAppSelector((state) => state.products);

  const handleClick = (event: any) => {
    if (event.target.value.length) dispatch(filter(event.target.value));
  };
  return (
    <div
      className="grid fixed justify-items-start
    ml-4 text-lg rounded-xl bg-slate-500/50 z-1 h-1/2 w-[10%] p-4 font-semibold"
    >
      <label className="text-xl text-slate-200">Filters: </label>
      {categorias?.map((cate) => {
        return (
          <button
            name={cate.name}
            value={cate.name}
            onClick={(event) => handleClick(event)}
            className="my-4 px-4 border-b border-gray-600 hover:text-white"
          >
            {cate.name}
          </button>
        );
      })}
    </div>
  );
};

export default Caregorias;
