import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllProducts, filter } from "../slices/productSlice";

const Caregorias = ({ resetPage, hide }: any) => {
  const dispatch = useAppDispatch();
  const { categorias } = useAppSelector((state) => state.products);
  const getAllProducts = () => {
    dispatch(fetchAllProducts(""));
  };

  //===========================handler========================
  const handleClick = (event: any) => {
    if (event.target.value.length) {
      dispatch(filter(event.target.value));
      resetPage();
    }
  };

  //=====================render=======================
  return (
    <div
      className={`font-Hubballi lg:flex ${
        hide ? "hidden" : ""
      } justify-center lg:flex-wrap lg:my-4 grid grid-cols-3 `}
    >
      <button
        key={"all"}
        onClick={() => getAllProducts()}
        className="border-r-2 lg:px-8 lg:my-0 px-2 my-2 border-black "
      >
        Todos
      </button>
      {categorias?.map((cate) => {
        return (
          <button
            key={cate._id}
            name={cate.name}
            value={cate.name}
            onClick={(event) => handleClick(event)}
            className="border-r-2 lg:px-8 lg:my-0 px-2 my-2 border-black "
          >
            {cate.name}
          </button>
        );
      })}
    </div>
  );
};

export default Caregorias;
