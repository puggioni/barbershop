import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./components/products/Products";
import ProductDetail from "./components/productdetail/ProductDetail"
import CreateUser from "./components/user/CreateUser";
import LoginUser from "./components/user/LoginUser";
function App() {
  return (
  
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />}></Route>
        <Route path="/product/:idProduct" element={<ProductDetail />} />
        <Route path="/user/create" element={<CreateUser/>} />
        <Route path="/user/login" element={<LoginUser/>} />
      </Routes>
    </div>
  );
}

export default App;
