"use client";
import React from "react";
import SubastaCard from "./SubastaCard";
import { subastaData } from "./SubastaData";

const ListaVehiculos = () => {
  // 1. Verificar si el array subastaData está vacío
  if (subastaData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        {/* Mensaje cuando no hay vehículos */}
        <p className="text-xl font-semibold text-gray-600">
          Vehículos no disponibles por el momento 😔
        </p>
      </div>
    );
  }

  // 2. Si hay vehículos, renderiza la lista (el código original)
  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subastaData.map((vehiculo) => (
          <SubastaCard key={vehiculo.id} vehiculo={vehiculo} />
        ))}
      </div>
    </div>
  );
};

export default ListaVehiculos;