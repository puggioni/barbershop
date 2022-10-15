import SearchBar from "./Searchbar";

const NavBar = () => {
  return (
    <div className="bg-stone-50 p-2 pb-5 flex flex-row ">
      <h2 className="basis-1/2 font-mono">Hamburguesa</h2>
      <h2 className="basis-1/2 font-mono">Henry Barber</h2>
      <SearchBar />
    </div>
  );
};

export default NavBar;
