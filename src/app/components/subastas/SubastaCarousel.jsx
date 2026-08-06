"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { buildOptimizedImageUrl } from "@/lib/supabase/image-helpers";

const defaultSlides = [
  {
    id: 1,
    title: "<span style='color: #F29F05;'>Capacitación Presencial</span> de Subastas Vehiculares y Bienes Raíces",
    description:
      "Se parte de nuestro próximo taller presencial y aprende de los expertos. En La Molina, Lima.",
    cta: "Inscribite ahora",
    image: "/eventos/eventopresencial1.jpg",
  },
  {
    id: 2,
    title: "<span style='color: #F29F05;'>Capacitación Virtual</span> de Subastas Vehiculares y Bienes Raíces",
    description: "Se parte de nuestro próximo taller virtual y aprende de los expertos. via ZOOM.",
    cta: "Inscribite ahora",
    image: "/eventos/zoom.png",
  },
  {
    id: 3,
    title: "Proxima <span style='color: #F29F05;'>4° Subasta</span> Virtual de Vehículos",
    description: "Conectate a nuestra plataforma y participa en la décima subasta virtual de vehículos a cargo de la empresa CALTIMER.",
    cta: "Unirme",
    image: "/eventos/subastadeautos.jpg",
  },
];

const dotBaseClasses =
  "h-2 w-2 rounded-full bg-white/30 hover:bg-white/70 transition";

const waNumber = "51928430066";
const buildWaUrl = (bannerIndex) => {
  const message = `Quiero informacion de su proximo evento`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
};

export default function SubastaCarousel({ slides = defaultSlides, intervalMs = 12000 }) {
  const isLocalImage = (src) => typeof src === "string" && src.startsWith("/");
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
      className="relative overflow-hidden bg-gradient-to-br from-[#1F3F58] to-[#0f2a3d] text-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Acento decorativo dorado, puramente visual */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#BF9056]/20 blur-3xl" />

      <div className="relative grid gap-0 lg:grid-cols-2">
        <motion.div
          className="p-5 md:p-8 flex flex-col justify-center space-y-2.5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-xs uppercase tracking-[0.25rem] text-[#F29F05] font-semibold">Próximos eventos</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
            <span dangerouslySetInnerHTML={{ __html: sanitized[current].title }} />
          </h2>
          <p className="text-sm text-white/80 max-w-2xl line-clamp-2">
            {sanitized[current].description}
          </p>
          <a
            href={buildWaUrl(current + 1)}
            target="_blank"
            rel="noreferrer"
            className="self-start rounded-full bg-[#F29F05] text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-[#E36C09] hover:-translate-y-0.5 transition"
          >
            {sanitized[current].cta}
          </a>
          <div className="flex items-center gap-3 pt-1">
            {sanitized.map((slide, idx) => (
              <button
                key={slide.id ?? idx}
                aria-label={`Ir al slide ${idx + 1}`}
                className={`${dotBaseClasses} ${idx === current ? "!bg-[#F29F05] scale-110" : ""}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[180px] lg:min-h-[260px]">
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
                    unoptimized={isLocalImage(slide.image)}
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1F3F58]/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              aria-label="Anterior"
              className="pointer-events-auto h-9 w-9 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition shadow text-sm"
              onClick={() => goTo(current - 1)}
            >
              ◀
            </button>
            <button
              aria-label="Siguiente"
              className="pointer-events-auto h-9 w-9 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition shadow text-sm"
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
