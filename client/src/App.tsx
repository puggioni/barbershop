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
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { firebaseConfig } from "./firebase";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />}></Route>
        <Route path="/product/:idProduct" element={<ProductDetail />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/perfil" element={<Perfil />} />
        <Route path="/sucursales" element={<Reserve />} />
        <Route path="/reserve/barber" element={<BarberDetail />} />
        <Route path="/products/shopping-cart" element={<Compra />} />
      </Routes>
    </div>
  );
}

export default App;
