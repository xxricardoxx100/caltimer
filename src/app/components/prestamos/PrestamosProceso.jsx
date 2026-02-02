"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaWpforms, FaSearchDollar, FaFileContract, FaMoneyCheckAlt } from "react-icons/fa";

const pasos = [
  {
    numero: "01",
    icon: FaWpforms,
    titulo: "Solicita tu préstamo",
    descripcion: "Completa el formulario online o contáctanos por WhatsApp. Te pediremos información básica de ti y tu vehículo.",
    color: "from-orange-400 to-red-500"
  },
  {
    numero: "02",
    icon: FaSearchDollar,
    titulo: "Evaluación del vehículo",
    descripcion: "Nuestros expertos evalúan tu vehículo y determinan el monto máximo que puedes obtener en menos de 2 horas.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    numero: "03",
    icon: FaFileContract,
    titulo: "Firma del contrato",
    descripcion: "Si aceptas las condiciones, firmamos el contrato. Todo el proceso es transparente y sin letra pequeña.",
    color: "from-purple-400 to-pink-500"
  },
  {
    numero: "04",
    icon: FaMoneyCheckAlt,
    titulo: "Recibe tu dinero",
    descripcion: "Transferencia inmediata a tu cuenta bancaria o efectivo el mismo día. ¡Así de fácil!",
    color: "from-green-400 to-emerald-500"
  }
];

export default function PrestamosProceso() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F6F1E8] to-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E36C09] font-semibold text-sm uppercase tracking-wider">Proceso Simple</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#1F3F58]">
            Obtén tu préstamo en <span className="text-[#E36C09]">4 simples pasos</span>
          </h2>
          <p className="text-lg text-gray-600">
            Nuestro proceso está diseñado para ser rápido, transparente y sin complicaciones.
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea conectora en desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#E36C09]/20 via-[#E36C09]/50 to-[#E36C09]/20 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {pasos.map((paso, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 h-full">
                  {/* Número del paso */}
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br ${paso.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {index + 1}
                  </div>

                  {/* Icono */}
                  <div className="flex justify-center mt-6 mb-6">
                    <div className={`bg-gradient-to-br ${paso.color} w-20 h-20 rounded-full flex items-center justify-center shadow-lg`}>
                      <paso.icon className="text-3xl text-white" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-bold text-[#1F3F58] mb-3 text-center">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿Listo para obtener tu préstamo? El proceso completo toma menos de 24 horas
          </p>
          <motion.button
            onClick={() => {
              const phoneNumber = "51928430066";
              const message = encodeURIComponent("Hola, quiero iniciar el proceso para obtener un préstamo vehicular.");
              window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
            }}
            className="bg-[#E36C09] hover:bg-[#C55A07] text-white font-bold py-4 px-10 rounded-full shadow-xl text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar mi Solicitud
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
