import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a la tienda</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explora nuestros productos y encuentra lo que necesitas.
      </p>
      <Link
        to="/productos"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Ver productos
      </Link>
    </div>
  );
};

export default Inicio;
