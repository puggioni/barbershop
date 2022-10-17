import SearchBar from "./Searchbar";
import { VscMenu } from "react-icons/vsc";
import { useState } from "react";

const handleClick = () => {};

const NavBar = () => {
  const [expandSearch, setExpand] = useState("");
  let hideTitle = "";
  if (expandSearch.length) {
    hideTitle = "hidden";
  }
  return (
    <div className="bg-stone-50 p-2 grid grid-flow-col justify-items-center items-center grid-cols-3">
      <VscMenu onClick={() => handleClick()} className=" " />
      <h2
        className={`gap-4 font-mono  align-center ${hideTitle} lg:text-3xl lg:font-extrabold`}
      >
        Henry Barber
      </h2>
      <SearchBar expandSearch={expandSearch} setSearch={setExpand} />
    </div>
  );
};

export default NavBar;
