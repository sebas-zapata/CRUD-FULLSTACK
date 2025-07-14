// ==============================
// 📦 Importación de dependencias
// ==============================
const express = require("express");
const router = express.Router(); // Crea un enrutador modular de Express

// ==========================
// 🎯 Importación del controlador
// ==========================
const controlador = require("../controllers/ProductoController");

// ===============================
// 🛣️ Definición de rutas para productos
// ===============================

// ✅ Obtener todos los productos
// GET http://localhost:3000/productos
router.get("/", controlador.obtenerProductos);

// ✅ Obtener un producto por ID
// GET http://localhost:3000/productos/5
router.get("/:id", controlador.obtenerProductoPorId);

// ✅ Crear un nuevo producto
// POST http://localhost:3000/productos
router.post("/", controlador.crearProducto);

// ✅ Actualizar un producto existente por ID
// PUT http://localhost:3000/productos/5
router.put("/:id", controlador.actualizarProducto);

// ✅ Eliminar un producto por ID
// DELETE http://localhost:3000/productos/5
router.delete("/:id", controlador.eliminarProducto);

// ===================
// 📤 Exportar el router
// ===================
module.exports = router;
