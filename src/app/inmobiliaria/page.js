import React from "react";
import HeroSlide from "../components/inmobiliaria/HeroSlide";
import { Features } from "../components/inmobiliaria/Features";
import { PropertyList } from "../components/inmobiliaria/PropertyList";

// Data temporal para imágenes del hero
const heroImages = [
  "https://www.urbanaperu.com.pe/wp-content/uploads/2025/03/1440x600-banner-home-desk-luxo.webp",
  "https://www.urbanaperu.com.pe/wp-content/uploads/2025/03/1440x600-banner-home-desk-hope.webp",
  "https://www.urbanaperu.com.pe/wp-content/uploads/2025/03/1440x600-banner-home-desk-hit-1.webp",
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
