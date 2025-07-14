// ==========================================
// 📦 Importación del modelo
// ==========================================
const Producto = require("../models/Producto");


// ==========================================
// ✅ Obtener todos los productos
// GET /productos
// ==========================================
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll(); // Trae todos los productos

    if (productos.length > 0) {
      return res.status(200).json({
        mensaje: "Productos obtenidos correctamente",
        productos: productos,
      });
    }

    // Si no hay productos
    return res.status(200).json({
      mensaje: "No hay productos registrados",
      productos: [],
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener productos",
      error: error.message,
    });
  }
};


// ==========================================
// ✅ Obtener un producto por ID
// GET /productos/:id
// ==========================================
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id); // Buscar por ID primario

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Producto encontrado",
      producto: producto,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar producto",
      error: error.message,
    });
  }
};


// ==========================================
// ✅ Crear un nuevo producto
// POST /productos
// ==========================================
const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock } = req.body;

    // Crear nuevo producto en la base de datos
    const nuevo = await Producto.create({
      nombre,
      precio,
      descripcion,
      stock,
    });

    res.status(201).json({
      mensaje: "Producto creado exitosamente",
      producto: nuevo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear producto",
      error: error.message,
    });
  }
};


// ==========================================
// ✅ Actualizar un producto existente
// PUT /productos/:id
// ==========================================
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion, stock } = req.body;

    const producto = await Producto.findByPk(id); // Buscar producto por ID

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    // Actualizar campos
    producto.nombre = nombre;
    producto.precio = precio;
    producto.descripcion = descripcion;
    producto.stock = stock;

    await producto.save(); // Guardar cambios

    res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      producto: producto,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar producto",
      error: error.message,
    });
  }
};


// ==========================================
// ✅ Eliminar un producto
// DELETE /productos/:id
// ==========================================
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    await producto.destroy(); // Eliminar de la base de datos

    res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar producto",
      error: error.message,
    });
  }
};


// ==========================================
// 📤 Exportación de todos los controladores
// ==========================================
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
