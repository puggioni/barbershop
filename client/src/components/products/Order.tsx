import { useAppDispatch } from "../../app/hooks";
import {
  sortProductsByName,
  sortProductsByPrice,
} from "../slices/productSlice";

export const OrderingByName = (hidden: { hidden: boolean }) => {
  const dispatch = useAppDispatch();

  const handleClick = (event: any) => {
    if (event.target.value.length)
      dispatch(sortProductsByName(event.target.value));
  };
  const h = hidden.hidden ? "" : "hidden";

  return (
    <div className={`flex flex-col items-start gap-8 ${h}`}>
      <button onClick={(event) => handleClick(event)} value="name-asc">
        A-Z
      </button>
      <button onClick={(event) => handleClick(event)} value="name-desc">
        Z-A
      </button>
    </div>
  );
};

export const OrderingByPrice = (hidden: { hidden: boolean }) => {
  const dispatch = useAppDispatch();

  const handleClick = (event: any) => {
    if (event.target.value.length)
      dispatch(sortProductsByPrice(event.target.value));
  };
  const h = hidden.hidden ? "" : "hidden";

  return (
    <div className={`flex flex-col items-start gap-8 ${h}`}>
      <button onClick={(event) => handleClick(event)} value="caro">
        Mayor precio
      </button>
      <button onClick={(event) => handleClick(event)} value="barato">
        Menor precio
      </button>
    </div>
  );
};
