"use client";
import { useState } from "react";

/**
 * Modal para que el usuario ingrese su nombre la primera vez
 * o para cambiar su nombre actual
 */
export function UserNameModal({ isOpen, onSave, currentName = "" }) {
  const [nombre, setNombre] = useState(currentName);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      setError("Por favor ingresa un nombre");
      return;
    }

    if (nombre.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    if (nombre.trim().length > 30) {
      setError("El nombre no puede tener más de 30 caracteres");
      return;
    }

    const success = onSave(nombre);
    if (success) {
      setError("");
    } else {
      setError("Error al guardar el nombre");
    }
  };

  const handleGenerateRandom = () => {
    const randomName = `Usuario${Math.floor(Math.random() * 9999)}`;
    setNombre(randomName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
            <svg 
              className="w-8 h-8 text-orange-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentName ? "Cambiar nombre" : "¡Bienvenido a la Subasta!"}
          </h2>
          <p className="text-gray-600">
            {currentName 
              ? "Ingresa tu nuevo nombre de participante" 
              : "Ingresa tu nombre para participar en las subastas"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="nombre" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tu nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setError("");
              }}
              placeholder="Ej: Juan Pérez"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              maxLength={30}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerateRandom}
            className="w-full text-sm text-gray-600 hover:text-orange-600 transition"
          >
            o generar nombre aleatorio
          </button>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {currentName ? "Actualizar" : "Comenzar"}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Tu nombre se guardará en tu navegador y podrás cambiarlo cuando quieras
        </p>
      </div>
    </div>
  );
}
