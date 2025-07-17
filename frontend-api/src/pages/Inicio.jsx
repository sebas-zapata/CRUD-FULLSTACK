import React from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaLaptopCode, FaArrowRight, FaGithub, FaCodeBranch } from 'react-icons/fa';

const Inicio = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 text-center px-4">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-3 flex items-center justify-center gap-2">
          <FaStore className="text-blue-600" />
          Bienvenido a la tienda
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Explora nuestros productos y encuentra lo que necesitas al mejor precio.
        </p>
      </div>

      <Link
        to="/productos"
        className="bg-blue-600 text-white flex items-center gap-2 px-6 py-3 rounded-md hover:bg-blue-700 transition mb-10"
      >
        Ver productos <FaArrowRight />
      </Link>

      {/* Sección de créditos como desarrollador */}
      <div className="bg-white shadow-lg rounded-xl p-5 max-w-xl text-left border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
          <FaLaptopCode className="text-blue-500" />
          Proyecto Full Stack CRUD
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Esta aplicación fue desarrollada completamente por mí, usando <strong>React</strong> para el frontend
          y <strong>Node.js + Express</strong> para el backend. Incluye funcionalidades CRUD completas conectadas a una base de datos y una experiencia fluida de usuario.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <a
            href="https://github.com/sebas-zapata"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <FaGithub /> Ver repositorio
          </a>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-1 text-gray-500">
            <FaCodeBranch /> Full Stack Dev
          </span>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
