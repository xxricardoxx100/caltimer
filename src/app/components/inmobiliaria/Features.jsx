"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Features = () => {
  const [estado, setEstado] = useState("");
  const [distrito, setDistrito] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Animated counter hook
  const useCounter = (end, duration = 2000, shouldStart) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldStart) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
  };

  // Intersection Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const years = useCounter(5, 2000, hasAnimated);
  const projects = useCounter(30, 2000, hasAnimated);
  const properties = useCounter(120, 2000, hasAnimated);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", { estado, distrito });
  };

  return (
    <div className="bg-white pt-10">
      {/* Stats Section */}
      <motion.div 
        ref={statsRef} className="px-6 py-5 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-[#591D07] text-lg leading-relaxed mb-12">
            Nuestro equipo está comprometido en brindar soluciones
            personalizadas a cada uno de nuestros clientes, garantizando su
            satisfacción y confianza en nosotros.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
            {/* Years of Experience */}
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-bold text-[#BF9056] mb-2">
                +{years}
              </div>
              <div className="text-base md:text-lg font-semibold text-[#BF9056]">
                Años de
              </div>
              <div className="text-base md:text-lg font-semibold text-[#BF9056]">
                Experiencia
              </div>
            </div>

            {/* Real Estate Projects */}
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-bold text-[#BF9056] mb-2">
                +{projects}
              </div>
              <div className="text-base md:text-lg font-semibold text-[#BF9056]">
                Proyectos
              </div>
              <div className="text-base md:text-lg font-semibold text-[#BF9056]">
                Inmobiliarios
              </div>
            </div>

            {/* Properties Delivered */}
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-bold text-[#BF9056] mb-2">
                +{properties}
              </div>
              <div className="text-base md:text-lg font-semibold text-[#BF9056]">
                Terrenos
              </div>
              <div className="text-base md:text-lg font-semibold text-[#BF9056]">
                Entregados
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content section */}
      <main className="px-6 pb-0">
        {/* Search section with black background */}
        <div className="bg-gray-800 text-white py-8 px-6 -mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Left text */}
              <div className="lg:flex-1">
                <h2 className="text-2xl md:text-3xl font-light text-white">
                  Uno de ellos puede ser para ti.
                </h2>
              </div>

              {/* Search controls */}
              <div className="flex flex-col sm:flex-row gap-4 lg:flex-none">
                {/* Project status selector */}
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full sm:w-64 bg-white text-gray-900 border-0 h-12 px-4 rounded-md focus:outline-none"
                >
                  <option value="">Elegir por estado del proyecto</option>
                  <option value="en-construccion">En construcción</option>
                  <option value="pre-venta">Pre-venta</option>
                  <option value="entrega-inmediata">Entrega inmediata</option>
                  <option value="terminado">Terminado</option>
                </select>

                {/* District selector */}
                <select
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  className="w-full sm:w-64 bg-white text-gray-900 border-0 h-12 px-4 rounded-md focus:outline-none"
                >
                  <option value="">Elegir el distrito</option>
                  <option value="miraflores">Miraflores</option>
                  <option value="san-isidro">San Isidro</option>
                  <option value="barranco">Barranco</option>
                  <option value="surco">Surco</option>
                  <option value="la-molina">La Molina</option>
                  <option value="san-borja">San Borja</option>
                </select>

                {/* Search button */}
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-12 text-base rounded-md"
                >
                  BUSCAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};