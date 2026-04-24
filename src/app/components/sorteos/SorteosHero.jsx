import React from "react";
import { headingFont } from "./sorteosFonts";
import { heroPills, heroStats, participationSteps } from "./sorteosData";

const SorteosHero = () => {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#d8deea] bg-[radial-gradient(circle_at_16%_6%,rgba(14,62,144,0.22),transparent_34%),radial-gradient(circle_at_88%_14%,rgba(245,155,35,0.22),transparent_30%),linear-gradient(180deg,#f7fbff_0%,#edf3ff_100%)]">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-[#f59b23] bg-[#fff4e5] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a4700]">
            Caltimer Group
          </span>
          <h1 className={`${headingFont.className} mt-4 text-4xl leading-tight text-[#001b52] sm:text-5xl`}>
            Sorteos exclusivos
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#203b6b]">
            Participa por una moto Hunk totalmente nueva 0 km y asegura tu ticket para el gran día
            del sorteo con Caltimer Group.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {heroPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#c7d6ef] bg-white/90 px-4 py-2 text-sm font-semibold text-[#1d3d73]"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {heroStats.map((card) => (
              <div key={card.label} className={card.wrapperClass}>
                <p className={card.labelClass}>{card.label}</p>
                <p className={card.valueClass}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[#c5d4ec] bg-white/85 p-5 shadow-[0_16px_34px_rgba(0,32,96,0.1)]">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#4b6796]">
              Participa en 3 pasos
            </p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-[#244277]">
              {participationSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a
              href="#inscripcion-sorteo"
              className="mt-4 inline-flex rounded-full bg-[#002060] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0d3b8d]"
            >
              Ver sección de inscripción
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl border border-[#c6d5ed] bg-white/90 p-3 shadow-[0_20px_45px_rgba(0,32,96,0.2)] backdrop-blur-sm">
          <img
            src="/eventos/sorteos/Hunk/flyer.png"
            alt="Flyer oficial del sorteo de moto Hunk"
            className="mx-auto h-auto max-h-[640px] w-auto max-w-full rounded-2xl object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default SorteosHero;
