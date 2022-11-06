import { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
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

export const OrderingPriceResp = (hidden: { hidden: boolean }) => {
  const dispatch = useAppDispatch();
  const h = hidden.hidden ? "" : "hidden";
  const [arrow, setArrow] = useState(true);
  const [value, setValue] = useState("barato");

  const handleClick = (event: any) => {
    if (event.target.value.length) {
      dispatch(orderByPrice(event.target.value));
    }

    setValue(arrow ? "caro" : "barato");
    setArrow(!arrow);
  };

  return (
    <div className={`flex items-center ${h}`}>
      <button onClick={(event) => handleClick(event)} value={value}>
        Precio
      </button>
      {arrow ? <BsArrowDownShort /> : <BsArrowUpShort />}
    </div>
  );
};

export const OrderingAlfaResp = (hidden: { hidden: boolean }) => {
  const dispatch = useAppDispatch();
  const h = hidden.hidden ? "" : "hidden";
  const [arrow, setArrow] = useState(true);
  const [value, setValue] = useState("name-asc");

  const handleClick = (event: any) => {
    if (event.target.value.length) {
      dispatch(orderByName(event.target.value));
    }

    setValue(arrow ? "name-des" : "name-asc");
    setArrow(!arrow);
  };

  return (
    <div className={`flex items-center ${h}`}>
      <button onClick={(event) => handleClick(event)} value={value}>
        Alfabetico
      </button>
      {arrow ? <BsArrowDownShort /> : <BsArrowUpShort />}
    </div>
  );
};
