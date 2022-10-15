import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/productdetail/ProductDetail";
import Home from "./components/Home";
import ProductDetail from "./components/productdetail/ProductDetail";
import Products from "./components/products/Products";

function App() {
  return (
  <NavBar />
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
