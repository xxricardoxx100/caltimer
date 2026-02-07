"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { buildOptimizedImageUrl } from "@/lib/supabase/image-helpers";
import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const HeroSlide = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

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
    <>
      <motion.div 
        className="relative w-full h-[70vh] md:h-[85vh] bg-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }} 
      >
        {/* Slides */}
        <div 
          className="relative h-full w-full cursor-pointer group"
          onClick={() => openImageModal(currentImage)}
        >
          <div className="relative h-full w-full p-4 md:p-8">
            <Image
              src={optimizedImage}
              alt={`slide-${current}`}
              fill
              sizes="100vw"
              className="transition-opacity duration-300 group-hover:opacity-90"
              style={{ objectFit: 'contain' }}
              priority={current === 0}
            />
          </div>
          
          {/* Click to expand hint */}
          <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20">
            Click para ampliar
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button
            type="button"
            className="text-white bg-white/20 rounded-md w-12 h-12 flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors border border-white"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <MdOutlineArrowBack className="text-3xl font-bold" />
          </button>

          <button
            type="button"
            className="text-white bg-white/20 rounded-md w-12 h-12 flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors border border-white"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <MdOutlineArrowForward className="text-3xl font-bold" />
          </button>
        </div>

        {/* Image counter */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
      </motion.div>

      {/* Modal para imagen en pantalla completa */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/97 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeImageModal}
        >
          {/* Botón de cerrar */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-orange-400 transition-all duration-300 z-[10000] bg-black/70 hover:bg-orange-500 rounded-full p-3 shadow-2xl backdrop-blur-sm group"
            aria-label="Cerrar"
          >
            <IoClose className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Indicador de cerrar */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Presiona ESC o haz click fuera de la imagen para cerrar
          </div>

          {/* Contenedor de imagen */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Imagen ampliada"
              fill
              sizes="100vw"
              className="object-contain drop-shadow-2xl"
              quality={95}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSlide;
