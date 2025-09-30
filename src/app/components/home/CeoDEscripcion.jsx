import React from "react";

export default function CeoDescripcion() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-50 px-8 py-16 bg-white min-h-[400px]">
      <div className="flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          alt="CEO de la empresa"
          className="rounded-2xl w-[320px] h-[400px] object-cover"
        />
      </div>
      <div className="max-w-lg flex flex-col items-start justify-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestro CEO
        </h2>
        <p className="text-lg text-gray-700 border border-gray-300 rounded p-4 mb-4">
          Juan Pérez, CEO de Caltimer Group, es un apasionado del sector automotriz y de inversiones inmobiliarias. Con más de 15 años de experiencia, lidera la empresa con visión, innovación y compromiso hacia nuestros clientes.
        </p>
        <button className="pinline-flex items-center justify-center rounded-full border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white hover:bg-orange-700">
          Conoce más
        </button>
      </div>
    </section>
  );
} 