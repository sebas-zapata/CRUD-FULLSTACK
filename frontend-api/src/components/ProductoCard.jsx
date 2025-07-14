import React from "react";
import { eliminarProducto } from "../services/productos";

const ProductoCard = ({ producto, setActualizar }) => {
  const handleDelete = async () => {
    const confirmacion = confirm(`¿Eliminar "${producto.nombre}"?`);
    if (!confirmacion) return;

    try {
      await eliminarProducto(producto.id);
      alert("Producto eliminado");
      setActualizar(true); // <- Esto recarga los productos
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">
        {producto.nombre}
      </h2>
      <h3 className="text-gray-600 text-sm mb-2">{producto.descripcion}</h3>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Stock:</span> {producto.stock}
      </p>
      <p className="text-green-600 font-bold text-lg">${producto.precio}</p>
      <p className="text-sm text-gray-500">
        Creado el:{" "}
        {new Date(producto.createdAt).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <p className="text-sm text-gray-500">
        Actualizado el:{" "}
        {new Date(producto.updatedAt).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <button
        onClick={handleDelete}
        className=" bg-red-500 text-white px-2 py-1 my-2 cursor-pointer rounded hover:bg-red-600"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ProductoCard;
