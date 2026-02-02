"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaIdCard, FaCar, FaFileAlt, FaHome, FaCheckCircle } from "react-icons/fa";

const requisitos = [
  {
    icon: FaIdCard,
    titulo: "Documentos personales",
    items: [
      "DNI o Carnet de extranjería vigente",
      "Recibo de servicios (luz, agua o teléfono)",
      "Constancia de domicilio"
    ]
  },
  {
    icon: FaCar,
    titulo: "Documentos del vehículo",
    items: [
      "Tarjeta de propiedad original",
      "SOAT vigente",
      "Revisión técnica (si aplica)"
    ]
  },
  {
    icon: FaFileAlt,
    titulo: "Información adicional",
    items: [
      "Fotos del vehículo (exterior e interior)",
      "Número de contacto activo",
      "Referencias personales"
    ]
  }
];

const caracteristicas = [
  "Vehículos particulares (autos, camionetas, SUVs)",
  "Antigüedad máxima: 10 años",
  "Vehículo debe estar en buen estado",
  "Libre de gravámenes o embargos",
  "Puede tener deudas de transporte",
  "Aceptamos vehículos de toda marca"
];

export default function PrestamosRequisitos() {
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
          <span className="text-[#E36C09] font-semibold text-sm uppercase tracking-wider">Requisitos</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#1F3F58]">
            ¿Qué necesitas para <span className="text-[#E36C09]">solicitar tu préstamo?</span>
          </h2>
          <p className="text-lg text-gray-600">
            Los requisitos son mínimos y el proceso es totalmente transparente.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Requisitos documentarios */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#1F3F58] mb-8">Documentos necesarios</h3>
            <div className="space-y-6">
              {requisitos.map((req, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#F6F1E8] to-white p-6 rounded-xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#E36C09] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <req.icon className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#1F3F58] mb-3">{req.titulo}</h4>
                      <ul className="space-y-2">
                        {req.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <FaCheckCircle className="text-[#E36C09] mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Características del vehículo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#1F3F58] mb-8">Características del vehículo</h3>
            <div className="bg-gradient-to-br from-[#1F3F58] to-[#2A5270] text-white p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full">
                  <FaCar className="text-5xl text-[#E36C09]" />
                </div>
              </div>
              
              <ul className="space-y-4">
                {caracteristicas.map((caracteristica, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FaCheckCircle className="text-[#E36C09] mt-1 flex-shrink-0 text-xl" />
                    <span className="text-lg">{caracteristica}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-center text-sm text-gray-300">
                  <strong className="text-[#E36C09]">Nota importante:</strong> El vehículo quedará como garantía pero podrás seguir usándolo normalmente durante el préstamo.
                </p>
              </div>
            </div>

            {/* Box informativo */}
            <motion.div
              className="mt-6 bg-[#E36C09]/10 border-l-4 border-[#E36C09] p-6 rounded-r-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-[#1F3F58]">¿No cumples algún requisito?</strong><br />
                Contáctanos de todas formas. Evaluamos cada caso de manera personalizada y podemos encontrar una solución para ti.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
