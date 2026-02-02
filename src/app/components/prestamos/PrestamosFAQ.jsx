"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    pregunta: "¿Cuánto tiempo tarda en aprobarse el préstamo?",
    respuesta: "El proceso de evaluación toma entre 2 a 24 horas. Una vez aprobado, el dinero se desembolsa el mismo día mediante transferencia bancaria o efectivo."
  },
  {
    pregunta: "¿Puedo seguir usando mi vehículo durante el préstamo?",
    respuesta: "Sí, absolutamente. Tu vehículo queda como garantía pero tú mantienes la posesión y puedes seguir usándolo normalmente. Solo debes mantener al día el pago de tus cuotas."
  },
  {
    pregunta: "¿Qué pasa si estoy en centrales de riesgo?",
    respuesta: "No es un problema. A diferencia de los préstamos bancarios tradicionales, nosotros no revisamos tu historial crediticio. La garantía es tu vehículo, por lo que tu situación en centrales de riesgo no afecta la aprobación."
  },
  {
    pregunta: "¿Qué porcentaje del valor de mi vehículo puedo obtener?",
    respuesta: "Puedes obtener entre el 50% y 80% del valor comercial de tu vehículo, dependiendo de su estado, antigüedad, marca y modelo. Nuestros tasadores evaluarán tu auto para determinar el monto exacto."
  },
  {
    pregunta: "¿Puedo pagar mi préstamo antes del plazo?",
    respuesta: "Sí, puedes realizar pagos adelantados o cancelar el préstamo completo en cualquier momento sin penalidades. Esto te ayudará a reducir los intereses totales."
  },
  {
    pregunta: "¿Qué sucede si no puedo pagar una cuota?",
    respuesta: "Te recomendamos comunicarte con nosotros inmediatamente. Podemos reestructurar tu deuda o buscar alternativas de pago. Como último recurso y solo después de varios meses de impago, se procedería según lo estipulado en el contrato."
  },
  {
    pregunta: "¿Aceptan vehículos con deudas de transporte o multas?",
    respuesta: "Sí, aceptamos vehículos con deudas de transporte, multas o papeletas. Sin embargo, el vehículo debe estar libre de gravámenes o embargos judiciales."
  },
  {
    pregunta: "¿Hay costos adicionales o comisiones ocultas?",
    respuesta: "No. Somos totalmente transparentes. Los únicos costos son la tasa de interés mensual y el seguro vehicular (si aplica). Todo está claramente especificado en el contrato antes de firmar."
  }
];

export default function PrestamosFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
          <span className="text-[#E36C09] font-semibold text-sm uppercase tracking-wider">Preguntas Frecuentes</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#1F3F58]">
            ¿Tienes <span className="text-[#E36C09]">dudas?</span>
          </h2>
          <p className="text-lg text-gray-600">
            Aquí respondemos las preguntas más comunes sobre nuestros préstamos vehiculares.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F6F1E8] transition-colors duration-200"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#E36C09] w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <FaQuestionCircle className="text-white text-xl" />
                    </div>
                    <span className="font-bold text-[#1F3F58] text-lg pr-4">
                      {faq.pregunta}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <FaChevronDown className="text-[#E36C09] text-xl" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pl-20">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.respuesta}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contacto adicional */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-[#1F3F58] to-[#2A5270] rounded-2xl p-8 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">¿No encontraste tu respuesta?</h3>
            <p className="text-gray-300 mb-6">
              Nuestro equipo está listo para atender todas tus consultas de manera personalizada.
            </p>
            <motion.button
              onClick={() => {
                const phoneNumber = "51928430066";
                const message = encodeURIComponent("Hola, tengo algunas preguntas sobre los préstamos vehiculares.");
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
              }}
              className="bg-[#E36C09] hover:bg-[#C55A07] text-white font-bold py-3 px-8 rounded-full shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar a un Asesor
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
