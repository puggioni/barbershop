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

const SearchBar = (expand: any) => {
  const [tosearch, setTosearch] = useState("");
  const [colExpand, setCol] = useState("");
  const dispatch = useAppDispatch();

  function search(e: any) {
    e.preventDefault();
    if (!tosearch.length && !expand.expandSearch.length) {
      expand.setSearch("!w-full cursor-text border-black !pl-16 pr-4 ");
      setCol("col-start-2 col-end-4");
    } else if (!tosearch.length) {
      expand.setSearch("");
      setCol("");
    }
    if (tosearch.length) {
      setTosearch("");
      expand.setSearch("");
      setCol("");
      dispatch(fetchAllProducts(tosearch));
    }
  }

  function handleChange(e: evento) {
    if (e.target.name === "tosearch") setTosearch(e.target.value);
  }

  return (
    <div className={`mx-auto max-w-md relative ${colExpand} `}>
      <input
        onChange={handleChange}
        name="tosearch"
        className={`peer ${expand.expandSearch} transition-all cursor-pointer z-10 h-8  rounded-full border bg-transparent pl-5 outline-none w-12`}
        value={tosearch}
        type="search"
        placeholder=""
      />

      <BsSearch
        className="absolute top-1 my-auto h-6 w-12 border-r rounded-lg border-transparent stroke-gray-500  peer-focus:border-black peer-focus:stroke-black"
        stroke="currentColor"
        onClick={(event) => {
          search(event);
        }}
      />
    </div>
  );
};

export default SearchBar;

// const SearchBar = () => {
//   const handleClick = (event: any) => {
//     //event.preventDefault();
//     console.log(event);
//   };
//   return (
//     <div className="mx-auto max-w-md relative">
//       <input
//         className="peer cursor-pointer z-10 h-8 w-12 rounded-full border bg-transparent pl-5 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
//         type="search "
//         placeholder=""
//       />

//     </div>
//   );
// };
