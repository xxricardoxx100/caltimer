import React from "react";
import PrestamosHero from "../components/prestamos/PrestamosHero";
import PrestamosBeneficios from "../components/prestamos/PrestamosBeneficios";
import PrestamosProceso from "../components/prestamos/PrestamosProceso";
import PrestamosRequisitos from "../components/prestamos/PrestamosRequisitos";
import PrestamosCalculadora from "../components/prestamos/PrestamosCalculadora";
import PrestamosCTA from "../components/prestamos/PrestamosCTA";
import PrestamosTestimonios from "../components/prestamos/PrestamosTestimonios";
import PrestamosFAQ from "../components/prestamos/PrestamosFAQ";

export default function Prestamos() {
  return (
    <div data-scroll-section className="pt-28 bg-[#F6F1E8]">
      <PrestamosHero />
      <PrestamosBeneficios />
      <PrestamosProceso />
      <PrestamosRequisitos />
      <PrestamosCalculadora />
      <PrestamosTestimonios />
      <PrestamosFAQ />
      <PrestamosCTA />
    </div>
  );
}
