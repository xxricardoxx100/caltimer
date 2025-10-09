import React from "react";

export default function MisionVision() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-30 px-8 py-16 bg-[#F2B66D] min-h-[400px]">
      <div className="max-w-lg flex flex-col items-start justify-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestra Misión y Visión
        </h2>
         <span className="font-bold"> Nuestra Misión</span>
        <p className="text-justify p-4 mb-4">
          Facilitar tu acceso a vehículos de alta gama y proyectos inmobiliarios de gran potencial a través de un servicio experto y confiable. Somos tu socio estratégico, comprometido en encontrar el máximo valor en cada oportunidad de inversión para ayudarte a alcanzar tus metas
        </p>
        <span className="font-bold"> Nuestra Visión</span>
        <p className="text-justify p-4 mb-4">
          Convertirnos en el principal referente del mercado, donde cada peruano piense en Caltimer Group como la puerta de entrada a las inversiones inteligentes que mejoran su calidad de vida y aseguran su futuro financiero.</p>
        <button className="inline-flex items-center justify-center rounded-full border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white hover:bg-orange-700">
          Contáctanos Ahora
        </button> 
      </div>
      <div className="flex items-center justify-center">
        <img
          src="/servicios/autostaller.jpg"
          alt="Auto en subasta"
          className="rounded-2xl w-[550px] h-[400px] object-cover"  
        />
      </div>
    </section>
  );
}