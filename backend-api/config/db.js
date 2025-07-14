require("dotenv").config(); // 👈 Cargar variables del .env
const { Sequelize } = require("sequelize");

// Crear instancia usando variables del .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // desactivar logs de SQL
  }
);

module.exports = sequelize;
