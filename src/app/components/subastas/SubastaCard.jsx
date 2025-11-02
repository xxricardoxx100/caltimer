"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SubastaCard = ({ vehiculo }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/subasta-details?id=${vehiculo.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative">
        <img 
          src={vehiculo.imagen} 
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#BF9056] text-white px-3 py-1 rounded-full text-sm font-semibold">
          En Subasta
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          {vehiculo.marca} {vehiculo.modelo}
        </h3>
        <p className="text-gray-600 mb-3">Año {vehiculo.año}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Kilometraje:</span>
            <span className="font-semibold">{vehiculo.kilometraje}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estado:</span>
            <span className="font-semibold">{vehiculo.estado}</span>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <p className="text-sm text-gray-600">Precio inicial</p>   
          <p className="text-2xl font-bold text-[#591D07]">
            ${vehiculo.precio.toLocaleString()}
          </p>
        </div>
        
        <button className="w-full mt-4 bg-[#F29F05] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default SubastaCard;