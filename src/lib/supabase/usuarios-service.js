import { supabase } from "./server.js";

/**
 * Servicio para manejar autenticación y gestión de usuarios
 * Sistema de subastas con control de garantías
 */
export const UsuariosService = {
  /**
   * Registrar nuevo usuario
   * @param {Object} datos - Datos del usuario
   * @param {string} datos.email - Email del usuario
   * @param {string} datos.password - Contraseña (texto plano por ahora)
   * @param {string} datos.nombreCompleto - Nombre completo
   * @param {string} datos.telefono - Teléfono (opcional)
   * @param {string} datos.dni - DNI (opcional)
   * @returns {Promise<Object>} Resultado del registro
   */
  async registrarUsuario({ email, password, nombreCompleto, telefono = null, dni = null }) {
    try {
      const { data, error } = await supabase
        .rpc('registrar_usuario', {
          p_email: email,
          p_password: password,
          p_nombre_completo: nombreCompleto,
          p_telefono: telefono,
          p_dni: dni
        });

      if (error) {
        console.error("❌ Error al registrar:", error.message);
        return {
          success: false,
          message: error.message || "Error al registrar usuario"
        };
      }

      const result = data[0];
      return {
        success: result.success,
        userId: result.user_id,
        message: result.message
      };
    } catch (err) {
      console.error("❌ Error crítico en registro:", err);
      return {
        success: false,
        message: "Error al conectar con el servidor"
      };
    }
  },

  /**
   * Iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Datos del usuario si login exitoso
   */
  async iniciarSesion(email, password) {
    try {
      const { data, error } = await supabase
        .rpc('iniciar_sesion', {
          p_email: email,
          p_password: password
        });

      if (error) {
        console.error("❌ Error en login:", error.message);
        return {
          success: false,
          message: error.message || "Error al iniciar sesión"
        };
      }

      const result = data[0];
      
      if (!result.success) {
        return {
          success: false,
          message: result.message
        };
      }

      return {
        success: true,
        user: result.user_data,
        message: result.message
      };
    } catch (err) {
      console.error("❌ Error crítico en login:", err);
      return {
        success: false,
        message: "Error al conectar con el servidor"
      };
    }
  },

  /**
   * Obtener datos de usuario por ID
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object|null>} Datos del usuario
   */
  async obtenerUsuario(userId) {
    try {
      const { data, error } = await supabase
        .rpc('obtener_usuario', {
          p_user_id: userId
        });

      if (error) {
        console.error("❌ Error obteniendo usuario:", error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error("❌ Error crítico obteniendo usuario:", err);
      return null;
    }
  },

  /**
   * Verificar si usuario puede pujar (tiene garantía pagada)
   * @param {string} userId - ID del usuario
   * @returns {Promise<boolean>} true si puede pujar
   */
  async puedePujar(userId) {
    try {
      const { data, error } = await supabase
        .rpc('puede_pujar', {
          p_user_id: userId
        });

      if (error) {
        console.error("❌ Error verificando permisos:", error.message);
        return false;
      }

      return data;
    } catch (err) {
      console.error("❌ Error crítico verificando permisos:", err);
      return false;
    }
  },

  /**
   * Verificar si un email ya está registrado
   * @param {string} email - Email a verificar
   * @returns {Promise<boolean>} true si está disponible
   */
  async emailDisponible(email) {
    try {
      const { data, error } = await supabase
        .from('usuarios_subasta')
        .select('id')
        .eq('email', email)
        .eq('activo', true)
        .single();

      if (error && error.code === 'PGRST116') {
        // No encontrado = disponible
        return true;
      }

      // Si encontró algo = no disponible
      return false;
    } catch (err) {
      console.error("❌ [EMAIL] Error verificando:", err);
      return false;
    }
  },

  /**
   * Cerrar sesión (limpiar localStorage)
   */
  cerrarSesion() {
    localStorage.removeItem('subasta_user_session');
  },

  /**
   * Guardar sesión en localStorage
   * @param {Object} userData - Datos del usuario
   */
  guardarSesion(userData) {
    const session = {
      id: userData.id,
      email: userData.email,
      nombre: userData.nombre,
      telefono: userData.telefono,
      dni: userData.dni,
      garantiaPagada: userData.garantiaPagada,
      montoGarantia: userData.montoGarantia,
      fechaRegistro: userData.fechaRegistro,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('subasta_user_session', JSON.stringify(session));
  },

  /**
   * Obtener sesión de localStorage
   * @returns {Object|null} Datos de la sesión
   */
  obtenerSesion() {
    try {
      const sessionStr = localStorage.getItem('subasta_user_session');
      if (!sessionStr) return null;
      return JSON.parse(sessionStr);
    } catch (err) {
      console.error("❌ Error leyendo sesión:", err);
      return null;
    }
  },

  /**
   * Verificar si hay sesión activa
   * @returns {boolean}
   */
  haySeisionActiva() {
    const session = this.obtenerSesion();
    return session !== null;
  }
};
