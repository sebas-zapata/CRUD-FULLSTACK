import React, { useState, useEffect } from "react";
import { crearProducto } from "../services/productos";

const FormularioProducto = ({ onProductoCreado }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoProducto = {
        nombre,
        descripcion,
        stock: parseInt(stock, 10),
        precio: parseFloat(precio),
      };

      const { producto, mensaje } = await crearProducto(nuevoProducto);
      if (onProductoCreado) {
        onProductoCreado(producto);
      }

      setMensaje(mensaje);
      setEsError(false);
      // Limpiar el formulario
      setNombre("");
      setDescripcion("");
      setStock("");
      setPrecio("");
    } catch (error) {
      console.error("Error al crear producto:", error);
      setMensaje("Error al crear producto.");
      setEsError(true);
    }
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Crear nuevo producto
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
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Stock</label>
        <input
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Precio</label>
        <input
          type="number"
          name="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Guardar producto
      </button>
    </form>
  );
};

export default FormularioProducto;
