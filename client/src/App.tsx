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
import Favorites from "./components/products/Favorites";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { firebaseConfig } from "./firebase";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


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
        <Route path="/products/shopping-cart" element={<Compra />} />
        <Route path="/products/favorites" element={<Favorites />} />
        {/*=====================user===============================*/}
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/perfil" element={<Perfil />} />

        <Route path="/sucursales" element={<Reserve />} />

        {/*===================turno=================================*/}
        <Route path="/reserve" element={<Reserve />} />

        <Route path="/reserve/barber" element={<BarberDetail />} />

        

      </Routes>
    </div>
  );
}

export default App;
