"use client";

import { useEffect, useState } from "react";

const SorteosImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <figure
            key={`${image.src}-detail`}
            className="overflow-hidden rounded-2xl border border-[#d7dfef]"
          >
            <button
              type="button"
              onClick={() => setActiveImage(image)}
              className="group relative block w-full cursor-zoom-in"
              aria-label={`Ampliar imagen ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-72"
              />
            </button>
            <figcaption className="bg-[#f7f9fe] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#4f6692]">
              Foto detalle {index + 1} (click para ampliar)
            </figcaption>
          </figure>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020817]/85 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imagen ampliada"
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-white/20 bg-[#0b1738] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.45)] animate-scaleIn"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-3 top-3 rounded-full border border-white/30 bg-[#0f214d]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#163370]"
            >
              Cerrar
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="mx-auto max-h-[82vh] w-auto max-w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SorteosImageGallery;