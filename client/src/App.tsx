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
import Users from "./components/admin/Users";
import Productos from "./components/admin/Productos";
import Sucursales from "./components/Reserve/Sucursales";
import OrdenDeCompra from "./components/carrito/OrdenDeCompra";
import Confirmacion from "./components/carrito/Cofirmacion";
import Cancelacion from "./components/carrito/Cancelacion";
import CrearProducto from "./components/admin/CrearProducto";
import EditarProducto from "./components/admin/EditarProducto";
import HistorialCompra from "./components/admin/HistorialCompra";
import OrderUsuario from "./components/admin/OrderUsuario";
import MyAppointments from "./components/Reserve/MyAppointments";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*=====================productos==========================*/}
        <Route path="/product" element={<Products />}></Route>
        <Route path="/products/favorites" element={<Favorites />} />
        <Route path="/product/:idProduct" element={<ProductDetail />} />
        {/* =====================compra============================== */}
        <Route path="/products/shopping-cart" element={<Compra />} />
        <Route path="/products/orden-de-compra" element={<OrdenDeCompra />} />
        <Route
          path="/products/confirmacion/:idOrder"
          element={<Confirmacion />}
        />
        <Route
          path="/products/cancelacion/:idOrder"
          element={<Cancelacion />}
        />
        {/*=====================user===============================*/}
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/perfil" element={<Perfil />} />
        {/*===================sucursales============================*/}
        <Route path="/sucursales" element={<Sucursales />} />
        {/*===================turno=================================*/}
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reserve/barber" element={<MyAppointments />} />
        {/*===================admin=================================*/}
        <Route path="/admin/compras" element={<HistorialCompra />} />
        <Route path="/admin/compras/:idOrder" element={<OrderUsuario />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<Productos />} />
        <Route
          path="/admin/products/crear-producto"
          element={<CrearProducto />}
        />
        <Route
          path="/admin/products/editar-producto/:idProduct"
          element={<EditarProducto />}
        />
      </Routes>
    </div>
  );
}

export default App;
