import React from "react";
import data from "./mockdata";
import {Routes, Route} from "react-router-dom";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/productdetail/ProductDetail";
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element=    {data.map((data) => (
        <ProductCard
          nombre={data.name}
          imagen={data.imagen}
          precio={data.precio}
          rating={data.rating}
        />
      ))} />
      <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    
    </div>
  );
}

export default App;
