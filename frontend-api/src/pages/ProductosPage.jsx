import React, { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productos";
import ProductoCard from "../components/ProductoCard";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const { productos, mensaje } = await obtenerProductos();
        setProductos(productos);
        setMensaje(mensaje);
      } catch (error) {
        console.log("Error al cargar los productos", error);
        setMensaje("Error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center mt-3">
        <strong className="text-blue-700">Productos {productos.length}</strong>
      </h1>

      {/* Mensaje de estado */}
      <div className="mb-4 text-center">
        {cargando ? (
          <p className="text-gray-500 text-lg animate-pulse">
            Cargando productos...
          </p>
        ) : (
          <p className="text-green-600 font-medium text-lg">{mensaje}</p>
        )}
      </div>

      {productos.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductosPage;
