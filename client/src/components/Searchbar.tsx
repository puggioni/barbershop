import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const handleClick = (event: any) => {
    //event.preventDefault();
    console.log(event);
  };
  return (
    <div className="mx-auto max-w-md relative">
      <input
        className="peer cursor-pointer z-10 h-8 w-12 rounded-full border bg-transparent pl-5 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
        type="search "
        placeholder=""
      />
      <BsSearch
        className="absolute top-1 my-auto h-6 w-12 border-r border-transparent stroke-gray-500  peer-focus:border-lime-300 peer-focus:stroke-lime-500"
        stroke="currentColor"
        onClick={(event) => {
          handleClick(event);
        }}
      />
    </div>
  );
};

export default SearchBar;
