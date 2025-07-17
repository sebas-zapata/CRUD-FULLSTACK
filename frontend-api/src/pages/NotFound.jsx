import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-center px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />

      <h1 className="text-6xl font-extrabold text-red-600 mb-2">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
        Página no encontrada
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        Lo sentimos, la página que estás buscando no existe, fue movida o está temporalmente fuera de servicio.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        <FaArrowLeft />
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
