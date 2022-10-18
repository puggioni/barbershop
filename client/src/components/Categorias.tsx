import { useAppDispatch } from "../app/hooks";
import { filter } from "./products/productSlice";

const Caregorias = () => {
  const dispatch = useAppDispatch();

  
  const handleClick = (event: any) => {
    console.log(event.target.value);
    if(event.target.value.length)
    dispatch(filter(event.target.value));
  };

  return (
    <ul>
      <li>
        <button
          name="Cabello"
          value="Cabello"
          onClick={(event) => handleClick(event)}
        >
          Cabello
        </button>
        <button
          name="Barba"
          value="Barba"
          onClick={(event) => handleClick(event)}
        >
          Barba
        </button>
        <button
          name="Afeitado"
          value="Afeitado"
          onClick={(event) => handleClick(event)}
        >
          Afeitado
        </button>
        <button
          name="Facial"
          value="Facial"
          onClick={(event) => handleClick(event)}
        >
          Facial
        </button>
        <button
          name="Accesorios"
          value="Accesorios"
          onClick={(event) => handleClick(event)}
        >
          Accesorios
        </button>
      </li>
    </ul>
  );
};

export default Caregorias;
