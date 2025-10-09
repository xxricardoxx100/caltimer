import React from "react";

export default function MisionVision() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-30 px-8 py-16 bg-[#F2B66D] min-h-[400px]">
      <div className="max-w-lg flex flex-col items-start justify-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestra Comunidad
        </h2>
        <p className="text-justify  p-4 mb-4">
          En Caltimer Group, no solo invertimos; creamos tu futuro financiero de forma segura y confiable.<br /><br />

          Somos una comunidad amigable y experta que te da la bienvenida como tu socio estratégico personal. Te hacemos increíblemente fácil acceder a vehículos de alta gama y proyectos inmobiliarios rentables. Nuestro compromiso es que, con la experiencia y el respaldo de nuestro equipo (liderado por nuestro CEO experto), tú siempre encuentres la mejor oportunidad de inversión para alcanzar tus metas.
        </p>
        <button className="inline-flex items-center justify-center rounded-full border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white hover:bg-orange-700">
          Contáctanos Ahora
        </button> 
      </div>
      <div className="flex items-center justify-center">
        <img
          src="/servicios/comunidad.jpg"
          alt="Auto en subasta"
          className="rounded-2xl w-[550px] h-[400px] object-cover"
        />
      </div>
    </section>
  );
}