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
  const [precioActual, setPrecioActual] = useState(null);
  const [ultimoPostor, setUltimoPostor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs para mantener estabilidad en timestamps generados en cliente
  const debounceTimerRef = useRef(null);
  const extensionCallbackRef = useRef(onExtensionTiempo);

  useEffect(() => {
    extensionCallbackRef.current = onExtensionTiempo;
  }, [onExtensionTiempo]);

  const normalizeOferta = (rawOferta) => {
    if (!rawOferta) return null;

    const oferta = { ...rawOferta };

    const montoNumero = Number(oferta.monto);
    oferta.monto = Number.isFinite(montoNumero) ? montoNumero : 0;

    if (oferta.created_at) {
      const isoDate = new Date(oferta.created_at).toISOString();
      oferta.created_at = isoDate;
      oferta.__clientCreatedAt = isoDate;
    } else if (oferta.__clientCreatedAt) {
      oferta.created_at = oferta.__clientCreatedAt;
    } else {
      const fallback = new Date().toISOString();
      oferta.__clientCreatedAt = fallback;
      oferta.created_at = fallback;
    }

    if (!oferta.subasta_id && subastaId) {
      oferta.subasta_id = subastaId;
    }

    return oferta;
  };

  const buildUniqueId = (oferta) => {
    if (!oferta) return "";
    if (oferta.id) return oferta.id;

    const baseSubasta = oferta.subasta_id || subastaId || "subasta";
    return `${baseSubasta}-${oferta.__clientCreatedAt || oferta.created_at}`;
  };

  const mergeOfertas = (entrantes = [], anteriores = []) => {
    const dedupeMap = new Map();

    anteriores.forEach((existente) => {
      const normalizada = normalizeOferta(existente);
      if (!normalizada) return;
      dedupeMap.set(buildUniqueId(normalizada), normalizada);
    });

    entrantes.forEach((nueva) => {
      const normalizada = normalizeOferta(nueva);
      if (!normalizada) return;
      dedupeMap.set(buildUniqueId(normalizada), normalizada);
    });

    const ordenadas = Array.from(dedupeMap.values()).sort((a, b) => {
      const fechaA = new Date(a.created_at).getTime();
      const fechaB = new Date(b.created_at).getTime();
      return fechaB - fechaA;
    });

    const vistosPorClave = new Map();
    const depuradas = [];

    ordenadas.forEach((item) => {
      const identificadorUsuario = item.user_id || item.user_name || "";
      const clave = `${item.monto}-${identificadorUsuario}`;
      const existente = vistosPorClave.get(clave);

      if (!existente) {
        vistosPorClave.set(clave, item);
        depuradas.push(item);
        return;
      }

      // Priorizar registros con ID (datos oficiales desde Supabase)
      if (!existente.id && item.id) {
        vistosPorClave.set(clave, item);
        const indice = depuradas.indexOf(existente);
        if (indice !== -1) {
          depuradas.splice(indice, 1, item);
        }
      }
    });

    return depuradas.sort((a, b) => {
      const fechaA = new Date(a.created_at).getTime();
      const fechaB = new Date(b.created_at).getTime();
      return fechaB - fechaA;
    });
  };

  const upsertOferta = (oferta) => {
    if (!oferta) return;
    setOfertas((prev) => mergeOfertas([oferta], prev));
  };

  const syncUltimaOferta = async () => {
    if (!subastaId) return;
    try {
      const ultimaOfertaServidor = await SubastaOfertasService.getUltimaOferta(subastaId);
      if (ultimaOfertaServidor) {
        upsertOferta(ultimaOfertaServidor);
      }
    } catch (syncError) {
      console.warn("⚠️ [HOOK] No se pudo sincronizar la última oferta", syncError);
    }
  };

  // Cargar ofertas existentes al montar el componente
  useEffect(() => {
    if (!subastaId) return;

    const cargarOfertas = async () => {
      setIsLoading(true);
      try {
        const ofertasData = await SubastaOfertasService.getOfertas(subastaId);

        if (ofertasData.length > 0) {
          setOfertas(mergeOfertas(ofertasData));
        } else {
          setOfertas([]);
          setUltimoPostor(null);
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
        console.log("🔄 [HOOK] Actualizando estado con nueva oferta:", nuevaOferta);
        
        // Debouncing: cancelar actualización anterior si existe
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          upsertOferta(nuevaOferta);

          SubastaOfertasService.getOfertas(subastaId)
            .then((ofertasServidor) => {
              if (!Array.isArray(ofertasServidor)) {
                return;
              }
              setOfertas(mergeOfertas(ofertasServidor));
            })
            .catch((refreshError) => {
              console.warn("⚠️ [HOOK] No se pudo refrescar ofertas tras evento realtime", refreshError);
            });
        }, 100); // Debounce de 100ms
      },
      (nuevaFechaFin) => {
        console.log("⏰ [HOOK] Extensión de tiempo recibida:", nuevaFechaFin);
        // Notificar extensión de tiempo si hay callback
        if (extensionCallbackRef.current) {
          extensionCallbackRef.current(nuevaFechaFin);
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
  }, [subastaId]);

  useEffect(() => {
    if (ofertas.length > 0) {
      const mejorOferta = ofertas[0];
      const montoNumero = Number(mejorOferta.monto);
      setPrecioActual(Number.isFinite(montoNumero) ? montoNumero : precioInicial);
      setUltimoPostor(mejorOferta.user_name || null);
    } else if (!isLoading) {
      setPrecioActual(precioInicial);
      setUltimoPostor(null);
    }
  }, [ofertas, precioInicial, isLoading]);

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

    let baseMonto = precioActual ?? precioInicial;
    try {
      const ultimaOfertaServidor = await SubastaOfertasService.getUltimaOferta(subastaId);
      if (ultimaOfertaServidor) {
        const montoServidor = Number(ultimaOfertaServidor.monto);
        baseMonto = Math.max(baseMonto, Number.isFinite(montoServidor) ? montoServidor : precioInicial);
        upsertOferta(ultimaOfertaServidor);
      } else {
        baseMonto = Math.max(baseMonto, precioInicial);
      }
    } catch (fetchError) {
      console.warn("⚠️ [HOOK] No se pudo sincronizar con la última oferta, usando estado local", fetchError);
      baseMonto = Math.max(baseMonto, precioInicial);
    }

    const nuevoMonto = baseMonto + incremento;
    console.log("💰 [HOOK] Nuevo monto calculado:", nuevoMonto);

    try {
      const ofertaCreada = await SubastaOfertasService.crearOferta({
        subastaId,
        userId,
        userName,
        monto: nuevoMonto,
        fechaFinSubasta,
      });

      if (ofertaCreada?.duplicate) {
        console.warn("⚠️ [HOOK] Oferta duplicada detectada para el monto", nuevoMonto);
        await syncUltimaOferta();
        return "duplicate";
      }

      if (ofertaCreada) {
        console.log("✅ [HOOK] Oferta creada exitosamente, esperando actualización vía Realtime");
        await syncUltimaOferta();
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
