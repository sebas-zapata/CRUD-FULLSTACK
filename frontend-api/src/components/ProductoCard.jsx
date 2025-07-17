import React from "react";
import { eliminarProducto } from "../services/productos";
import Swal from "sweetalert2";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
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
    const precioFormateado = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(producto.precio);

    Swal.fire({
      title: `<strong>${producto.nombre}</strong>`,
      html: `
      <div style="text-align: left; font-size: 16px; line-height: 1.6">
        <p style="margin-bottom: 10px; font-style: italic;">${
          producto.descripcion
        }</p>

        <p>
          <strong>Stock:</strong> ${
            producto.stock
              ? `<span style="color: green; font-weight: bold;">${producto.stock}</span>`
              : `<span style="color: red; font-weight: bold;">Sin stock</span>`
          }
        </p>

        <p><strong>Precio:</strong> <span style="color: #0d6efd;">${precioFormateado}</span></p>

        <hr />

        <small style="font-size: 13px; color: #555;">
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
      </div>
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
  const precioFormateado = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(producto.precio);

  return (
  <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-2xl cursor-pointer transition duration-300">
    <h2 className="text-xl font-semibold text-blue-600 mb-2">
      {producto.nombre}
    </h2>
    <h3 className="text-gray-600 text-sm mb-2">{producto.descripcion}</h3>

    <p className="text-green-600 font-bold text-lg">{precioFormateado}</p>

    <div className="border-t border-gray-200 mt-4 pt-2 flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-2">
      <button
        onClick={handleDelete}
        className="w-full sm:w-auto bg-red-500 flex items-center justify-center text-white px-4 py-2 cursor-pointer rounded hover:bg-red-700"
      >
        <FaTrash className="text-white text-base me-1" />
        Eliminar
      </button>

      <button
        className="w-full sm:w-auto bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        onClick={() => onEditar(producto)}
      >
        <FaEdit className="text-white text-base me-1" />
        Editar
      </button>

      <button
        onClick={() => handleInformacion(producto)}
        className="w-full sm:w-auto bg-gray-600 flex items-center justify-center text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
      >
        <FaSearch className="text-white text-base me-1" />
        Ver información
      </button>
    </div>
  </div>

  );
};

export default ProductoCard;
