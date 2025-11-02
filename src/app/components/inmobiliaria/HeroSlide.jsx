"use client";
import React, { useState } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { motion } from "framer-motion";

const HeroSlide = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  return (
    <motion.div 
      className="overflow-hidden relative w-full h-[70vh] md:h-[85vh] bg-[#F2B66D]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }} 
    >
      {/* Slides */}
      <div
        className="flex transition-transform ease-out duration-700 h-full "
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="w-full h-full object-contain flex-shrink-0"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        ))}
      </div>
      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          type="button"
          className="text-white bg-white/20 rounded-md w-12 h-12 flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors border border-white"
          onClick={prev}
          aria-label="Previous"
        >
          <MdOutlineArrowBack className="text-3xl font-bold" />
        </button>

        <button
          type="button"
          className="text-white bg-white/20 rounded-md w-12 h-12 flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors border border-white"
          onClick={next}
          aria-label="Next"
        >
          <MdOutlineArrowForward className="text-3xl font-bold" />
        </button>
      </div>
    </motion.div>
  );
};

export default HeroSlide;
