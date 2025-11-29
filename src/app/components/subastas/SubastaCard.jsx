"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SubastaCard = ({ vehiculo }) => {
  const router = useRouter();
  const [tiempoRestante, setTiempoRestante] = useState("");

  const handleClick = () => {
    router.push(`/subasta-details?id=${vehiculo.id}`);
  };

  // Formatear fecha de finalización
  const formatearFechaFin = (fechaISO) => {
    if (!fechaISO) return "Fecha no disponible";
    
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diferencia = fecha.getTime() - ahora.getTime();
    
    // Calcular días, horas y minutos restantes
    const diasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutosRestantes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    // Si ya terminó
    if (diferencia <= 0) {
      return "Subasta finalizada";
    }
    
    // Si es menos de 1 día
    if (diasRestantes === 0) {
      if (horasRestantes === 0) {
        return `Termina en ${minutosRestantes} minutos`;
      }
      return `Termina en ${horasRestantes}h ${minutosRestantes}m`;
    }
    
    // Si es 1 o más días
    if (diasRestantes === 1) {
      return `Termina mañana a las ${fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Formato completo de fecha
    return `Termina: ${fecha.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  };

  // Actualizar tiempo restante cada minuto
  useEffect(() => {
    // Actualizar inmediatamente
    setTiempoRestante(formatearFechaFin(vehiculo.fecha_fin));
    
    // Actualizar cada minuto
    const interval = setInterval(() => {
      setTiempoRestante(formatearFechaFin(vehiculo.fecha_fin));
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, [vehiculo.fecha_fin]);

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
        
        {/* Fecha de finalización */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-4">
          <p className="text-xs text-orange-700 font-semibold text-center">
            ⏰ {tiempoRestante}
          </p>
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