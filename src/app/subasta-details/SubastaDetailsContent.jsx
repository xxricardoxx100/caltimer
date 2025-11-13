"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { subastaData } from "../components/subastas/SubastaData";
import { useSubastaUser } from "@/lib/hooks/useSubastaUser";
import { UserNameModal } from "../components/subastas/UserNameModal";
import { CountdownTimer, useSubastaActive } from "../components/subastas/CountdownTimer"; 

// AHORA ESTE ES UN COMPONENTE SEPARADO
export function SubastaDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalNombre, setMostrarModalNombre] = useState(false);
  
  // Hook de usuario para subastas
  const { userId, userName, isNewUser, isLoading, saveUserName, changeUserName } = useSubastaUser();

  // Buscar el vehículo por ID
  const vehiculo = subastaData.find(v => v.id === parseInt(id));
  
  // Verificar si la subasta está activa
  const isSubastaActive = useSubastaActive(vehiculo?.fecha_fin);

  if (!vehiculo) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Vehículo no encontrado</h1>
        <Link href="/subasta" className="text-blue-600 hover:underline">
          Volver a Subastas
        </Link>
      </div>
    );
  }

  const imagenActual = vehiculo.imagenes[imagenSeleccionada];

  return (
    // Todo tu JSX de detalles del vehículo va aquí
    // ... (El resto de tu código original: MODAL, Breadcrumb, Título, Grids, etc.)
    <div data-scroll-section className="pt-25 pb-16">
      {/* MODAL DE NOMBRE DE USUARIO */}
      <UserNameModal 
        isOpen={isNewUser || mostrarModalNombre}
        onSave={(name) => {
          const success = saveUserName(name);
          if (success) {
            setMostrarModalNombre(false);
          }
          return success;
        }}
        currentName={userName}
      />

      {/* MODAL / LIGHTBOX DE PANTALLA COMPLETA */}
      {/* ... (código del modal) ... */}
      {mostrarModal && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setMostrarModal(false)}
        >
          <div 
            className="relative w-full h-full max-w-screen-xl max-h-screen-xl"
            onClick={e => e.stopPropagation()}
          >
            <Image 
              src={imagenActual} 
              alt="Imagen en pantalla completa" 
              fill
              className="object-contain"
            />
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold p-2 bg-gray-800 rounded-full hover:bg-gray-700 z-50"
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* FIN DEL MODAL */}

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/subasta" className="text-blue-600 hover:underline">
            ← Volver a Subastas
          </Link>
        </div>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">
            {vehiculo.marca} {vehiculo.modelo} {vehiculo.año}
          </h1>
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full">
            En Subasta Activa
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Imágenes */}
          <div className="lg:col-span-2">
            {/* Imagen principal */}
            <div 
              className="bg-gray-100 rounded-lg shadow-lg mb-4 flex items-center justify-center h-96 p-2 cursor-pointer relative" 
              onClick={() => setMostrarModal(true)} 
            >
              <Image 
                src={imagenActual}
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                fill 
                className="object-contain" 
              />
            </div>
            
            {/* Galería de miniaturas */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {vehiculo.imagenes.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setImagenSeleccionada(index)}
                  className={`relative w-full h-24 bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-all ${
                    imagenSeleccionada === index ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <Image 
                    src={img}
                    alt={`Vista ${index + 1}`}
                    fill 
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{vehiculo.descripcion}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Características</h2>
              <div className="grid grid-cols-2 gap-3">
                {vehiculo.caracteristicas.map((caracteristica, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Información y precio */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Información del usuario */}
              {userName && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Participando como</p>
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMostrarModalNombre(true)}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-gray-600 mb-2">Precio actual</p>
                <p className="text-4xl font-bold text-orange-600 mb-4"> 
                  ${vehiculo.precio.toLocaleString()}
                </p>
                
                {/* Contador regresivo */}
                <div className="mb-4">
                  <CountdownTimer 
                    endDate={vehiculo.fecha_fin}
                    onExpire={() => console.log('Subasta finalizada')}
                  />
                </div>

                <button 
                  disabled={!isSubastaActive || !userName}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                >
                  {!userName ? 'Ingresa tu nombre para ofertar' : !isSubastaActive ? 'Subasta Finalizada' : 'Hacer Oferta'}
                </button>
                
                {!userName && isSubastaActive && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Necesitas ingresar tu nombre para participar
                  </p>
                )}
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-bold text-lg mb-4">Especificaciones</h3>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Año:</span>
                  <span className="font-semibold">{vehiculo.año}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Kilometraje:</span>
                  <span className="font-semibold">{vehiculo.kilometraje}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Transmisión:</span>
                  <span className="font-semibold">{vehiculo.transmision}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Combustible:</span>
                  <span className="font-semibold">{vehiculo.combustible}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-semibold">{vehiculo.color}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Puertas:</span>
                  <span className="font-semibold">{vehiculo.puertas}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className="font-semibold">{vehiculo.estado}</span>
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition">
                  Contactar Vendedor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}