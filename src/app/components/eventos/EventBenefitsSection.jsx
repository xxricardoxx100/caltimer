import React from "react";

const benefits = [
  "Productos exclusivos y de alta calidad",
  "Precios competitivos",
  "Plataforma segura y confiable",
  "Atención 24/7",
];

export default function EventBenefitsSection() {
  return (
    <section className="bg-[#1F3F58] text-white rounded-3xl shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-8 md:px-12 py-12 gap-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.2rem] text-white/70 uppercase">Ventaja</p>
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Ventajas de <span className="text-[#f55f4e]">participar</span>
          </h3>
        </div>

        <ul className="space-y-3 text-lg md:text-xl">
          {benefits.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-white/90" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
