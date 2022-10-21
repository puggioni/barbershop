import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { sortProductsByName, sortProductsByPrice } from "../slices/productSlice";

export const OrderingByName = ()=>{
    const dispatch=useAppDispatch();

    const handleClick = (event: any) => {
      if (event.target.value.length) dispatch(sortProductsByName(event.target.value));
    };

    return (
    <select className='' onChange={(event)=>handleClick(event)}>
      <option>ORDERING</option>
      <option value='name-asc'>A-Z</option>
      <option value='name-desc'>Z-A</option>
  </select>  
  )
}

export const OrderingByPrice = ()=>{
  const dispatch=useAppDispatch();

  const handleClick = (event: any) => {
    if (event.target.value.length) dispatch(sortProductsByPrice(event.target.value));
  };

  return (
  <select className='' onChange={(event)=>handleClick(event)}>
    <option>PRICE</option>
    <option value='caro'>caro</option>
    <option value='barato'>barato</option>
</select>  
)
}

// export default {OrderingByName, OrderingByPrice}