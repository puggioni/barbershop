import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import BorrarCategoria from "./components/admin/BorrarCategoria";
import CrearCategoria from "./components/admin/CrearCategorias";
import CrearProducto from "./components/admin/CrearProducto";
import CrearOffice from "./components/admin/CrearSucursal";
import EditarProducto from "./components/admin/EditarProducto";
import OrderProducto from "./components/admin/OrderProducto";
import OrderUsuario from "./components/admin/OrderUsuario";
import PanelCompras from "./components/admin/paneles_admin/PanelCompras";
import PanelProductos from "./components/admin/paneles_admin/PanelProductos";
import PanleSucuersales from "./components/admin/paneles_admin/PanelSucursales";
import PanelUsuarios from "./components/admin/paneles_admin/PanelUsuarios";
import Cancelacion from "./components/carrito/Cancelacion";
import Confirmacion from "./components/carrito/Cofirmacion";
import Compra from "./components/carrito/Compra";
import FinalizarCompra from "./components/carrito/FinalizarCompra";
import OrdenDeCompra from "./components/carrito/OrdenDeCompra";
import Home from "./components/Home";
import MenuResponsive from "./components/MenuResponsive";
import NavBar from "./components/NavBar";
import Favorites from "./components/products/Favorites";
import ProductDetail from "./components/products/ProductDetail";
import Products from "./components/products/Products";
import MyAppointments from "./components/Reserve/MyAppointments";
import Reserve from "./components/Reserve/Reserve";
import Sucursales from "./components/Reserve/Sucursales";
import ChangePassword from "./components/user/ChangePassword";
import CreateUser from "./components/user/CreateUser";
import LoginUser from "./components/user/LoginUser";
import MisCompras from "./components/user/MisCompras";
import OrderDetail from "./components/user/OrderDetail";
import Perfil from "./components/user/Perfil";
import { firebaseConfig } from "./firebase";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

function App() {
  return (
    <div>
      <NavBar />
      <MenuResponsive />
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
        <Route
          path="/user/password-reset/:idUser"
          element={<ChangePassword />}
        />
        <Route path="/user/mis-compras/:idUser" element={<MisCompras />} />
        <Route
          path="/user/mis-compras/compra/:idOrder"
          element={<OrderDetail />}
        />
        {/*===================sucursales============================*/}
        <Route path="/sucursales" element={<Sucursales />} />
        {/*===================turno=================================*/}
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reserve/barber" element={<MyAppointments />} />
        {/*===================admin=================================*/}
        <Route path="/admin/compras" element={<PanelCompras />} />
        <Route path="/admin/compras/:idOrder" element={<OrderUsuario />} />
        <Route path="/admin/users" element={<PanelUsuarios />} />
        <Route path="/admin/products" element={<PanelProductos />} />
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
          path="/admin/products/hisrotial-producto/:id"
          element={<OrderProducto />}
        />
        <Route
          path="/admin/products/crear-producto"
          element={<CrearProducto />}
        />
        <Route path="/admin/users/historial" element={<OrderUsuario />} />
        <Route path="/admin/offices" element={<PanleSucuersales />} />
        <Route path="/admin/offices/create" element={<CrearOffice />} />
        {/*  ======================About Us============================  */}
        <Route path="/contacto" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
