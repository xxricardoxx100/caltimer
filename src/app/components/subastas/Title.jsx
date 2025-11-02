"use client";
import React from "react";
import { motion } from "framer-motion";

const Title = () => {
  return (
    <motion.div 
    className="container mx-auto px-4 py-12"
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Vehículos en Subasta
        </h2>
        <p className="text-lg text-gray-600">
          Encuentra las mejores oportunidades en vehículos de calidad. 
            Participa en nuestras subastas y llévate el auto de tus sueños 
            al mejor precio.
        </p>
      </div>
    </motion.div>
  );
};

export default Title;