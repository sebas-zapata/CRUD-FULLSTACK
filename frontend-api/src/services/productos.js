import api from "./axios";

// Obtener todos los productos
export const obtenerProductos = async () => {
    const res = await api.get("/productos");
    return {
        productos: res.data.productos,
        mensaje: res.data.mensaje,
    };
};
// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
    const res = await api.get(`/productos/${id}`);
    return res.data;
};

// Crear un producto
export const crearProducto = async (producto) => {
    const res = await api.post("/productos", producto);
    return res.data;
};

// Actualizar un producto
export const actualizarProducto = async (id, producto) => {
    const res = await api.put(`/productos/${id}`, producto);
    return res.data;
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    const res = await api.delete(`/productos/${id}`);
    return res.data;
};