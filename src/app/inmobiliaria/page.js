"use client";

import React, { useState } from "react";
import HeroSlide from "../components/inmobiliaria/HeroSlide";
import { Features } from "../components/inmobiliaria/Features";
import { PropertyList } from "../components/inmobiliaria/PropertyList";

// Imágenes del hero (originales)
const heroImages = [
  "/inmobiliaria/compramospropiedades.jpg",
  "/inmobiliaria/inmobiliaria1.jpg",
];

const Inmobiliaria = () => {
  const [filters, setFilters] = useState({
    category: "",
    district: "",
  });

  return (  
    <div data-scroll-section className="pt-28">
      <HeroSlide images={heroImages} />
      <Features filters={filters} onFiltersChange={setFilters} />
      <PropertyList filters={filters} />
    </div>
  );
};

export default Inmobiliaria;
