import SearchBar from "./Searchbar";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import { useState } from "react";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [expandSearch, setExpand] = useState("");
  let hideTitle = "";
  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  if (expandSearch.length) {
    hideTitle = "hidden";
  }
  return (
    <div className="bg-stone-50/70 p-2 grid grid-flow-col justify-items-center items-center grid-cols-3">
      <VscMenu
        size={25}
        className="flex justify-self-start ml-14"
        onClick={() => handleMenu()}
      />
      <div
        className={
          mobileMenu
            ? "fixed  z-10 left-0 top-0 w-[60%] bg-black/95 lg:w-[20%] h-full shadow-md ease-in-out duration-500"
            : " fixed z-10 left-[-100%] top-0 bg-black/95   h-full shadow-md ease-in-out duration-500"
        }
      >
        <VscChromeClose
          onClick={() => handleMenu()}
          fill="white"
          size={20}
          className="absolute top-3 right-3"
        />
        <ul className=" pt-10 text-white border-r border-gray-600">
          <li className="p-4 mx-4 border-b border-gray-600">Home</li>
          <li className="p-4 mx-4 border-b border-gray-600">Store</li>
          <li className="p-4 mx-4 border-b border-gray-600">Sucursales</li>
          <li className="p-4 mx-4 border-b border-gray-600">Pedi Turno</li>
          <li className="p-4 mx-4">Contacto</li>
        </ul>
      </div>
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
