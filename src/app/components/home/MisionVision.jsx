import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/hocs/layouts/useScrollAnimation";

export default function MisionVision() {
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
        initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -200, rotate: -90 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0, rotate: 0 } : (isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -200, rotate: -90 })}
        transition={{ ease: "easeOut", duration: 0.8 }}
      >
        <div className="max-w-lg flex flex-col items-start justify-center w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#002060]">
            Nuestra Misión y Visión
          </h2>
          <span className="font-bold text-[#002060]"> Nuestra Misión</span>
          <p className="text-justify  p-4 mb-4">
            Facilitar tu acceso a vehículos de alta gama y proyectos inmobiliarios de gran potencial a través de un servicio experto y confiable. Somos tu socio estratégico, comprometido en encontrar el máximo valor en cada oportunidad de inversión para ayudarte a alcanzar tus metas
          </p>
          <span className="font-bold text-[#002060]"> Nuestra Visión</span>
          <p className="text-justify  p-4 mb-4">
            Convertirnos en el principal referente del mercado, donde cada peruano piense en Caltimer Group como la puerta de entrada a las inversiones inteligentes que mejoran su calidad de vida y aseguran su futuro financiero.</p>
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
            src="/servicios/carrosmer.png"
            alt="Auto en subasta"
            className="rounded-2xl w-full max-w-[550px] h-[300px] sm:h-[350px] lg:h-[400px] object-cover"  
          />
        </div>
      </motion.div>
    </section>
  );
}