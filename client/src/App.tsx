import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/productdetail/ProductDetail";
import Products from "./components/products/Products";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
