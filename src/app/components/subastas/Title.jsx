"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGavel } from "react-icons/fa";

const Title = () => {
  return (
    <motion.div
      className="container mx-auto max-w-7xl px-4 pt-4 pb-1"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <motion.div
          className="inline-flex items-center gap-2 bg-[#1F3F58] text-white px-4 py-1.5 rounded-full shadow"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <FaGavel className="text-[#F29F05] text-sm" />
          <span className="font-semibold text-xs uppercase tracking-wider">Subastas en Vivo</span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F3F58]">
          Vehículos en <span className="text-[#F29F05]">Subasta</span>
        </h2>
        <p className="text-sm text-gray-500">
          Puja en línea y llévate el vehículo al mejor precio.
        </p>
      </div>
    </motion.div>
  );
};

export default Title;
