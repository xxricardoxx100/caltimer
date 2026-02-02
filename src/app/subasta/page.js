import React from "react";
import SubastaCarousel from "../components/subastas/SubastaCarousel";
import SubastaBenefitsSection from "../components/subastas/SubastaBenefitsSection";
import Title from "../components/subastas/Title";
import ListaVehiculos from "../components/subastas/ListaVehiculos";

export default function Subasta() {
  return (
    <div data-scroll-section className="pt-28 bg-[#F6F1E8] space-y-8 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <SubastaCarousel />
      </div>
      <div className="container mx-auto px-4 md:px-8">
        <SubastaBenefitsSection />
      </div>
      <Title />
      <ListaVehiculos />
    </div>
  );
}