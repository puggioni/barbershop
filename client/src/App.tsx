import React from "react";
// import data from "./mockdata";
import { Routes, Route } from "react-router-dom";
// import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/productdetail/ProductDetail";
import Home from "./components/Home";
import Products from "./components/Products";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
