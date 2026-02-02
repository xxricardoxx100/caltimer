"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCar, FaMoneyBillWave } from "react-icons/fa";

export default function PrestamosHero() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "51928430066";
    const message = encodeURIComponent("Hola, estoy interesado en obtener un préstamo con garantía vehicular. ¿Podrían darme más información?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="relative bg-gradient-to-br from-[#1F3F58] via-[#2A5270] to-[#1F3F58] text-white overflow-hidden pt-28">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#E36C09] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E36C09] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido izquierdo */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-[#E36C09] px-4 py-2 rounded-full text-sm font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <FaMoneyBillWave className="text-lg" />
              <span>Préstamos Rápidos y Seguros</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Obtén <span className="text-[#E36C09]">dinero en efectivo</span> con tu vehículo como garantía
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Convierte tu vehículo en liquidez inmediata. Préstamos rápidos, seguros y flexibles sin complicaciones. 
              Mantén tu auto mientras pagas el préstamo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                onClick={handleWhatsAppClick}
                className="bg-[#E36C09] hover:bg-[#C55A07] text-white font-bold py-4 px-8 rounded-full shadow-xl text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Préstamo Ahora
              </motion.button>
              <motion.a
                href="#calculadora"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full border-2 border-white/30 text-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calcular mi Préstamo
              </motion.a>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#E36C09]">24h</div>
                <div className="text-sm text-gray-300">Aprobación rápida</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#E36C09]">80%</div>
                <div className="text-sm text-gray-300">Valor del vehículo</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#E36C09]">100%</div>
                <div className="text-sm text-gray-300">Confidencial</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contenido derecho - Imagen/Gráfico */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#E36C09] p-6 rounded-full">
                  <FaCar className="text-6xl text-white" />
                </div>
              </div>
              
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold">Tu vehículo vale dinero</h3>
                <p className="text-gray-300">
                  Obtén hasta el 80% del valor comercial de tu vehículo en efectivo el mismo día
                </p>
                
                <div className="bg-white/5 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monto mínimo:</span>
                    <span className="font-bold text-xl">S/ 3,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monto máximo:</span>
                    <span className="font-bold text-xl">S/ 200,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Plazo:</span>
                    <span className="font-bold text-xl">1 a 36 meses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Elemento decorativo flotante */}
            <motion.div
              className="absolute -top-4 -right-4 bg-[#E36C09] text-white px-6 py-3 rounded-full font-bold shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              ¡Sin historial crediticio!
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
