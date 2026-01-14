"use client";
import React from "react";
import { motion } from "framer-motion";

const benefits = [
  "Productos exclusivos y de alta calidad",
  "Precios competitivos",
  "Plataforma segura y confiable",
  "Atención 24/7",
];

export default function EventBenefitsSection() {
  return (
    <motion.section
      className="bg-[#1F3F58] text-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-8 md:px-12 py-12 gap-10">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-semibold tracking-[0.2rem] text-white/70 uppercase">Ventaja</p>
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Ventajas de <span className="text-[#f55f4e]">participar</span>
          </h3>
        </motion.div>

        <motion.ul
          className="space-y-3 text-lg md:text-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.12, duration: 0.4 },
            },
          }}
        >
          {benefits.map((item) => (
            <motion.li
              key={item}
              className="flex items-start gap-3"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="mt-2 h-2 w-2 rounded-full bg-white/90" aria-hidden />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
