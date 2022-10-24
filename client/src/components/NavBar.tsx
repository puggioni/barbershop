import { useState } from "react";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import { MdFavoriteBorder } from "react-icons/md";
import SearchBar from "./products/Searchbar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
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
      <Link to={"/"}>
        <h2
          className={`gap-4 font-mono  align-center ${hideTitle} lg:text-3xl lg:font-extrabold`}
        >
          Henry Barber
        </h2>
      </Link>
      <SearchBar expandSearch={expandSearch} setSearch={setExpand} />

      <Link title="ir al Carrito" to={"/products/shopping-cart"}>
        <AiOutlineShoppingCart size={40} className="mx-4" />
      </Link>
      <Link title="ir a Favoritos" to={"/products/favorites"}>
        <MdFavoriteBorder size={40} className="mx-4" />
      </Link>
    </div>
  );
}; 

export default NavBar;




    //<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    //   <div className="container flex flex-wrap justify-between items-center mx-auto">
    //   <a href="https://flowbite.com/" className="flex items-center">
    //       <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Henry Barber</span>
    //   </a>
    //   <div className="flex md:order-2">
    //     <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
    //       <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
    //       <span className="sr-only">Search</span>
    //     </button>
    //     <div className="hidden relative md:block">
    //       <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
    //         <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
    //         <span className="sr-only">Search icon</span>
    //       </div>
    //       <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
    //     </div>
    //     <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
    //       <span className="sr-only">Open menu</span>
    //       <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    //     </button>
    //   </div>
    //     <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
    //       <div className="relative mt-3 md:hidden">
    //         <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
    //           <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
    //         </div>
    //         <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
    //       </div>
    //       <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li>
    //           <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
    //         </li>
    //         <li>
    //           <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
    //         </li>
    //         <li>
    //           <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    