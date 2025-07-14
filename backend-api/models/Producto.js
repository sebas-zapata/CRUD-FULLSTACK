// ==============================
// 📦 Importaciones necesarias
// ==============================
const { DataTypes } = require("sequelize");     // Tipos de datos que usaremos en el modelo
const sequelize = require("../config/db");      // Conexión a la base de datos

// ===============================
// 🧱 Definición del modelo Producto
// ===============================
const Producto = sequelize.define("Producto", {
  // 📝 Nombre del producto (obligatorio)
  nombre: {
    type: DataTypes.STRING,       // Cadena de texto corta
    allowNull: false,             // No puede ser nulo
  },

  // 💲 Precio del producto (obligatorio)
  precio: {
    type: DataTypes.FLOAT,        // Número decimal
    allowNull: false,
  },

  // 📃 Descripción del producto (obligatorio)
  descripcion: {
    type: DataTypes.TEXT,         // Texto largo
    allowNull: false,
  },

  // 📦 Stock del producto (opcional con valor por defecto)
  stock: {
    type: DataTypes.INTEGER,      // Número entero
    defaultValue: 0,              // Si no se define, empieza en 0
  },

  // 📅 Fecha de creación (automático por Sequelize)
  // createdAt: Sequelize lo crea automáticamente

  // 🕒 Fecha de actualización (automático por Sequelize)
  // updatedAt: Sequelize lo crea automáticamente
});

// ==============================
// 📤 Exportar el modelo
// ==============================
module.exports = Producto;
