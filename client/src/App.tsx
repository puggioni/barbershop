import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/productdetail/ProductDetail";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./components/products/Products";

function App() {
  return (
  
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />}></Route>
        <Route path="/product/:idProduct" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
