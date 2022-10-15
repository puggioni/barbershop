const SearchBar = () => {
  return (
    <div className="relative flex flex-row border-black border-solid border-2 p-1 w-22 rounded-lg">
        <input  className="w-14" type="search " placeholder="Search..." />
        <button className="w-10" type="submit" >Go</button>
    </div>
  )}

export default SearchBar;