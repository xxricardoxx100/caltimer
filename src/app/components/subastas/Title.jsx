"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGavel, FaCar, FaTrophy } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Title = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Badge superior */}
        <motion.div 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FaGavel className="text-xl" />
          <span className="font-semibold text-sm uppercase tracking-wider">Subastas en Vivo</span>
          <MdVerified className="text-xl" />
        </motion.div>

        {/* Título principal */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
          Vehículos en Subasta
        </h2>

        {/* Separador decorativo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-orange-500"></div>
          <FaCar className="text-orange-500 text-2xl" />
          <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-orange-500"></div>
        </div>

        {/* Descripción */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Encuentra las mejores oportunidades en vehículos de calidad. 
          Participa en nuestras subastas y llévate el auto de tus sueños 
          al mejor precio.
        </p>
      </div>
    </motion.div>
  );
};

export default Title;