"use client";
import { useState, useEffect, useMemo } from "react";
import { SubastaOfertasService } from "@/lib/supabase/subasta-ofertas";

/**
 * Componente de contador regresivo para subastas
 * Muestra días, horas, minutos y segundos restantes
 * Sincronizado con el servidor para mayor precisión
 * @param {string} endDate - Fecha de finalización en formato ISO (ej: "2025-11-15T18:00:00")
 * @param {function} onExpire - Callback que se ejecuta cuando el contador llega a cero
 * @param {boolean} showExtendedMessage - Mostrar mensaje cuando se extiende el tiempo
 */
export function CountdownTimer({ endDate, onExpire, showExtendedMessage }) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate, 0));
  const [wasExtended, setWasExtended] = useState(false);
  const [timeOffset, setTimeOffset] = useState(0);
  
  // Estabilizar endDate para evitar cambios en dependencias
  const stableEndDate = useMemo(() => endDate, [endDate]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sincronizar con el servidor al montar y cuando cambie endDate
  useEffect(() => {
    const syncWithServer = async () => {
      const clientTime = Date.now();
      const serverTime = await SubastaOfertasService.getServerTime();
      const offset = serverTime.getTime() - clientTime;
      setTimeOffset(offset);
      setTimeLeft(calculateTimeLeft(stableEndDate, offset));
    };

    syncWithServer();
  }, [stableEndDate]);

  useEffect(() => {
    if (showExtendedMessage) {
      setWasExtended(true);
      const timeout = setTimeout(() => setWasExtended(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [showExtendedMessage]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(stableEndDate, timeOffset);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0 && onExpire) {
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [stableEndDate, onExpire, timeOffset]);

  // Si no hay fecha de fin, no mostrar nada
  if (!endDate) {
    return null;
  }

  // Placeholder durante SSR
  if (!isMounted) {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
        <p className="text-center text-gray-700 font-medium mb-3 text-sm">
          ⏰ Tiempo restante
        </p>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-lg p-2 text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Si el tiempo se agotó
  if (timeLeft.total <= 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 font-semibold text-lg">🔴 Subasta Finalizada</p>
        <p className="text-red-500 text-sm mt-1">Esta subasta ha terminado</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
      {wasExtended && (
        <div className="mb-3 bg-green-500 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold animate-pulse">
          Puja actualizada
        </div>
      )}
      
      <p className="text-center text-gray-700 font-medium mb-3 text-sm">
        ⏰ Tiempo restante
      </p>
      
      <div className="grid grid-cols-4 gap-2">
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>

      {timeLeft.total < 3600000 && ( // Menos de 1 hora
        <p className="text-center text-red-600 text-xs font-semibold mt-3 animate-pulse">
          ¡Última hora para ofertar!
        </p>
      )}
    </div>
  );
}

/**
 * Componente individual para mostrar una unidad de tiempo
 */
function TimeUnit({ value, label }) {
  return (
    <div className="bg-white rounded-lg p-2 shadow-sm text-center">
      <div className="text-2xl font-bold text-gray-900">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs text-gray-600 mt-1">
        {label}
      </div>
    </div>
  );
}

/**
 * Calcula el tiempo restante entre ahora y la fecha de finalización
 * @param {string} endDate - Fecha de finalización
 * @param {number} timeOffset - Offset entre servidor y cliente en ms
 */
function calculateTimeLeft(endDate, timeOffset = 0) {
  const now = Date.now() + timeOffset; // Usar hora del servidor
  const end = new Date(endDate).getTime();
  const difference = end - now;

  if (difference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/**
 * Hook personalizado para saber si una subasta está activa
 * @param {string} endDate - Fecha de finalización
 * @param {number} timeOffset - Offset entre servidor y cliente
 */
export function useSubastaActive(endDate, timeOffset = 0) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!endDate) {
      setIsActive(false);
      return;
    }

    const checkIfActive = () => {
      const now = Date.now() + timeOffset;
      const end = new Date(endDate).getTime();
      setIsActive(end > now);
    };

    checkIfActive();
    const interval = setInterval(checkIfActive, 1000);

    return () => clearInterval(interval);
  }, [endDate, timeOffset]);

  return isActive;
}
