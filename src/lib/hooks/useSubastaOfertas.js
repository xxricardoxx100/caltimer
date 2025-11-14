"use client";
import { useState, useEffect } from "react";
import { SubastaOfertasService } from "@/lib/supabase/subasta-ofertas";

/**
 * Hook para manejar ofertas de subasta con Supabase
 * Carga ofertas existentes y se suscribe a cambios en tiempo real
 * 
 * @param {string} subastaId - ID de la subasta
 * @param {number} precioInicial - Precio inicial del vehículo
 * @param {Function} onExtensionTiempo - Callback cuando se extiende el tiempo
 * @returns {Object} Estado y funciones para manejar ofertas
 */
export function useSubastaOfertas(subastaId, precioInicial = 0, onExtensionTiempo = null) {
  const [ofertas, setOfertas] = useState([]);
  const [precioActual, setPrecioActual] = useState(precioInicial);
  const [ultimoPostor, setUltimoPostor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar ofertas existentes al montar el componente
  useEffect(() => {
    if (!subastaId) return;

    const cargarOfertas = async () => {
      setIsLoading(true);
      try {
        const ofertasData = await SubastaOfertasService.getOfertas(subastaId);
        
        if (ofertasData.length > 0) {
          setOfertas(ofertasData);
          // La oferta más reciente (primera en el array) tiene el precio más alto
          const ultimaOferta = ofertasData[0];
          setPrecioActual(ultimaOferta.monto);
          setUltimoPostor(ultimaOferta.user_name);
        } else {
          // Si no hay ofertas, usar precio inicial
          setPrecioActual(precioInicial);
        }
      } catch (err) {
        console.error("Error cargando ofertas:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarOfertas();
  }, [subastaId, precioInicial]);

  // Suscribirse a nuevas ofertas en tiempo real
  useEffect(() => {
    if (!subastaId) return;

    const subscription = SubastaOfertasService.suscribirseConExtension(
      subastaId,
      (nuevaOferta) => {
        // Agregar nueva oferta al inicio del array
        setOfertas((prev) => [nuevaOferta, ...prev]);
        setPrecioActual(nuevaOferta.monto);
        setUltimoPostor(nuevaOferta.user_name);
      },
      (nuevaFechaFin) => {
        // Notificar extensión de tiempo si hay callback
        if (onExtensionTiempo) {
          onExtensionTiempo(nuevaFechaFin);
        }
      }
    );

    // Cleanup: cancelar suscripción al desmontar
    return () => {
      SubastaOfertasService.cancelarSuscripcion(subscription);
    };
  }, [subastaId, onExtensionTiempo]);

  /**
   * Crear una nueva oferta
   * @param {Object} params - Parámetros de la oferta
   * @param {string} params.userId - ID del usuario
   * @param {string} params.userName - Nombre del usuario
   * @param {number} params.incremento - Cantidad a incrementar
   * @param {string} params.fechaFinSubasta - Nueva fecha de finalización (opcional)
   * @returns {Promise<boolean>} true si se creó exitosamente
   */
  const crearOferta = async ({ userId, userName, incremento = 50, fechaFinSubasta = null }) => {
    if (!subastaId || !userId || !userName) {
      console.error("Faltan parámetros para crear oferta");
      return false;
    }

    const nuevoMonto = precioActual + incremento;

    try {
      const ofertaCreada = await SubastaOfertasService.crearOferta({
        subastaId,
        userId,
        userName,
        monto: nuevoMonto,
        fechaFinSubasta,
      });

      if (ofertaCreada) {
        // La actualización del estado se hará automáticamente
        // a través de la suscripción de Realtime
        return true;
      }

      return false;
    } catch (err) {
      console.error("Error al crear oferta:", err);
      setError(err);
      return false;
    }
  };

  return {
    ofertas,
    precioActual,
    ultimoPostor,
    isLoading,
    error,
    crearOferta,
  };
}
