import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filter } from "../slices/productSlice";

const Caregorias = ({ resetPage }: any) => {
  const dispatch = useAppDispatch();
  const { categorias } = useAppSelector((state) => state.products);

  const handleClick = (event: any) => {
    if (event.target.value.length) {
      dispatch(filter(event.target.value));
      resetPage();
    }
  };
  return (
    <div className="font-Hubballi flex justify-center flex-wrap my-4">
      {categorias?.map((cate) => {
        return (
          <button
            name={cate.name}
            value={cate.name}
            onClick={(event) => handleClick(event)}
            className="border-r-2 px-8 border-black "
          >
            {cate.name}
          </button>
        );
      })}
    </div>
  );
};

export default Caregorias;
