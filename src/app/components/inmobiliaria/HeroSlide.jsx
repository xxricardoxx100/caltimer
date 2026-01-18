"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { buildOptimizedImageUrl } from "@/lib/supabase/image-helpers";
import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { motion } from "framer-motion";

const HeroSlide = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const currentImage = images?.[current] || images?.[0] || "/placeholder.svg";
  const optimizedImage = useMemo(
    () => buildOptimizedImageUrl(currentImage, { width: 1400, quality: 70 }),
    [currentImage]
  );

  const prev = () =>
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  return (
    <motion.div 
      className="overflow-hidden relative w-full h-[70vh] md:h-[85vh] bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }} 
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        <Image
          src={optimizedImage}
          alt={`slide-${current}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority={current === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-transparent" />
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
