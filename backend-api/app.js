// ===============================
// 📦 Importación de dependencias
// ===============================
require("dotenv").config();
const express = require("express");      // Framework principal de Node.js para crear el servidor
const cors = require("cors");            // Middleware para permitir conexiones desde otros dominios
const sequelize = require("./config/db"); // Configuración de conexión a la base de datos (Sequelize)
const rutasProductos = require("./routes/RoutesController"); // Rutas para la API de productos

// ==========================
// ⚙️ Inicialización de Express
// ==========================
const app = express(); // Crea una instancia de la aplicación
const PORT = process.env.PORT || 3000;     // Puerto en el que correrá el servidor

// ===================
// 🛠️ Middlewares globales
// ===================
app.use(express.json()); // Permite recibir datos en formato JSON en el cuerpo de las peticiones
app.use(cors());         // Habilita CORS para que el frontend pueda consumir la API

// ================
// 🛣️ Rutas de la API
// ================
app.use("/productos", rutasProductos);
// Todas las rutas dentro de rutasProductos comenzarán con /productos
// Ej: GET /productos, POST /productos, etc.

// ==========================================
// 🔌 Conexión a la base de datos + Servidor
// ==========================================
sequelize.sync({ alter: true }) // Crea o actualiza las tablas según los modelos definidos (usa alter solo en desarrollo)
  .then(() => {
    console.log("✅ Base de datos sincronizada con Sequelize correctamente");

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al sincronizar la base de datos:", error.message);
  });
