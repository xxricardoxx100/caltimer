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
      const { data, error } = await supabase
        .from("subastas_ofertas")
        .select("*")
        .eq("subasta_id", subastaId)
        .order("created_at", { ascending: false });

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
  async crearOferta({ subastaId, userId, userName, monto, fechaFinSubasta = null }) {
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
      }

      const { data, error } = await supabase
        .from("subastas_ofertas")
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error("Error creando oferta:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Error en crearOferta:", err);
      return null;
    }
  },

  /**
   * Obtener la última oferta (más alta) de una subasta
   * @param {string} subastaId - ID de la subasta
   * @returns {Promise<Object|null>} Última oferta o null
   */
  async getUltimaOferta(subastaId) {
    try {
      const { data, error } = await supabase
        .from("subastas_ofertas")
        .select("*")
        .eq("subasta_id", subastaId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // Si no hay ofertas, esto es normal
        if (error.code === "PGRST116") {
          return null;
        }
        console.error("Error obteniendo última oferta:", error);
        return null;
      }

      return data;
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
   * @returns {Promise<string|null>} Fecha de finalización o null
   */
  async getFechaFinActual(subastaId) {
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
        return null;
      }

      return data.fecha_fin_subasta;
    } catch (err) {
      return null;
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
          const nuevaOferta = payload.new;
          onNuevaOferta(nuevaOferta);
          
          // Si la oferta incluye extensión de tiempo, notificar
          if (nuevaOferta.fecha_fin_subasta) {
            onExtensionTiempo(nuevaOferta.fecha_fin_subasta);
          }
        }
      )
      .subscribe();

    return subscription;
  },
};
