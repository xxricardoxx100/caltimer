"use client";
import { useState, useEffect } from "react";

/**
 * Hook para manejar la identidad del usuario en subastas
 * Genera un ID único y permite al usuario elegir/cambiar su nombre
 * Todo se persiste en localStorage
 */
export function useSubastaUser() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    initializeUser();
  }, []);

  const initializeUser = () => {
    try {
      // Obtener o crear ID único
      let storedUserId = localStorage.getItem("subasta_user_id");
      if (!storedUserId) {
        storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("subasta_user_id", storedUserId);
      }
      setUserId(storedUserId);

      // Verificar si tiene nombre guardado
      const storedUserName = localStorage.getItem("subasta_user_name");
      if (storedUserName) {
        setUserName(storedUserName);
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      console.error("Error inicializando usuario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserName = (name) => {
    if (!name || name.trim().length === 0) {
      return false;
    }

    const trimmedName = name.trim();
    localStorage.setItem("subasta_user_name", trimmedName);
    setUserName(trimmedName);
    setIsNewUser(false);
    return true;
  };

  const changeUserName = (newName) => {
    return saveUserName(newName);
  };

  const resetUser = () => {
    localStorage.removeItem("subasta_user_id");
    localStorage.removeItem("subasta_user_name");
    setUserId(null);
    setUserName(null);
    setIsNewUser(true);
    initializeUser();
  };

  return {
    userId,
    userName,
    isNewUser,
    isLoading,
    saveUserName,
    changeUserName,
    resetUser,
  };
}
