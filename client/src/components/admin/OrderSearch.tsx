import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import useHeaders from "../../app/header";
import { useAppDispatch } from "../../app/hooks";
import { searchOrderId, searchOrderName } from "../slices/admin";

const OrderSearch = ({ searchBy }: any) => {
  const [searchParam, setSearchParam] = useState("");
  const dispatch = useAppDispatch();
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");
  const header = useHeaders(token);

  //===================handlers============
  const search = (e: any) => {
    e.preventDefault();
    if (searchParam.length) {
      if (searchBy === "name") {
        dispatch(searchOrderName(searchParam));
      } else {
        dispatch(searchOrderId(header.headers, searchParam));
      }
      setSearchParam("");
    }
  };
  const handleChange = (e: { target: { value: string; name: string } }) => {
    if (e.target.name === "searchParam") {
      setSearchParam(e.target.value);
    }
  };

  //=================render=================
  return (
    <div className="relative w-[25%] mx-8 ">
      <input
        onChange={handleChange}
        name="searchParam"
        className="border border-black rounded-md w-full h-12 pl-2 outline-none"
        value={searchParam}
        type="text"
        placeholder="Search"
      />

      <BsSearch
        className="absolute  top-3 right-1 cursor-pointer"
        stroke="currentColor"
        size={20}
        onClick={(event) => {
          search(event);
        }}
      />
    </div>
  );
};

export default OrderSearch;
