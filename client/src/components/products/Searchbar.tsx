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

  const copyProducts = useAppSelector(
    (state: RootState) => state.products.copyAllProducts
  );

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

  return (
    <div className="relative lg:mt-0 mt-6 mx-8">
      <div>
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
          onClick={() => {
            HandlertoSearch(tosearch);
          }}
        />
      </div>
      {tosearch ? (
        <div className="cursor-pointer bg-white border-black border absolute z-10 rounded-lg">
          {copyProducts
            .filter((item: any) => {
              const searchTerm = tosearch.toLowerCase();
              const itemName = item.name.toLowerCase();

              return (
                searchTerm &&
                itemName.includes(searchTerm) &&
                itemName !== searchTerm
              );
            })
            .slice(0, 10)
            ?.map((item: any) => (
              <div className="p-2" onClick={() => search(item.name)}>
                {item.name}
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
