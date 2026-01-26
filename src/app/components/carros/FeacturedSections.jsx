"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tittle from "./Tittle";
import CarCard from "./CarCard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { carService } from "@/lib/supabase/services";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
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

const FeacturedSections = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        const fetchedCars = await carService.getCars();
        if (isMounted) {
          setCars(Array.isArray(fetchedCars) ? fetchedCars : []);
          setHasError(false);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        if (isMounted) {
          setHasError(true);
          setCars([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedCars = cars;

  return (
    <div className="flex flex-col items-center px-6 py-24 md:px-16 lg:px-24 xl:px-32 bg-[#F8FAFC]">
      <div className="text-center text-[#002060]">
        <Tittle
          title="VEHICULOS DISPONIBLES"
          subTitle="Explora nuestra seleccion de vehiculos premium disponibles para tus proximas aventuras."
        />
      </div>

      {isLoading ? (
        <p className="mt-10 text-sm text-neutral-500">Cargando vehiculos...</p>
      ) : hasError ? (
        <p className="mt-10 text-sm text-rose-500">
          No pudimos cargar los vehiculos. Intenta nuevamente mas tarde.
        </p>
      ) : displayedCars.length === 0 ? (
        <p className="mt-10 text-sm text-neutral-500">
          Aun no hay vehiculos disponibles.
        </p>
      ) : (
        <motion.div
          className="mt-18 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayedCars.map((car, idx) => (
            <motion.div
              key={car.id}
              variants={cardVariants}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <CarCard car={car} priority={idx === 0} />
            </motion.div>
          ))}
        </motion.div>
      )}

      
    </div>
  );
};

export default FeacturedSections;
