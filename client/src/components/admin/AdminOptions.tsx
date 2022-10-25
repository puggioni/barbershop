import { Link } from "react-router-dom";

const AdminOptions = () => {
  return (
    <div>
      {/* edita:  stock,  con nombre, descripción, precio y uno o más fotos   */}

      <button>Productos</button>
      {/* poder agregar o sacar categorías de los items */}
      <button>Categorias</button>
      {/*ver una lista de todas las ordenes;detalles de una orden específica;cambiar el estado de una orden (creada => procesando || cancelada, procesando => cancelada || completa);filtrar las ordenes por su estado  */}
      <button>Compras</button>
      <button>Usuarios</button>

    </div>
  );
};

export default AdminOptions;
