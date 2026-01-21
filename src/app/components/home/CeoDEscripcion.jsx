import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/app/hocs/layouts/useScrollAnimation";

export default function CeoDescripcion() {
  const { elementRef, isVisible } = useScrollAnimation(0.3);
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-50 px-8 py-16 bg-[#F8FAFC] min-h-[400px]">
      <motion.div
        ref={elementRef}
        animate={isVisible ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <div className="flex items-center justify-center">
          <img
            src="/servicios/jean.png"
            alt="CEO de la empresa"
            className="rounded-2xl w-[320px] h-[400px] object-cover"
          />
        </div>
      </motion.div>
      
      <motion.div
        ref={elementRef}
        animate={isVisible ? { x: 0, opacity: 1, rotate:0 } : { x: 300, opacity: 0, rotate:-180 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <div className="max-w-lg flex flex-col items-start justify-center ">
          <h2 className="text-4xl font-bold text-[#002060] mb-4">
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