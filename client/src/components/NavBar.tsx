import SearchBar from "./Searchbar";
import { VscMenu } from "react-icons/vsc";

const handleClick = () => {};

const NavBar = () => {
  return (
    <div className="bg-stone-50 p-2 grid grid-flow-col justify-items-center items-center grid-cols-3">
      <VscMenu onClick={() => handleClick()} className=" " />
      <h2 className={"gap-4 font-display text-xl align-center"}>HENRY BARBER</h2>
      <SearchBar />
    </div>
  );
};

export default NavBar;
