import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/products/ProductDetail";
import Products from "./components/products/Products";
import CreateUser from "./components/user/createUser";
import LoginUser from "./components/user/LoginUser";

import Perfil from "./components/user/Perfil";

import Reserve from "./components/Reserve/Reserve";
import BarberDetail from "./components/Reserve/BarberDetail";
import NavBar from "./components/NavBar";
import Compra from "./components/carrito/Compra";
import Users from "./components/admin/Users";
import Categorias from "./components/admin/Categorias";
import Prod from "./components/admin/Products";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*=====================productos===============================*/}
        <Route path="/product" element={<Products />}></Route>
        <Route path="/product/:idProduct" element={<ProductDetail />} />
        <Route path="/products/shopping-cart" element={<Compra />} />
        {/*=====================user===============================*/}
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/perfil" element={<Perfil />} />
        {/*===================turno=================================*/}
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reserve/barber" element={<BarberDetail />} />
        {/*===================admin=================================*/}
        <Route path="/admin/user" element={<Users />} />
        <Route path="/admin/products" element={<Prod />} />
        <Route path="/admin/categorias" element={<Categorias />} />
        <Route path="/admin/compras" element={<Compra />} />
      </Routes>
    </div>
  );
}

export default App;
