"use client";
import { useState, useEffect } from "react";
import { UsuariosService } from "@/lib/supabase/usuarios-service";

/**
 * Hook para manejar autenticación y datos del usuario en subastas
 * Sistema completo con verificación de garantía pagada
 * Persiste sesión en localStorage
 */
export function useSubastaUser() {
  const [isMounted, setIsMounted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [garantiaPagada, setGarantiaPagada] = useState(false);
  const [montoGarantia, setMontoGarantia] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Marcar componente como montado en el cliente
    setIsMounted(true);
    
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    initializeUser();
  }, []);

  // Auto-actualización cada 30 segundos cuando está logueado
  useEffect(() => {
    if (!isLoggedIn || !userId) return;

    const interval = setInterval(async () => {
      console.log("🔄 Auto-actualización de garantía");
      try {
        const userData = await UsuariosService.obtenerUsuario(userId);
        if (userData) {
          setGarantiaPagada(userData.garantiaPagada);
          setMontoGarantia(userData.montoGarantia);
          
          const session = UsuariosService.obtenerSesion();
          if (session) {
            session.garantiaPagada = userData.garantiaPagada;
            session.montoGarantia = userData.montoGarantia;
            localStorage.setItem('subasta_user_session', JSON.stringify(session));
          }
        }
      } catch (error) {
        console.error("❌ Error en auto-actualización:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn, userId]);

  const initializeUser = () => {
    try {
      const session = UsuariosService.obtenerSesion();
      
      if (session) {
        setUserId(session.id);
        setUserName(session.nombre);
        setUserEmail(session.email);
        setIsLoggedIn(true);
        setGarantiaPagada(session.garantiaPagada || false);
        setMontoGarantia(session.montoGarantia || 0);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("❌ Error inicializando usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login de usuario (llamado desde AuthModal)
   * @param {Object} userData - Datos del usuario desde el login
   */
  const login = (userData) => {
    setUserId(userData.id);
    setUserName(userData.nombre);
    setUserEmail(userData.email);
    setIsLoggedIn(true);
    setGarantiaPagada(userData.garantiaPagada || false);
    setMontoGarantia(userData.montoGarantia || 0);
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    UsuariosService.cerrarSesion();
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    setGarantiaPagada(false);
    setMontoGarantia(0);
  };

  /**
   * Actualizar datos del usuario (para cuando admin apruebe garantía)
   */
  const actualizarDatos = async () => {
    if (!userId) return false;

    try {
      setIsRefreshing(true);
      const userData = await UsuariosService.obtenerUsuario(userId);
      
      if (userData) {
        setUserName(userData.nombre);
        setGarantiaPagada(userData.garantiaPagada);
        setMontoGarantia(userData.montoGarantia);
        
        // Actualizar localStorage
        const session = UsuariosService.obtenerSesion();
        if (session) {
          session.garantiaPagada = userData.garantiaPagada;
          session.montoGarantia = userData.montoGarantia;
          localStorage.setItem('subasta_user_session', JSON.stringify(session));
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Error actualizando datos:", error);
      return false;
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * Verificar si el usuario puede pujar
   * @returns {boolean}
   */
  const puedePujar = () => {
    return isLoggedIn && garantiaPagada;
  };

  return {
    // Estados
    userId,
    userName,
    userEmail,
    isLoggedIn,
    garantiaPagada,
    montoGarantia,
    isLoading,
    isRefreshing,
    isMounted,
    
    // Funciones
    login,
    logout,
    actualizarDatos,
    puedePujar
  };
}
