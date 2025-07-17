import React, { useState, useEffect } from "react";
import { crearProducto, actualizarProducto } from "../services/productos";
import Swal from "sweetalert2";
import { FaBoxOpen, FaPlus, FaPencilAlt } from "react-icons/fa";

const FormularioProducto = ({
  onProductoCreado,
  onActualizarProducto,
  productoEditando,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  // Efecto para manejar la edición de un producto
  // Si se recibe un producto a editar, lo carga en el formulario
  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre);
      setDescripcion(productoEditando.descripcion);
      setPrecio(productoEditando.precio);
      setStock(productoEditando.stock);
    } else {
      // Si no estamos editando, limpiamos el formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
    }
  }, [productoEditando]);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    // 🧪 Validación previa
    if (!nombre.trim() || !descripcion.trim() || !stock || !precio) {
      return Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos del formulario.",
      });
    }

    if (parseInt(stock, 10) <= 0) {
      return Swal.fire({
        icon: "warning",
        title: "Stock inválido",
        text: "El stock debe ser un número mayor a 0.",
      });
    }

    if (parseFloat(precio) <= 0) {
      return Swal.fire({
        icon: "warning",
        title: "Precio inválido",
        text: "El precio debe ser un valor mayor a 0.",
      });
    }

    try {
      const datosProducto = {
        nombre,
        descripcion,
        stock: parseInt(stock, 10),
        precio: parseFloat(precio),
      };

      let res;

      if (productoEditando) {
        // 🛠️ Editar producto
        res = await actualizarProducto(productoEditando.id, datosProducto);

        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: res.mensaje,
          timer: 2000,
          showConfirmButton: false,
        });

        if (typeof onActualizarProducto === "function") {
          onActualizarProducto(res.producto);
        }
      } else {
        // 🆕 Crear producto
        res = await crearProducto(datosProducto);

        Swal.fire({
          icon: "success",
          title: "¡Registrado!",
          text: res.mensaje,
          timer: 2000,
          showConfirmButton: false,
        });

        if (typeof onProductoCreado === "function") {
          onProductoCreado(res.producto);
        }
      }

      // ✅ Limpiar formulario
      setNombre("");
      setDescripcion("");
      setStock("");
      setPrecio("");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      const mensajeError =
        error.response?.data?.mensaje || "Error al guardar producto.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensajeError,
      });
    }
  };

  return (
    <form onSubmit={manejarSubmit} autoComplete="off">
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        <FaPencilAlt className="inline-block mr-2" />
        {productoEditando ? "Editar Producto" : "Registrar Producto"}
      </h2>

      {mensaje && (
        <p
          className={`mb-4 text-center font-medium ${
            esError ? "text-red-500" : "text-green-600"
          }`}
        >
          {mensaje}
        </p>
      )}

      <div className="mb-4">
        <label className="block mb-1 text-sm">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Camiseta Nike"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej. Camiseta deportiva para entrenamiento"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Stock</label>
        <input
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Ej. 25"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Precio</label>
        <input
          type="number"
          name="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej. 49.900"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center gap-2 justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        {productoEditando ? (
          <>
            Actualizar producto{" "}
            <FaBoxOpen className="text-white text-base me-1" />
          </>
        ) : (
          <>
            Registrar producto <FaPlus className="text-white text-base me-1" />
          </>
        )}
      </button>
    </form>
  );
};

export default FormularioProducto;
