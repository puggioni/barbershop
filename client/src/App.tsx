import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/products/ProductDetail";
import Products from "./components/products/Products";
import CreateUser from "./components/user/createUser";
import LoginUser from "./components/user/LoginUser";

import Perfil from "./components/user/Perfil";

import Reserve from "./components/Reserve/Reserve";
import BarberDetail from "./components/Reserve/BarberDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />}></Route>
        <Route path="/product/:idProduct" element={<ProductDetail />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/login" element={<LoginUser />} />

        <Route path="/user/perfil" element={<Perfil />} />

        <Route path="/reserve" element={<Reserve />} />
        <Route path="reserve/barber" element={<BarberDetail />} />
      </Routes>
    </div>
  );
}

export default App;
