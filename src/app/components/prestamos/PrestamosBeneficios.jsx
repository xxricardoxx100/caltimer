"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaShieldAlt, FaHandHoldingUsd, FaChartLine, FaClock, FaCheckCircle } from "react-icons/fa";

const beneficios = [
  {
    icon: FaBolt,
    title: "Aprobación en 24 horas",
    description: "Proceso rápido y sencillo. Recibe el dinero en tu cuenta el mismo día."
  },
  {
    icon: FaHandHoldingUsd,
    title: "Hasta 80% del valor",
    description: "Préstamos de hasta el 80% del valor comercial de tu vehículo."
  },
  {
    icon: FaShieldAlt,
    title: "Mantén tu vehículo",
    description: "Sigue usando tu auto mientras pagas el préstamo mensualmente."
  },
  {
    icon: FaChartLine,
    title: "Tasas competitivas",
    description: "Ofrecemos las mejores tasas del mercado adaptadas a tu perfil."
  },
  {
    icon: FaClock,
    title: "Plazos flexibles",
    description: "Elige el plazo que mejor se adapte a tu capacidad de pago: 1 a 36 meses."
  },
  {
    icon: FaCheckCircle,
    title: "Sin historial crediticio",
    description: "No importa tu historial en centrales de riesgo. Tu vehículo es tu garantía."
  }
];

export default function PrestamosBeneficios() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E36C09] font-semibold text-sm uppercase tracking-wider">Ventajas</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#1F3F58]">
            ¿Por qué elegirnos para tu <span className="text-[#E36C09]">préstamo vehicular?</span>
          </h2>
          <p className="text-lg text-gray-600">
            Somos expertos en préstamos con garantía vehicular, ofreciendo rapidez, seguridad y las mejores condiciones del mercado.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#F6F1E8] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-[#E36C09] w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <beneficio.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1F3F58] mb-3">
                {beneficio.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {beneficio.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
