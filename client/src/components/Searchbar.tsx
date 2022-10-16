import { Form } from "react-router-dom";
import {useState} from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllProducts } from "./products/productSlice";

type evento={
target: eventarget;
}
type eventarget={
  value: string;
  name: string;
}



const SearchBar = () => {
  const dispatch=useAppDispatch();

  function search(e:any){
    e.preventDefault();
    dispatch(fetchAllProducts(tosearch));
    setTosearch("");
  }
  function handleChange(e:evento){
    if(e.target.name==="tosearch") setTosearch(e.target.value);
  }
  const [tosearch, setTosearch]=useState("");
  return (
    <form onSubmit={search} className="relative flex flex-row border-black border-solid border-2 p-1 w-22 rounded-lg">
        <input onChange={handleChange} name="tosearch" className=" w-20" type="search " placeholder="Search..." />
        <button  className="w-10" type="submit" >Go</button>
    </form>
  )}

export default SearchBar;