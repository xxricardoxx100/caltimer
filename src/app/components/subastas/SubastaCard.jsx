"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaCogs, FaGasPump, FaArrowRight, FaClock } from "react-icons/fa";
import { SubastaOfertasService } from "@/lib/supabase/subasta-ofertas";

const GRACE_PERIOD_MS = 2 * 60 * 60 * 1000;

const SubastaCard = ({ vehiculo }) => {
  const router = useRouter();
  const [tiempoRestante, setTiempoRestante] = useState("");
  const [finalizada, setFinalizada] = useState(false);
  const [precioActual, setPrecioActual] = useState(null);

  // Consultar si ya existe una puja para mostrar el precio actual en vez del precio base
  useEffect(() => {
    let activo = true;

    SubastaOfertasService.getUltimaOferta(vehiculo.id).then((ultimaOferta) => {
      if (!activo || !ultimaOferta) return;
      const monto = Number(ultimaOferta.monto);
      if (Number.isFinite(monto)) {
        setPrecioActual(monto);
      }
    });

    return () => {
      activo = false;
    };
  }, [vehiculo.id]);

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
    const getIsFinalizadaForDisplay = (fechaISO) => {
      const finMs = new Date(fechaISO).getTime();
      return Date.now() > finMs + GRACE_PERIOD_MS;
    };

    // Actualizar inmediatamente
    const fechaISO = vehiculo.fecha_fin;
    setTiempoRestante(formatearFechaFin(fechaISO));
    setFinalizada(getIsFinalizadaForDisplay(fechaISO));

    // Actualizar cada minuto
    const interval = setInterval(() => {
      setTiempoRestante(formatearFechaFin(vehiculo.fecha_fin));
      setFinalizada(getIsFinalizadaForDisplay(vehiculo.fecha_fin));
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, [vehiculo.fecha_fin]);

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl border border-black/5 shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={vehiculo.imagen}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay inferior para legibilidad del chip de tiempo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

        {finalizada ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-[170%] -rotate-[28deg] bg-red-600/90 py-1.5 text-center text-2xl font-extrabold uppercase tracking-wider text-white shadow-lg md:py-2.5 md:text-3xl">
              Vendido
            </div>
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-[#BF9056] text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            En Subasta
          </div>
        )}

        {/* Chip de tiempo restante flotando sobre la imagen */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5">
          <FaClock className="text-[#F29F05]" />
          {tiempoRestante}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-[#1F3F58]">
          {vehiculo.marca} {vehiculo.modelo}
        </h3>

        {/* Meta-datos del vehículo */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-[#BF9056]" /> {vehiculo.año}
          </span>
          {vehiculo.transmision && (
            <span className="flex items-center gap-1">
              <FaCogs className="text-[#BF9056]" /> {vehiculo.transmision}
            </span>
          )}
          {vehiculo.combustible && (
            <span className="flex items-center gap-1">
              <FaGasPump className="text-[#BF9056]" /> {vehiculo.combustible}
            </span>
          )}
        </div>

        <div className="border-t pt-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {typeof vehiculo.precio !== 'number' ? '' : precioActual !== null ? 'Oferta actual' : 'Precio base'}
          </p>
          <p className={`text-2xl font-bold ${typeof vehiculo.precio === 'string' ? 'text-red-600 text-center' : 'text-[#1F3F58]'}`}>
            {typeof vehiculo.precio === 'number'
              ? `$${(precioActual ?? vehiculo.precio).toLocaleString()}`
              : vehiculo.precio}
          </p>
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F29F05] to-[#E36C09] text-white py-2 rounded-xl font-semibold shadow hover:shadow-lg hover:brightness-105 transition-all">
          Ver Detalles
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default SubastaCard;
