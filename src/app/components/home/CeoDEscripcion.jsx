import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/hocs/layouts/useScrollAnimation";

export default function CeoDescripcion() {
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
        initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -200, scale: 0.7 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0, scale: 1 } : (isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -200, scale: 0.7 })}
        transition={{ ease: "easeOut", duration: 0.8 }}
      >
        <div className="flex items-center justify-center w-full">
          <img
            src="/servicios/jean.png"
            alt="CEO de la empresa"
            className="rounded-2xl w-full max-w-[320px] h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
          />
        </div>
      </motion.div>
      
      <motion.div
        ref={elementRef}
        initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 200, rotate: 90 }}
        animate={isVisible ? { opacity: 1, y: 0, x: 0, rotate: 0 } : (isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 200, rotate: 90 })}
        transition={{ ease: "easeOut", duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-lg flex flex-col items-start justify-center w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#002060] mb-4">
            Nuestro CEO
          </h2>
          <p className=" text-justify p-4 mb-4">
            Jean Carlos Calderon es Ingeniero Mecatrónico y el experto detrás de nuestra operación. Su carrera está marcada por logros tangibles: más de 900 vehículos adjudicados y 30 proyectos inmobiliarios completados. Como CEO, su misión es aplicar un enfoque analítico y riguroso para garantizar las inversiones más seguras y rentables del sector de subastas y remates.
          </p>
          
        </div>
      </motion.div>
    </section>
  );
} 