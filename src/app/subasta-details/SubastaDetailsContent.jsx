"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { subastaData } from "../components/subastas/SubastaData";
import { useSubastaUser } from "@/lib/hooks/useSubastaUser";
import { useSubastaOfertas } from "@/lib/hooks/useSubastaOfertas";
import { SubastaOfertasService } from "@/lib/supabase/subasta-ofertas";
import { AuthModal } from "../components/subastas/AuthModal";
import { CountdownTimer, useSubastaActive } from "../components/subastas/CountdownTimer"; 

// AHORA ESTE ES UN COMPONENTE SEPARADO
export function SubastaDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarAuthModal, setMostrarAuthModal] = useState(false);
  
  // Hook de usuario con autenticación completa
  const { 
    userId, 
    userName, 
    userEmail,
    isLoggedIn,
    garantiaPagada,
    montoGarantia,
    isLoading,
    isRefreshing,
    isMounted,
    login,
    logout,
    actualizarDatos,
    puedePujar
  } = useSubastaUser();

  // Buscar el vehículo por ID
  const vehiculo = subastaData.find(v => v.id === parseInt(id));
  
  // Estado para la fecha de finalización dinámica
  const [fechaFin, setFechaFin] = useState(vehiculo?.fecha_fin);
  const [mostrarMensajeExtension, setMostrarMensajeExtension] = useState(false);
  
  // Cargar fecha de finalización desde Supabase
  useEffect(() => {
    if (!id || !vehiculo?.fecha_fin) return;

    const cargarFecha = async () => {
      const fechaGuardada = await SubastaOfertasService.getFechaFinActual(id);
      if (fechaGuardada) {
        setFechaFin(fechaGuardada);
      }
    };

    cargarFecha();
  }, [id, vehiculo?.fecha_fin]);
  
  // Verificar si la subasta está activa
  const isSubastaActive = useSubastaActive(fechaFin);

  // Hook de ofertas con Supabase (reemplaza estado local)
  const { 
    ofertas, 
    precioActual, 
    ultimoPostor, 
    isLoading: isLoadingOfertas,
    crearOferta 
  } = useSubastaOfertas(id, vehiculo?.precio, (nuevaFechaFin) => {
    // Callback cuando se extiende el tiempo
    setFechaFin(nuevaFechaFin);
    setMostrarMensajeExtension(true);
  });

  // useEffect para ocultar el mensaje después de 1 segundo
  useEffect(() => {
    if (mostrarMensajeExtension) {
      const timer = setTimeout(() => {
        setMostrarMensajeExtension(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [mostrarMensajeExtension]);

  // Función para manejar click en botón de puja
  const handleClickPujar = () => {
    if (!isLoggedIn) {
      setMostrarAuthModal(true);
      return;
    }

    if (!garantiaPagada) {
      alert("Debes pagar la garantía para poder pujar. Por favor contacta al administrador.");
      return;
    }

    hacerOferta();
  };

  // Función para manejar el logout con confirmación
  const handleLogout = () => {
    const confirmar = window.confirm("¿Estás seguro que deseas cerrar tu sesión?");
    if (confirmar) {
      logout();
    }
  };

  // Función para hacer una oferta
  const hacerOferta = async () => {
    if (!userName || !userId || !isSubastaActive) {
      console.warn("⚠️ No se puede hacer oferta - verificar usuario y estado de subasta");
      return;
    }

    const incremento = 50;
    const serverTime = await SubastaOfertasService.getServerTime();
    const ahora = serverTime.getTime();
    const fin = new Date(fechaFin).getTime();
    const tiempoRestante = fin - ahora;
    
    // Si quedan menos de 60 segundos, extender 60 segundos
    let nuevaFechaFin = null;
    if (tiempoRestante < 60000 && tiempoRestante > 0) {
      nuevaFechaFin = new Date(ahora + 60000).toISOString();
      console.log("🔄 Extendiendo subasta 60 segundos");
    }

    const exito = await crearOferta({
      userId,
      userName,
      incremento,
      fechaFinSubasta: nuevaFechaFin,
    });

    if (exito && nuevaFechaFin) {
      setFechaFin(nuevaFechaFin);
      setMostrarMensajeExtension(true);
    }
  };

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
      {/* MODAL DE AUTENTICACIÓN */}
      <AuthModal 
        isOpen={mostrarAuthModal}
        onClose={() => setMostrarAuthModal(false)}
        onSuccess={(userData) => {
          login(userData);
          console.log("✅ [COMPONENTE] Usuario logueado:", userData);
        }}
      />
      {/* MODAL DE AUTENTICACIÓN */}
      <AuthModal 
        isOpen={mostrarAuthModal}
        onClose={() => setMostrarAuthModal(false)}
        onSuccess={(userData) => {
          login(userData);
          console.log("✅ [COMPONENTE] Usuario logueado:", userData);
        }}
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
              {!isMounted ? (
                // Placeholder durante SSR para evitar hidratación
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
              ) : isLoggedIn ? (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">
                          {userName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conectado como</p>
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-400">{userEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={actualizarDatos}
                        disabled={isRefreshing}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                        title="Actualizar estado de garantía"
                      >
                        <span className={isRefreshing ? "animate-spin" : ""}>
                          🔄
                        </span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Salir
                      </button>
                    </div>
                  </div>
                  
                  {/* Estado de garantía */}
                  {garantiaPagada ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-sm">✓</span>
                        <div>
                          <p className="text-xs font-semibold text-green-700">Garantía Aprobada</p>
                          <p className="text-xs text-green-600">Puedes participar en las pujas</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-sm">⚠️</span>
                        <div>
                          <p className="text-xs font-semibold text-yellow-700">Garantía Pendiente</p>
                          <p className="text-xs text-yellow-600">Contacta al admin para pujar</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-blue-800 mb-2">
                      🔑 Inicia sesión para participar
                    </p>
                    <button
                      onClick={() => setMostrarAuthModal(true)}
                      className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Iniciar Sesión / Registrarse
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-gray-600 mb-2">Precio actual</p>
                <p className="text-4xl font-bold text-orange-600 mb-2"> 
                  {isMounted ? `$${precioActual.toLocaleString()}` : `$${precioActual}`}
                </p>
                {ultimoPostor && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600">Última oferta por:</span>
                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {ultimoPostor.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-700">{ultimoPostor}</span>
                      {ultimoPostor === userName && (
                        <span className="text-xs text-green-600">(Tú)</span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Contador regresivo */}
                <div className="mb-4">
                  <CountdownTimer 
                    endDate={fechaFin}
                    onExpire={() => console.log('Subasta finalizada')}
                    showExtendedMessage={mostrarMensajeExtension}
                  />
                </div>

                <button 
                  onClick={handleClickPujar}
                  disabled={!isSubastaActive}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                >
                  {!isSubastaActive 
                    ? 'Subasta Finalizada' 
                    : !isLoggedIn
                    ? '🔑 Iniciar Sesión para Pujar'
                    : !garantiaPagada
                    ? '🔒 Garantía Requerida'
                    : `Hacer Oferta (+$${50})`
                  }
                </button>
                
                {!isLoggedIn && isSubastaActive && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Debes iniciar sesión para participar en la subasta
                  </p>
                )}
                
                {isLoggedIn && !garantiaPagada && isSubastaActive && (
                  <p className="text-xs text-yellow-600 text-center mt-2">
                    ⚠️ Contacta al administrador para aprobar tu garantía
                  </p>
                )}
              </div>

              {/* Historial de ofertas */}
              {ofertas.length > 0 && (
                <div className="border-t pt-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center justify-between">
                    <span>Historial de Ofertas</span>
                    <span className="text-sm font-normal text-gray-500">({ofertas.length})</span>
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {ofertas.map((oferta, index) => (
                      <div 
                        key={oferta.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          index === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-green-500' : 'bg-gray-400'
                          }`}>
                            <span className="text-white text-xs font-semibold">
                              {oferta.user_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {oferta.user_name}
                              {oferta.user_id === userId && (
                                <span className="text-xs text-orange-600 ml-1">(Tú)</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(oferta.created_at).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            index === 0 ? 'text-green-600 text-lg' : 'text-gray-700'
                          }`}>
                            ${oferta.monto.toLocaleString()}
                          </p>
                          {index === 0 && (
                            <p className="text-xs text-green-600 font-medium">Ganando</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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