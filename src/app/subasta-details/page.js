import React, { Suspense } from "react";
// Importar el componente que acabamos de crear
import { SubastaDetailsContent } from "./SubastaDetailsContent"; 
// No necesitas useSearchParams, useState, Link, Image, o subastaData aquí

// El componente principal de la página ahora solo sirve como contenedor
// y es un componente de servidor por defecto (aunque no usa la directiva)
// o de cliente (si mantienes la directiva).
// Se recomienda quitar `"use client"` del componente principal
// y dejar solo el `Suspense` y el componente de contenido.
// ¡Pero para simplicidad, simplemente lo modificaremos!

// QUITAMOS LA DIRECTIVA "use client" si es un componente de página de la App Router
// Si estás usando Pages Router o quieres mantenerlo de cliente, funciona igual.
// Para App Router, la mejor práctica es quitarla y hacer esta envoltura.

export default function SubastaDetails() {
  // El contenido de la página se envuelve en Suspense
  // El fallback es lo que se muestra mientras useSearchParams se inicializa en el cliente.
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Cargando detalles de la subasta...</p>
      </div>
    }>
      {/* El componente SubastaDetailsContent ahora sí tiene useSearchParams() */}
      <SubastaDetailsContent />
    </Suspense>
  );
}