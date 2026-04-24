import React from "react";
import { headingFont } from "./sorteosFonts";
import { flyerImages, raffleHighlights } from "./sorteosData";
import SorteosImageGallery from "./SorteosImageGallery";

const SorteosDetails = () => {
  return (
    <section className="grid grid-cols-1 gap-6">
      <div className="rounded-3xl border border-[#d6deec] bg-white/95 p-6 shadow-[0_18px_42px_rgba(0,32,96,0.12)] md:p-8">
        <h2 className={`${headingFont.className} text-2xl text-[#001b52] md:text-3xl`}>
          Detalles del sorteo
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#294473] md:text-lg">
          Caltimer Group presenta este sorteo especial para premiar a su comunidad. La moto Hunk se
          entrega nueva, 0 km, y lista para estrenarse.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {raffleHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#cdd8eb] bg-[#f3f7ff] p-4 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f6692]">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-extrabold text-[#002060]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[#f6cf97] bg-[#fff7ec] p-4">
          <p className="text-sm font-medium leading-relaxed text-[#7c4300]">
            El sorteo se realizará el sábado 01 de mayo. Cada ticket cuesta 20 soles y aumenta tus
            oportunidades de participar por la moto Hunk.
          </p>
        </div>

        <div className="mt-6">
          <h3 className={`${headingFont.className} text-xl text-[#001b52]`}>Fotos del premio</h3>
          <SorteosImageGallery images={flyerImages} />
        </div>
      </div>
    </section>
  );
};

export default SorteosDetails;
