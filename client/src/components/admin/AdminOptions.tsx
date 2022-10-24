import { Link } from "react-router-dom";

const AdminOptions = () => {
  return (
    <div>
      {/* edita:  stock,  con nombre, descripción, precio y uno o más fotos   */}
      <Link to="/admin/products">Productos</Link>
      {/* poder agregar o sacar categorías de los items */}
      <Link to="/admin/categorias">Categorias</Link>
      {/*ver una lista de todas las ordenes;detalles de una orden específica;cambiar el estado de una orden (creada => procesando || cancelada, procesando => cancelada || completa);filtrar las ordenes por su estado  */}

      <Link to="/admin/compras">Compras</Link>
      {/* convertir a admin; borrar usuario; pass reset de usuario */}
      <Link to="/admin/usuario">Usuerios</Link>

      <button>Compras</button>;<button>Usuarios</button>;

    </div>
  );
};

export default AdminOptions;
