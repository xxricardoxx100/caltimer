import React, { Suspense } from "react";
// Importar el componente que acabamos de crear
import { SubastaDetailsContent } from "./SubastaDetailsContent"; 

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