"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function PrestamosCTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "51928430066";
    const message = encodeURIComponent("Hola, quiero solicitar un préstamo con garantía vehicular. ¿Pueden ayudarme?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1F3F58] via-[#2A5270] to-[#1F3F58] text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E36C09] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E36C09] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              ¿Listo para obtener tu <span className="text-[#E36C09]">préstamo?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Convierte tu vehículo en efectivo hoy mismo. Proceso rápido, seguro y sin complicaciones.
            </p>
          </motion.div>

          {/* Botones de acción principales */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleWhatsAppClick}
              className="group bg-[#E36C09] hover:bg-[#C55A07] text-white font-bold py-5 px-10 rounded-full shadow-2xl text-lg flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="text-2xl" />
              <span>Solicitar por WhatsApp</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="tel:+51928430066"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-5 px-10 rounded-full border-2 border-white/30 text-lg flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhoneAlt className="text-xl" />
              <span>Llamar Ahora</span>
            </motion.a>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="bg-[#E36C09] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-gray-300 text-sm mb-3">Respuesta inmediata</p>
              <a href="https://wa.me/51928430066" className="text-[#E36C09] hover:text-[#C55A07] font-semibold">
                +51 928 430 066
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="bg-[#E36C09] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhoneAlt className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Teléfono</h3>
              <p className="text-gray-300 text-sm mb-3">Lun - Sáb: 9am - 7pm</p>
              <a href="tel:+51928430066" className="text-[#E36C09] hover:text-[#C55A07] font-semibold">
                +51 928 430 066
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="bg-[#E36C09] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-300 text-sm mb-3">Respuesta en 24h</p>
              <a href="mailto:prestamos@caltimer.com" className="text-[#E36C09] hover:text-[#C55A07] font-semibold">
                prestamos@caltimer.com
              </a>
            </div>
          </motion.div>

          {/* Garantías finales */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "🚀", text: "Aprobación en 24h" },
              { icon: "🔒", text: "100% Seguro" },
              { icon: "✅", text: "Sin historial" },
              { icon: "💰", text: "Hasta 80%" }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold">{item.text}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
