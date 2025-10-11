"use client";
import React from "react";
import { FaCarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export const ImgBanner = () => {
  return (
    <main className="min-h-[700px]">    
      {/* Hero Section */}
      <div className="overflow-hidden relative w-full h-[700px]">
        <div className="flex transition-transform ease-out duration-700 h-full">
          <img
            src="/servicios/Mercedes.jpg"
            alt="Luxury car on road"
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        </div>

        {/* Overlay Content */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }} 
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                COMPRA TU
                <br />
                COCHE PERFECTO
              </h1>
              <p className="text-lg md:text-xl mb- opacity-90 max-w-2xl mx-auto">
                Desde autos deportivos hasta autos para el día a día, encuentra autos premium 
                que se adaptan a tu estilo de vida. Concesionarios verificados y precios competitivos garantizados.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-md transition-colors duration-200 inline-flex items-center justify-center mt-8">
                {/* Puedes poner un ícono SVG aquí si lo deseas */}
                <FaCarAlt className="mr-2" />
                VER TODOS LOS COCHES
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
