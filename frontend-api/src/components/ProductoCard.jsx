import React from "react";
import { eliminarProducto } from "../services/productos";
import Swal from "sweetalert2";

const ProductoCard = ({ producto, setActualizar, onEditar }) => {
  const handleDelete = () => {
    Swal.fire({
      title: `¿Eliminar "${producto.nombre}"?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarProducto(producto.id);

          Swal.fire(
            "Eliminado",
            `El producto ${producto.nombre} fue eliminado correctamente.`,
            "success"
          );

          // ✅ Recargar productos desde el padre
          setActualizar(true);
        } catch (error) {
          console.error("Error al eliminar:", error);
          Swal.fire("Error", "No se pudo eliminar el producto.", "error");
        }
      }
    });
  };

  const handleInformacion = (producto) => {
    Swal.fire({
      title: `<strong>${producto.nombre}</strong>`,
      html: `
      <p style="margin-bottom: 10px;"><em>${producto.descripcion}</em></p>
      <p><strong>Stock:</strong> ${
        producto.stock
          ? producto.stock
          : '<span style="color: red;">Sin stock</span>'
      }</p>
      <hr />
      <small>
        <strong>Creado el:</strong> ${new Date(
          producto.createdAt
        ).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}<br/>
        <strong>Actualizado el:</strong> ${new Date(
          producto.updatedAt
        ).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    `,
      icon: "info",
      confirmButtonText: "Cerrar",
      showCloseButton: true,
      focusConfirm: false,
      customClass: {
        popup: "swal2-border-radius",
        title: "swal2-title-custom",
      },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">
        {producto.nombre}
      </h2>
      <h3 className="text-gray-600 text-sm mb-2">{producto.descripcion}</h3>
      <p className="text-green-600 font-bold text-lg">${producto.precio}</p>
      <div className="border-t border-gray-200 mt-4 pt-2">
        <button
          onClick={handleDelete}
          className=" bg-red-500 text-white px-2 py-1 my-2 cursor-pointer rounded hover:bg-red-700"
        >
          Eliminar
        </button>
        <button
          className="mt-2 ms-2 px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
          onClick={() => onEditar(producto)}
        >
          Editar
        </button>
        <button
          onClick={() => handleInformacion(producto)}
          className="mt-2 ms-2 px-3 py-1 bg-gray-600 text-white rounded cursor-pointer hover:bg-gray-700"
        >
          Ver informacion
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
