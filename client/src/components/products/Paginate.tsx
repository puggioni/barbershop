import React from "react";
interface props {
  allProducts: number;
  productsPerPage: number;
  setCurrentPage: any;
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

  return (
    <div className="text-center w-100%">
      {pageNumbers.map((page, index) => {
        return (
          <button
            className=" text-base border border-black bg-white text-gray-800  rounded py-1 px-3 my-10 mx-3 hover:bg-stone-900 hover:text-white"
            key={index}
            onClick={() => props.setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Paginate;
