import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllProducts } from "../slices/productSlice";
import { RootState } from "../../app/store";

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

  function search(searchTerm: any) {
    setTosearch(searchTerm);
  }

  function HandlertoSearch(e: any) {
    dispatch(fetchAllProducts(tosearch));
    setTosearch("");
  }

  function handleChange(e: evento) {
    if (e.target.name === "tosearch") setTosearch(e.target.value);
  }

  const data = useAppSelector((state: RootState) => state.products);

  return (
    <div className="relative mx-8">
      <div>
        <input
          onChange={handleChange}
          name="tosearch"
          className="border border-black rounded-md w-full pl-2 "
          value={tosearch}
          type="text"
          autoComplete="off"
          placeholder="Buscar..."
        />

        <BsSearch
          className="absolute  top-1 right-1 cursor-pointer"
          stroke="currentColor"
          onClick={() => {
            HandlertoSearch(tosearch);
          }}
        />
      </div>
      <div className="cursor-pointer">
        {data.allProducts
          ?.filter((item) => {
            const searchTerm = tosearch.toLowerCase();
            const itemName = item.name.toLowerCase();

            return (
              searchTerm &&
              itemName.startsWith(searchTerm) &&
              itemName !== searchTerm
            );
          })
          .slice(0, 10)
          ?.map((item) => (
            <div className="p-2" onClick={() => search(item.name)}>
              {item.name}
            </div>
          ))}
      </div>
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

// function search(e: any) {
//   e.preventDefault();

//   if (tosearch.length) {
//     setTosearch(e);
//     dispatch(fetchAllProducts(tosearch));
//   }
// }
