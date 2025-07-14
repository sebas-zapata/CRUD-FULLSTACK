import React from "react";

const ProductoCard = ({ producto }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">
        {producto.nombre}
      </h2>
      <h3 className="text-gray-600 text-sm mb-2">{producto.descripcion}</h3>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Stock:</span> {producto.stock}
      </p>
      <p className="text-green-600 font-bold text-lg">${producto.precio}</p>
      <p className="text-sm text-gray-500">
        Creado el:{" "}
        {new Date(producto.createdAt).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <p className="text-sm text-gray-500">
        Actualizado el:{" "}
        {new Date(producto.updatedAt).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

export default ProductoCard;
