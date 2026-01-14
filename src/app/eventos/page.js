import React from "react";
import EventCarousel from "../components/eventos/EventCarousel";
import EventBenefitsSection from "../components/eventos/EventBenefitsSection";

const Eventos = () => {
  return (
    <div data-scroll-section className="pt-28 bg-[#F6F1E8] space-y-12 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <EventCarousel />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <EventBenefitsSection />
      </div>
    </div>
  );
};

export default Eventos;
