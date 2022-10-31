import React from "react";
import { AiFillLeftSquare, AiFillRightSquare } from "react-icons/ai";
interface props {
  allProducts: number;
  productsPerPage: number;
  setCurrentPage: any;
  currentPage: number;
  maxPageNumberLimit: number;
  setMaxPageNumberLimit: any;
  pageLimit: number;
  setMinPageNumberLimit: any;
  minPageNumberLimit: number;
}

const Paginate = (props: props) => {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.allProducts / props.productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const handleNextBtn = () => {
    props.setCurrentPage((prev: number) => prev + 1);
    if (props.currentPage + 1 > props.maxPageNumberLimit) {
      props.setMaxPageNumberLimit(props.maxPageNumberLimit + props.pageLimit);
      props.setMinPageNumberLimit(props.minPageNumberLimit + props.pageLimit);
    }
  };
  const handlePrevBtn = () => {
    props.setCurrentPage((prev: number) => prev - 1);
    if ((props.currentPage - 1) % props.pageLimit == 0) {
      props.setMaxPageNumberLimit(props.maxPageNumberLimit - props.pageLimit);
      props.setMinPageNumberLimit(props.minPageNumberLimit - props.pageLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > props.maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={handleNextBtn} className="list-none">
        &hellip;
      </li>
    );
  }
  let pageDecrement = null;
  if (pageNumbers.length < props.maxPageNumberLimit) {
    pageDecrement = pageIncrementBtn = (
      <li onClick={handlePrevBtn} className="list-none">
        &hellip;
      </li>
    );
  }
  return (
    <div className="text-center w-100% flex items-center ">
      <button onClick={handlePrevBtn}>
        <AiFillLeftSquare />
      </button>
      {pageDecrement}
      {pageNumbers.map((page, index) => {
        if (
          page < props.maxPageNumberLimit + 1 &&
          page > props.minPageNumberLimit
        ) {
          return (
            <button
              key={index}
              className="border border-black rounded-lg mx-2"
              onClick={() => props.setCurrentPage(page)}
            >
              {page}
            </button>
          );
        } else {
          return null;
        }
      })}
      {pageIncrementBtn}
      <button onClick={handleNextBtn}>
        <AiFillRightSquare />
      </button>
    </div>
  );
};

export default Paginate;
