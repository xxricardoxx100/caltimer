import React from "react";
import { headingFont } from "./sorteosFonts";

const SorteosParticipation = () => {
  return (
    <section
      id="inscripcion-sorteo"
      className="rounded-3xl border border-[#092f74] bg-gradient-to-r from-[#001f61] to-[#0a3f9a] p-6 text-white shadow-[0_24px_50px_rgba(0,24,72,0.35)] md:p-8"
    >
      <h2 className={`${headingFont.className} text-2xl md:text-3xl`}>
        Cómo participar e inscribirse
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#d6e4ff] md:text-base">
        Participar es sencillo: compra tu ticket de S/ 20, registra tus datos y prepárate para el
        sorteo del sábado 09 de mayo.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b6ccff]">Paso 1</p>
          <p className="mt-2 text-sm font-medium">Compra tu ticket por S/ 20.</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b6ccff]">Paso 2</p>
          <p className="mt-2 text-sm font-medium">Registra tu nombre y contacto.</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b6ccff]">Paso 3</p>
          <p className="mt-2 text-sm font-medium">Espera el resultado del sorteo.</p>
        </div>
      </div>

      <a
        href="https://wa.me/51928430066"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-[#f59b23] px-7 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#062252] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffac3a]"
      >
        Inscribirme al sorteo
      </a>
    </section>
  );
};

export default SorteosParticipation;
