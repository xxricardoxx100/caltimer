import React from "react";
import SorteosHero from "../components/sorteos/SorteosHero";
import SorteosDetails from "../components/sorteos/SorteosDetails";
import SorteosParticipation from "../components/sorteos/SorteosParticipation";
import { bodyFont } from "../components/sorteos/sorteosFonts";

const SorteosPage = () => {
  return (
    <div
      data-scroll-section
      className={`relative min-h-screen overflow-hidden pt-20 sm:pt-24 ${bodyFont.className}`}
    >
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#0e3e90]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-64 h-72 w-72 rounded-full bg-[#f59b23]/25 blur-3xl" />

      <SorteosHero />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SorteosDetails />
        <SorteosParticipation />
      </main>
    </div>
  );
};

export default SorteosPage;
