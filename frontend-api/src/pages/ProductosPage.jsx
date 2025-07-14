import React, { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productos";
import ProductoCard from "../components/ProductoCard";
import FormularioProducto from "../components/FormularioProducto";
// Página principal de productos
// que muestra un formulario para crear productos
const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [actualizarListaProductos, setActualizarListaProductos] =
    useState(true);

  useEffect(() => {
    if (!actualizarListaProductos) return; // Solo carga si se necesita

    const cargarProductos = async () => {
      try {
        const { productos, mensaje } = await obtenerProductos();
        setProductos(productos);
        setMensaje(mensaje);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setMensaje("Error al cargar productos.");
      } finally {
        setCargando(false);
        setActualizarListaProductos(false); // 👈 Evita recargas innecesarias
      }
    };

    cargarProductos();
  }, [actualizarListaProductos]);

  // Manejar la creación de un nuevo producto
  // y actualizar la lista de productos
  const manejarProductoCreado = (nuevoProducto) => {
    setProductos((productosAnteriores) => [
      nuevoProducto,
      ...productosAnteriores,
    ]);
    setMensaje("Producto creado exitosamente.");
  };

  // Renderizar la página de productos
  // con el formulario y la lista de productos
  return (
    <>
      <FormularioProducto onProductoCreado={manejarProductoCreado} />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center mt-3">
          <strong className="text-blue-700">
            Productos {productos.length}
          </strong>
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
              <ProductoCard
                key={producto.id}
                producto={producto}
                setActualizar={setActualizarListaProductos}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductosPage;
