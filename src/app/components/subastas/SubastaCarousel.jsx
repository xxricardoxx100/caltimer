"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { buildOptimizedImageUrl } from "@/lib/supabase/image-helpers";

const defaultSlides = [
  {
    id: 1,
    title: "<span style='color: #002060;'>Capacitación Presencial</span> de Subastas Vehiculares y Bienes Raíces",
    description:
      "Se parte de nuestro próximo taller presencial y aprende de los expertos. Este 28 de Febrero en La Molina, Lima.",
    cta: "Inscribite ahora",
    image: "/eventos/eventopresencial1.jpg",
  },
  {
    id: 2,
    title: "<span style='color: #002060;'>Capacitación Virtual</span> de Subastas Vehiculares y Bienes Raíces",
    description: "Se parte de nuestro próximo taller virtual y aprende de los expertos. Este 28 de Febrero via ZOOM.",
    cta: "Inscribite ahora",
    image: "/eventos/zoom.png",
  },
  {
    id: 3,
    title: "Proxima <span style='color: #002060;'>4° Subasta</span> Virtual de Vehículos",
    description: "Conectate a nuestra plataforma y participa en la cuarta subasta virtual de vehículos a cargo de la empresa CALTIMER.",
    cta: "Unirme",
    image: "/eventos/subastadeautos.jpg",
  },
];

const dotBaseClasses =
  "h-2 w-2 rounded-full bg-white/60 hover:bg-white transition";

const waNumber = "51931516694";
const buildWaUrl = (bannerIndex) => {
  const message = `Quiero informacion de su proximo evento`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
};

export default function SubastaCarousel({ slides = defaultSlides, intervalMs = 12000 }) {
  const sanitized = useMemo(
    () =>
      slides
        .filter((s) => s && s.image)
        .map((s) => ({
          ...s,
          image: buildOptimizedImageUrl(s.image, { width: 1600, quality: 80 }),
        })),
    [slides]
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!sanitized.length) return undefined;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sanitized.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [sanitized.length, intervalMs]);

  if (!sanitized.length) return null;

  const goTo = (idx) => setCurrent((idx + sanitized.length) % sanitized.length);

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-r from-[#E36C09] to-[#F29F05] text-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid gap-0 lg:grid-cols-2">
        <motion.div
          className="p-8 md:p-12 flex flex-col justify-center space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm uppercase tracking-[0.25rem] text-[#002060]">Próximos eventos</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span dangerouslySetInnerHTML={{ __html: sanitized[current].title }} />
          </h2>
          <p className="text-lg md:text-xl text-[#002060] max-w-2xl">
            {sanitized[current].description}
          </p>
          <a
            href={buildWaUrl(current + 1)}
            target="_blank"
            rel="noreferrer"
            className="self-start rounded-full bg-[#1F3F58] text-[#ffffff] px-5 py-3 font-semibold shadow-lg hover:-translate-y-0.5 transition"
          >
            {sanitized[current].cta}
          </a>
          <div className="flex items-center gap-3 pt-2">
            {sanitized.map((slide, idx) => (
              <button
                key={slide.id ?? idx}
                aria-label={`Ir al slide ${idx + 1}`}
                className={`${dotBaseClasses} ${idx === current ? "!bg-[#002060] scale-110" : "opacity-80"}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[320px] lg:min-h-[460px]">
          <AnimatePresence mode="wait">
            {sanitized.map((slide, idx) =>
              idx === current ? (
                <motion.div
                  key={slide.id ?? idx}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              aria-label="Anterior"
              className="pointer-events-auto h-11 w-11 rounded-full bg-white/80 text-[#E36C09] hover:bg-white shadow"
              onClick={() => goTo(current - 1)}
            >
              ◀
            </button>
            <button
              aria-label="Siguiente"
              className="pointer-events-auto h-11 w-11 rounded-full bg-white/80 text-[#E36C09] hover:bg-white shadow"
              onClick={() => goTo(current + 1)}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
