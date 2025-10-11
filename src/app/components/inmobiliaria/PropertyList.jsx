"use client";
import React from "react";
import PropertyCard from "./PropertyCard";
import sampleProperties from "@/app/components/inmobiliaria/propertyData";
import { motion } from "framer-motion";

const containerVariants = {
  hidden:{opacity:0},
  visible:{
    opacity:1,
    transition:{
      staggerChildren:0.2,
    }
  }
}
const cardVariants = {
  hidden:{opacity:0},
  visible:{
    opacity:1,
    transition:{
      duration:0.5,
      ease: "easeOut",
    }
  }
}

export const PropertyList = () => {
  return (
    <div>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5}}
            viewport={{ once: true , amount:0.5}}
            >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Proyectos Destacados
            </h2>
            <p className="text-gray-600 text-lg">
              Descubre las mejores opciones inmobiliarias en Lima
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            >
            {sampleProperties.map((property) => (
              <motion.div
                key={property.id} 
                variants={cardVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                >
                <PropertyCard
                  property={property} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
