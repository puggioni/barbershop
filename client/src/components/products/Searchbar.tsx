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

  return (
    <div className="relative lg:mt-0 mt-6 mx-8">
      <input
        onChange={handleChange}
        name="tosearch"
        className="border border-black lg:rounded-md w-full pl-2 lg:h-full h-[5vh]"
        value={tosearch}
        type="text"
        placeholder="Search"
      />

      <BsSearch
        className="absolute lg:top-1 top-3 right-1 cursor-pointer"
        stroke="currentColor"
        onClick={(event) => {
          search(event);
        }}
      />
    </div>
  );
};

export default SearchBar;
