"use client";
import React, { useState } from "react";

export const Features = () => {
  const [estado, setEstado] = useState("");
  const [distrito, setDistrito] = useState("");

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Main content section */}
      <main className="px-6 pb-0">
        {/* Title section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-xl md:text-5xl font-bold text-gray-900 leading-tight text-balance">
            Contamos con{" "}
            <span className="font-black">
              13 grandes proyectos inmobiliarios
            </span>
            <br />
            en los distritos{" "}
            <span className="font-black">más céntricos de Lima</span>
          </h1>
        </div>

        {/* Search section with black background */}
        <div className="bg-gray-800 text-white py-12 px-6 -mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Left text */}
              <div className="lg:flex-1">
                <h2 className="text-2xl md:text-3xl font-light text-white">
                  Uno de ellos puede ser para ti.
                </h2>
              </div>

              {/* Search controls */}
              <form className="flex flex-col sm:flex-row gap-4 lg:flex-none">
                {/* Project status selector */}
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full sm:w-64 bg-white text-gray-900 border-0 h-12 px-4 rounded-md focus:outline-none"
                >
                  <option value="">Elegir por estado del proyecto</option>
                  <option value="en-construccion">En construcción</option>
                  <option value="pre-venta">Pre-venta</option>
                  <option value="entrega-inmediata">Entrega inmediata</option>
                  <option value="terminado">Terminado</option>
                </select>

                {/* District selector */}
                <select
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  className="w-full sm:w-64 bg-white text-gray-900 border-0 h-12 px-4 rounded-md focus:outline-none"
                >
                  <option value="">Elegir el distrito</option>
                  <option value="miraflores">Miraflores</option>
                  <option value="san-isidro">San Isidro</option>
                  <option value="barranco">Barranco</option>
                  <option value="surco">Surco</option>
                  <option value="la-molina">La Molina</option>
                  <option value="san-borja">San Borja</option>
                </select>

                {/* Search button */}
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-12 text-base rounded-md"
                >
                  BUSCAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
