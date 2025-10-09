import React from "react";

export default function CeoDescripcion() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-50 px-8 py-16 bg-[#F2B66D] min-h-[400px]">
      <div className="flex items-center justify-center">
        <img
          src="/servicios/Jean Calderon.jpg"
          alt="CEO de la empresa"
          className="rounded-2xl w-[320px] h-[400px] object-cover"
        />
      </div>
      <div className="max-w-lg flex flex-col items-start justify-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestro CEO
        </h2>
        <p className=" text-justify p-4 mb-4">
          Jean Carlos Calderon es Ingeniero Mecatrónico y el experto detrás de nuestra operación. Su carrera está marcada por logros tangibles: más de 900 vehículos adjudicados y 30 proyectos inmobiliarios completados. Como CEO, su misión es aplicar un enfoque analítico y riguroso para garantizar las inversiones más seguras y rentables del sector de subastas y remates.
        </p>
        <button className="pinline-flex items-center justify-center rounded-full border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white hover:bg-orange-700">
          Conoce más
        </button>
      </div>
    </section>
  );
} 