import React, { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productos";
import ProductoCard from "../components/ProductoCard";
import FormularioProducto from "../components/FormularioProducto";
import { FaPlus, FaTimes } from "react-icons/fa";

// Página principal de productos
// que muestra un formulario para crear productos
const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [actualizarListaProductos, setActualizarListaProductos] =
    useState(true);
  const [form, setForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  // Efecto para cargar productos al montar el componente
  // y cada vez que se actualiza la lista de productos
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

    // Cargar productos al montar el componente
    cargarProductos();

    // Limpiar el estado de edición al desmontar
  }, [actualizarListaProductos]);

  // Manejar la creación de un nuevo producto
  // y actualizar la lista de productos
  const manejarProductoCreado = (nuevoProducto) => {
    setProductos((productosAnteriores) => [
      ...productosAnteriores,
      nuevoProducto,
    ]);
    setForm(false);
    setMensaje("Producto creado exitosamente.");
  };

  // Manejar edición de un producto
  const iniciarEdicion = (producto) => {
    setForm(true);
    setProductoEditando(producto);
  };

  // Manejar actualización de un producto
  // y actualizar la lista de productos
  const manejarProductoActualizado = (productoModificado) => {
    setProductos((productosAnteriores) =>
      productosAnteriores.map((productoActual) =>
        productoActual.id === productoModificado.id
          ? productoModificado
          : productoActual
      )
    );

    // Oculta el formulario
    setForm(false);

    // Limpia el estado del producto en edición
    setProductoEditando(null);
  };

  // Renderizar la página de productos
  // con el formulario y la lista de productos
  return (
    <>
      {/* Mostrar formulario si 'form' es true */}
      {form && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-gray-900/20 to-black/30 flex items-center justify-center">
          <div className="bg-white relative p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="p-3">
              <button
                onClick={() => {
                  setForm(false);
                  setProductoEditando(null);
                }}
                className="absolute top-3 right-2 px-2 rounded-4xl cursor-pointer hover:text-gray-700 text-6xl"
              >
                <FaTimes className="text-red-500 text-4xl rounded bg-gray-100 hover:text-gray-500" />
              </button>
              <FormularioProducto
                onProductoCreado={manejarProductoCreado}
                productoEditando={productoEditando}
                onActualizarProducto={manejarProductoActualizado}
              />
            </div>
          </div>
        </div>
      )}
      {/* Mostrar mensaje de estado */}
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

        {/* Botón para mostrar el formulario */}
        <button
          className="flex items-center gap-2 bg-blue-600 text-white rounded px-4 py-2 m-3 hover:bg-blue-700 transition cursor-pointer"
          onClick={() => setForm(!form)}
        >
          <FaPlus className="text-white text-base" />
          Registrar producto
        </button>

        {/* Lista de productos */}
        {productos.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {productos.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                setActualizar={setActualizarListaProductos}
                onEditar={iniciarEdicion}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductosPage;
