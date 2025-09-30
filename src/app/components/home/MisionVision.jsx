import React from "react";

export default function MisionVision() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-30 px-8 py-16 bg-white min-h-[400px]">
      <div className="max-w-lg flex flex-col items-start justify-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestra Misión y Visión
        </h2>
        <p className="text-lg text-gray-700 border border-gray-300 rounded p-4 mb-4">
          En Caltimer Group, nos dedicamos a facilitar la compra y venta de autos de subasta, además de invertir en proyectos inmobiliarios.
        </p>
        <button className="inline-flex items-center justify-center rounded-full border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white hover:bg-orange-700">
          Contáctanos Ahora
        </button> 
      </div>
      <div className="flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/18108314/pexels-photo-18108314/free-photo-of-coches-vehiculos-lujo-moderno.jpeg"
          alt="Auto en subasta"
          className="rounded-2xl w-[550px] h-[400px] object-cover"
        />
      </div>
    </section>
  );
}