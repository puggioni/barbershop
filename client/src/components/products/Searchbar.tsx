import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch } from "../../app/hooks";
import { fetchAllProducts } from "../slices/productSlice";

type evento = {
  target: eventarget;
};
type eventarget = {
  value: string;
  name: string;
};

const SearchBar = () => {

  const [tosearch, setTosearch] = useState("");
  const dispatch = useAppDispatch();

  function search(e: any) {
    e.preventDefault();

    if (tosearch.length) {
      setTosearch("");
      dispatch(fetchAllProducts(tosearch));
    }
  }

  function handleChange(e: evento) {
    if (e.target.name === "tosearch") setTosearch(e.target.value);
  }

//----------------------de aca para abajo lo de la busqueda con sugerencia------------------

  return (
    <div className="relative mx-8">
      <input
        onChange={handleChange}
        name="tosearch"
        className="border border-black rounded-md w-full pl-2 "
        value={tosearch}
        type="text"
        placeholder="Search"
      />

      <BsSearch
        className="absolute  top-1 right-1 cursor-pointer"
        stroke="currentColor"
        onClick={(event) => {
          search(event);
        }}
      />
   
    </div>
  );
};

export default SearchBar;