"use client";
import React from "react";
import { motion } from "framer-motion";

const benefits = [
  "Alcance a miles de compradores potenciales",
  "Proceso rápido y transparente de venta",
  "Valoración justa de tu vehículo",
  "Plataforma segura y confiable",
  "Publicación profesional con fotos de calidad",
  "Pagos seguros y garantizados",
];

export default function SubastaBenefitsSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "51928430066";
    const message = encodeURIComponent("Hola, estoy interesado en subastar mi vehículo en su plataforma. ¿Podrían darme más información?");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.section
      className="bg-[#1F3F58] text-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row items-start justify-between px-8 md:px-12 py-12 gap-10 lg:gap-16">
        <motion.div
          className="space-y-4 lg:max-w-lg flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-semibold tracking-[0.2rem] text-white/70 uppercase">¿Tienes un vehículo?</p>
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Subasta tu vehículo <span className="text-[#E36C09]">con nosotros</span>
          </h3>
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Confía en nuestra plataforma para vender tu vehículo de manera rápida, segura y al mejor precio. 
            Te acompañamos en cada paso del proceso.
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:flex-1 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.08, duration: 0.4 },
            },
          }}
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-base md:text-lg">
            {benefits.map((item) => (
              <motion.li
                key={item}
                className="flex items-start gap-3"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-[#E36C09] flex-shrink-0" aria-hidden />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex justify-center pt-4">
            <motion.button
              onClick={handleWhatsAppClick}
              className="bg-[#E36C09] hover:bg-[#C55A07] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar por WhatsApp
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
