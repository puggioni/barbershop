import { useState} from "react";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllProducts} from "../slices/productSlice";
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
  
  const data = useAppSelector((state: RootState) => state.products);
  const copyProducts = useAppSelector((state: RootState) => state.products.copyAllProducts);

  function search(searchTerm: any) {
    setTosearch(searchTerm);
    console.log(searchTerm);
  }

  function HandlertoSearch(e: any) {
    dispatch(fetchAllProducts(tosearch));
    setTosearch("");
  }

  function handleChange(e: evento) {
    if (e.target.name === "tosearch") setTosearch(e.target.value);
  }



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
      {tosearch? 
      <div className="cursor-pointer bg-white border-black border position: absolute z-10 rounded-lg">
        {copyProducts
          ?.filter((item) => {
            const searchTerm = tosearch.toLowerCase();
            const itemName = item.name.toLowerCase();

            return (
              searchTerm &&
              itemName.includes(searchTerm) &&
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
      :<></>}
    </div>
  );
};

export default SearchBar;