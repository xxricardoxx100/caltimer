"use client";
import React from "react";
import { motion } from "framer-motion";
import Tittle from "./Tittle";
import CarCard from "./CarCard";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import dummyCarData from "./carData";

const FeacturedSections = () => {
  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre cada tarjeta
      },
    },
  };

  // Variantes de animación para cada tarjeta
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, // Comienza 50px abajo
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // FeacturedSections.jsx (Código modificado)
return (
  <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
    <div>
      <Tittle
        title="VEHICULOS DISPONIBLES"
        subTitle="Explora nuestra selección de vehículos premium disponibles para tus próximas aventuras."
      />
    </div>
    
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mt-18"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Se activa cuando el 20% es visible
    >
      {dummyCarData.slice(0, 6).map((car) => (
        <motion.div 
          key={car.id}
          variants={cardVariants}
          // MODIFICADO: Aumentamos la escala de 1.1 a 1.15 para que la animación sea más grande.
          whileHover={{ scale: 1.15 }} 
          whileTap={{ scale: 0.95 }}
          // OPCIONAL: Podrías añadir una clase de ancho mínimo si lo necesitas.
          // className="min-w-[320px]" 
        >
          <CarCard car={car} />
        </motion.div>
      ))}
    </motion.div>
  </div>  
  );
};

export default FeacturedSections;