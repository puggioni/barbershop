import { useAppDispatch } from "../../app/hooks";
import { orderByName, orderByPrice } from "../slices/productSlice";

export const OrderingByName = (hidden: { hidden: boolean }) => {
  const dispatch = useAppDispatch();

  const handleClick = (event: any) => {
    if (event.target.value.length) dispatch(orderByName(event.target.value));
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
    if (event.target.value.length) dispatch(orderByPrice(event.target.value));
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
