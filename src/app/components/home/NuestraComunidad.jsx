import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/hocs/layouts/useScrollAnimation";

export default function NuestraComunidad() {
  const { elementRef, isVisible } = useScrollAnimation(0.3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-4 sm:px-6 lg:px-8 py-16 bg-[#F8FAFC] min-h-[400px] overflow-hidden">
      <motion.div
        ref={elementRef}
        initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -200, rotate: -45 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0, rotate: 0 } : (isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -200, rotate: -45 })}
        transition={{ ease: "easeOut", duration: 0.8 }}
      >
        <div className="max-w-lg flex flex-col items-start justify-center w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#002060] mb-4">
            Nuestra Comunidad
          </h2>
          <p className="text-justify  p-4 mb-4">
            En Caltimer Group, no solo invertimos; creamos tu futuro financiero de forma segura y confiable.<br /><br />

            Somos una comunidad amigable y experta que te da la bienvenida como tu socio estratégico personal. Te hacemos increíblemente fácil acceder a vehículos de alta gama y proyectos inmobiliarios rentables. Nuestro compromiso es que, con la experiencia y el respaldo de nuestro equipo (liderado por nuestro CEO experto), tú siempre encuentres la mejor oportunidad de inversión para alcanzar tus metas.
          </p>
          
        </div>
      </motion.div>


      <motion.div
        ref={elementRef}
        initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 200, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0, scale: 1 } : (isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 200, scale: 0.8 })}
        transition={{ ease: "easeOut", duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-center w-full">
          <img
            src="/servicios/comunidad.png"
            alt="Auto en subasta"
            className="rounded-2xl w-full max-w-[550px] h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}