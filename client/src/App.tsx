import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import BorrarCategoria from "./components/admin/BorrarCategoria";
import CrearCategoria from "./components/admin/CrearCategorias";
import CrearProducto from "./components/admin/CrearProducto";
import EditarProducto from "./components/admin/EditarProducto";
import HistorialCompra from "./components/admin/HistorialCompra";
import OrderUsuario from "./components/admin/OrderUsuario";
import Productos from "./components/admin/Productos";
import Users from "./components/admin/Users";
import Cancelacion from "./components/carrito/Cancelacion";
import Confirmacion from "./components/carrito/Cofirmacion";
import Compra from "./components/carrito/Compra";
import FinalizarCompra from "./components/carrito/FinalizarCompra";
import OrdenDeCompra from "./components/carrito/OrdenDeCompra";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Favorites from "./components/products/Favorites";
import ProductDetail from "./components/products/ProductDetail";
import Products from "./components/products/Products";
import MyAppointments from "./components/Reserve/MyAppointments";
import Reserve from "./components/Reserve/Reserve";
import Sucursales from "./components/Reserve/Sucursales";
import CreateUser from "./components/user/createUser";
import LoginUser from "./components/user/LoginUser";
import Perfil from "./components/user/Perfil";
import { firebaseConfig } from "./firebase";

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
        <Route path="/products/checkout" element={<FinalizarCompra />} />
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
          path="/admin/products/crear-categoria"
          element={<CrearCategoria />}
        />
        <Route
          path="/admin/products/editar-producto/:idProduct"
          element={<EditarProducto />}
        />
        <Route
          path="/admin/products/borrar-categoria"
          element={<BorrarCategoria />}
        />
        <Route
          path="/admin/products/editar-producto/:idProduct"
          element={<EditarProducto />}
        />
        <Route
          path="/admin/products/crear-producto"
          element={<CrearProducto />}
        />
        <Route path="/admin/users/historial" element={<HistorialCompra />} />
        {/*  ======================About Us============================  */}
        <Route path="/contacto" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
