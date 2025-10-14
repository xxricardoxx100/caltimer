import React from "react";
import HeroSlide from "../components/inmobiliaria/HeroSlide";
import { Features } from "../components/inmobiliaria/Features";
import { PropertyList } from "../components/inmobiliaria/PropertyList";

// Data temporal para imágenes del hero
const heroImages = [
  "/inmobiliaria/compramospropiedades.jpg  ",
  "/inmobiliaria/inmobiliaria1.jpg",
];

const Inmobiliaria = () => {
  return (  
    <div data-scroll-section className="pt-28">
      <HeroSlide images={heroImages} />
      <Features />
      <PropertyList />
    </div>
  );
};

export default Inmobiliaria;
