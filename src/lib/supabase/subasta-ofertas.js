import { supabase } from "./server.js";

/**
 * Servicio para manejar ofertas de subastas en Supabase
 */
export const SubastaOfertasService = {
  /**
   * Obtener todas las ofertas de una subasta específica
   * @param {string} subastaId - ID de la subasta
   * @returns {Promise<Array>} Array de ofertas ordenadas por fecha (más reciente primero)
   */
  async getOfertas(subastaId) {
    try {
      // Intentar usar función RPC optimizada primero
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_ofertas_optimizado', { p_subasta_id: subastaId });

      if (!rpcError && rpcData) {
        console.log("⚡ [OPTIMIZADO] Usando función RPC optimizada");
        return rpcData;
      }

      // Fallback a consulta normal si RPC no existe
      console.log("📊 [FALLBACK] Usando consulta estándar");
      const { data, error } = await supabase
        .from("subastas_ofertas")
        .select("*")
        .eq("subasta_id", subastaId)
        .order("created_at", { ascending: false })
        .limit(50); // Limitar resultados para evitar sobrecarga

      if (error) {
        console.error("Error obteniendo ofertas:", error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error("Error en getOfertas:", err);
      return [];
    }
  },

  /**
   * Crear una nueva oferta
   * @param {Object} oferta - Datos de la oferta
   * @param {string} oferta.subastaId - ID de la subasta
   * @param {string} oferta.userId - ID del usuario
   * @param {string} oferta.userName - Nombre del usuario
   * @param {number} oferta.monto - Monto de la oferta
   * @param {string} oferta.fechaFinSubasta - Nueva fecha de finalización (opcional)
   * @returns {Promise<Object|null>} Oferta creada o null si hay error
   */
  async crearOferta({ subastaId, userId, userName, monto, fechaFinSubasta = null }, retryCount = 0) {
    console.log("🔵 [CREAR OFERTA] Iniciando...", {
      subastaId,
      userId,
      userName,
      monto,
      fechaFinSubasta,
      timestamp: new Date().toISOString(),
      intento: retryCount + 1
    });

    try {
      const payload = {
        subasta_id: subastaId,
        user_id: userId,
        user_name: userName,
        monto: monto,
      };

      // Agregar fecha_fin si se proporciona
      if (fechaFinSubasta) {
        payload.fecha_fin_subasta = fechaFinSubasta;
        console.log("⏰ [EXTENSIÓN] Agregando nueva fecha fin:", fechaFinSubasta);
      }

      console.log("📤 [SUPABASE] Enviando payload:", payload);

      const { data, error } = await supabase
        .from("subastas_ofertas")
        .insert([payload])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          console.warn("⚠️ [UNIQUE] Oferta duplicada detectada", {
            subastaId,
            monto,
          });
          return { duplicate: true };
        }
        // Reintentar si es error de red o timeout
        if ((error.code === 'PGRST301' || error.message.includes('timeout')) && retryCount < 2) {
          console.warn(`⚠️ [RETRY] Reintentando... (${retryCount + 1}/2)`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
          return this.crearOferta({ subastaId, userId, userName, monto, fechaFinSubasta }, retryCount + 1);
        }

        console.error("❌ [ERROR SUPABASE] Error creando oferta:", {
          error,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return null;
      }

      console.log("✅ [ÉXITO] Oferta creada en Supabase:", data);
      return data;
    } catch (err) {
      console.error("❌ [ERROR CRÍTICO] Error en crearOferta:", err);
      return null;
    }
  },

  /**
   * Obtener la última oferta (más alta) de una subasta
   * Usa vista materializada para mayor velocidad
   * @param {string} subastaId - ID de la subasta
   * @returns {Promise<Object|null>} Última oferta o null
   */
  async getUltimaOferta(subastaId) {
    try {
      // Consulta directa para garantizar consistencia inmediata
      const { data, error } = await supabase
        .from("subastas_ofertas")
        .select("*")
        .eq("subasta_id", subastaId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        return data;
      }

      if (error && error.code !== "PGRST116") {
        console.error("Error obteniendo última oferta (consulta directa):", error);
      }

      // Fallback a función RPC solo si no existe en tabla base
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_ultima_oferta_rapida', { p_subasta_id: subastaId })
        .single();

      if (!rpcError && rpcData) {
        console.log("⚡ [FALLBACK] Usando vista materializada para última oferta");
        return rpcData;
      }

      if (rpcError && rpcError.code !== "PGRST116") {
        console.error("Error en get_ultima_oferta_rapida:", rpcError);
      }

      return null;
    } catch (err) {
      console.error("Error en getUltimaOferta:", err);
      return null;
    }
  },

  /**
   * Suscribirse a cambios en las ofertas de una subasta
   * @param {string} subastaId - ID de la subasta
   * @param {Function} callback - Función que se ejecuta cuando hay cambios
   * @returns {Object} Suscripción de Supabase
   */
  suscribirseAOfertas(subastaId, callback) {
    const subscription = supabase
      .channel(`ofertas-${subastaId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "subastas_ofertas",
          filter: `subasta_id=eq.${subastaId}`,
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();

    return subscription;
  },

  /**
   * Obtener la hora actual del servidor (Supabase)
   * Útil para sincronizar contadores entre usuarios
   * @returns {Promise<Date>} Fecha y hora del servidor
   */
  async getServerTime() {
    try {
      const { data, error } = await supabase.rpc('get_server_time');
      
      if (error) {
        // Si falla, usar hora local como fallback
        console.warn("Usando hora local como fallback");
        return new Date();
      }
      
      return new Date(data);
    } catch (err) {
      console.warn("Error obteniendo hora del servidor, usando hora local");
      return new Date();
    }
  },

  /**
   * Obtener la última fecha de finalización de una subasta
   * @param {string} subastaId - ID de la subasta
   * @param {string} fechaOriginal - Fecha original de la subasta
   * @returns {Promise<string|null>} Fecha de finalización o null
   */
  async getFechaFinActual(subastaId, fechaOriginal) {
    try {
      const { data, error } = await supabase
        .from("subastas_ofertas")
        .select("fecha_fin_subasta")
        .eq("subasta_id", subastaId)
        .not("fecha_fin_subasta", "is", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        return fechaOriginal;
      }

      return data.fecha_fin_subasta;
    } catch (err) {
      return fechaOriginal;
    }
  },

  /**
   * Suscribirse a cambios en ofertas que incluyan extensión de tiempo
   * @param {string} subastaId - ID de la subasta
   * @param {Function} onNuevaOferta - Callback para nuevas ofertas
   * @param {Function} onExtensionTiempo - Callback cuando se extiende el tiempo
   * @returns {Object} Suscripción de Supabase
   */
  suscribirseConExtension(subastaId, onNuevaOferta, onExtensionTiempo) {
    console.log("🔔 [SUSCRIPCIÓN] Iniciando suscripción para subasta:", subastaId);

    const subscription = supabase
      .channel(`ofertas-extended-${subastaId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "subastas_ofertas",
          filter: `subasta_id=eq.${subastaId}`,
        },
        (payload) => {
          console.log("📨 [REALTIME] Evento recibido:", {
            payload,
            timestamp: new Date().toISOString()
          });

          const nuevaOferta = payload.new;
          console.log("📊 [NUEVA OFERTA] Datos:", nuevaOferta);

          onNuevaOferta(nuevaOferta);
          
          // Si la oferta incluye extensión de tiempo, notificar
          if (nuevaOferta.fecha_fin_subasta) {
            console.log("⏰ [EXTENSIÓN DETECTADA] Nueva fecha:", nuevaOferta.fecha_fin_subasta);
            onExtensionTiempo(nuevaOferta.fecha_fin_subasta);
          }
        }
      )
      .subscribe((status) => {
        console.log("🔔 [ESTADO SUSCRIPCIÓN]", status);
      });

    return subscription;
  },

  /**
   * Cancelar una suscripción de Supabase
   * @param {Object} subscription - Suscripción a cancelar
   * @returns {Promise<void>}
   */
  async cancelarSuscripcion(subscription) {
    if (subscription) {
      await supabase.removeChannel(subscription);
    }
  },
};
