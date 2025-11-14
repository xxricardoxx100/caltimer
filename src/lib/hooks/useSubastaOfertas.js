"use client";
import { useState, useEffect, useRef } from "react";
import { SubastaOfertasService } from "@/lib/supabase/subasta-ofertas";

/**
 * Hook para manejar ofertas de subasta con Supabase
 * Carga ofertas existentes y se suscribe a cambios en tiempo real
 * Incluye optimizaciones: debouncing, deduplicación, caché
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
  
  // Refs para prevenir actualizaciones duplicadas
  const ofertasIdsRef = useRef(new Set());
  const debounceTimerRef = useRef(null);

  // Cargar ofertas existentes al montar el componente
  useEffect(() => {
    if (!subastaId) return;

    const cargarOfertas = async () => {
      setIsLoading(true);
      try {
        const ofertasData = await SubastaOfertasService.getOfertas(subastaId);
        
        if (ofertasData.length > 0) {
          setOfertas(ofertasData);
          // Guardar IDs en el Set para deduplicación
          ofertasIdsRef.current = new Set(ofertasData.map(o => o.id));
          
          // La oferta más reciente (primera en el array) tiene el precio más alto
          const ultimaOferta = ofertasData[0];
          setPrecioActual(ultimaOferta.monto);
          setUltimoPostor(ultimaOferta.user_name);
        } else {
          // Si no hay ofertas, usar precio inicial
          setPrecioActual(precioInicial);
          ofertasIdsRef.current = new Set();
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

    console.log("🎯 [HOOK] Iniciando suscripción desde useSubastaOfertas");

    const subscription = SubastaOfertasService.suscribirseConExtension(
      subastaId,
      (nuevaOferta) => {
        // Prevenir duplicados
        if (ofertasIdsRef.current.has(nuevaOferta.id)) {
          console.log("⚠️ [DEDUP] Oferta duplicada ignorada:", nuevaOferta.id);
          return;
        }

        console.log("🔄 [HOOK] Actualizando estado con nueva oferta:", nuevaOferta);
        
        // Debouncing: cancelar actualización anterior si existe
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          // Agregar ID al Set
          ofertasIdsRef.current.add(nuevaOferta.id);
          
          // Agregar nueva oferta al inicio del array
          setOfertas((prev) => {
            console.log("📋 [ESTADO] Ofertas anteriores:", prev.length);
            const nuevasOfertas = [nuevaOferta, ...prev];
            console.log("📋 [ESTADO] Nuevas ofertas:", nuevasOfertas.length);
            return nuevasOfertas;
          });
          
          setPrecioActual(nuevaOferta.monto);
          console.log("💰 [ESTADO] Precio actualizado a:", nuevaOferta.monto);
          
          setUltimoPostor(nuevaOferta.user_name);
          console.log("👤 [ESTADO] Último postor actualizado a:", nuevaOferta.user_name);
        }, 100); // Debounce de 100ms
      },
      (nuevaFechaFin) => {
        console.log("⏰ [HOOK] Extensión de tiempo recibida:", nuevaFechaFin);
        // Notificar extensión de tiempo si hay callback
        if (onExtensionTiempo) {
          onExtensionTiempo(nuevaFechaFin);
        }
      }
    );

    // Cleanup: cancelar suscripción y timers al desmontar
    return () => {
      console.log("🔴 [HOOK] Cancelando suscripción");
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
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
    console.log("🎬 [HOOK crearOferta] Iniciando...", {
      subastaId,
      userId,
      userName,
      incremento,
      precioActual,
      fechaFinSubasta
    });

    if (!subastaId || !userId || !userName) {
      console.error("❌ [HOOK] Faltan parámetros para crear oferta", {
        subastaId,
        userId,
        userName
      });
      return false;
    }

    const nuevoMonto = precioActual + incremento;
    console.log("💰 [HOOK] Nuevo monto calculado:", nuevoMonto);

    try {
      const ofertaCreada = await SubastaOfertasService.crearOferta({
        subastaId,
        userId,
        userName,
        monto: nuevoMonto,
        fechaFinSubasta,
      });

      if (ofertaCreada) {
        console.log("✅ [HOOK] Oferta creada exitosamente, esperando actualización vía Realtime");
        // La actualización del estado se hará automáticamente
        // a través de la suscripción de Realtime
        return true;
      }

      console.warn("⚠️ [HOOK] crearOferta retornó null");
      return false;
    } catch (err) {
      console.error("❌ [HOOK] Error al crear oferta:", err);
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
