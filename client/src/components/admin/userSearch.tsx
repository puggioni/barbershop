import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch } from "../../app/hooks";
import { searchUser } from "../slices/admin";

const UserSearch = () => {
  const [searchParam, setSearchParam] = useState("");
  const dispatch = useAppDispatch();

  function search(e: any) {
    e.preventDefault();
    if (searchParam.length) {
      dispatch(searchUser(searchParam));
      setSearchParam("");
    }
  }

  function handleChange(e: { target: { value: string; name: string } }) {
    if (e.target.name === "searchParam") setSearchParam(e.target.value);
  }

  return (
    <div className="relative w-3/4 mx-8">
      <input
        onChange={handleChange}
        name="searchParam"
        className="border border-black rounded-md w-full pl-2 "
        value={searchParam}
        type="text"
        placeholder="Search"
      />

      <BsSearch
        className="absolute  top-1 right-1 cursor-pointer"
        stroke="currentColor"
        onClick={(event) => {
          search(event);
        }}
      />
    </div>
  );
};

export default UserSearch;
