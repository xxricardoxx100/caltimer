"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MdAttachMoney, MdHome } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { FaHandHoldingUsd } from "react-icons/fa";
import HeroSlide from "@/app/components/inmobiliaria/HeroSlide";
import { InmobiliariaService } from "@/lib/supabase/services2";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProperty = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const fetchedProperty = await InmobiliariaService.getInmobiliariaById(
          Number(id)
        );

        if (!fetchedProperty) {
          throw new Error("Inmueble no encontrado");
        }

        const fetchedImages =
          (await InmobiliariaService.getImagesByinmobiliariaId(Number(id))) ||
          [];

        const sanitizedGallery = Array.isArray(fetchedImages)
          ? fetchedImages.map((image) => image?.url_images).filter(Boolean)
          : [];

        if (!isMounted) return;
        setProperty({
          ...fetchedProperty,
          moreImages: sanitizedGallery,
        });
        setGalleryImages(sanitizedGallery);
        setHasError(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        if (isMounted) {
          setHasError(true);
          setProperty(null);
          setGalleryImages([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProperty();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const heroImages = useMemo(() => {
    if (galleryImages.length) return galleryImages;
    if (property?.image) return [property.image];
    return [];
  }, [galleryImages, property?.image]);

  if (isLoading) {
    return (
      <div className="mt-32 flex flex-col items-center gap-4 px-6 text-center text-neutral-600">
        <p className="text-lg font-semibold text-neutral-800">
          Cargando inmueble...
        </p>
      </div>
    );
  }

  if (hasError || !property) {
    return (
      <div className="mt-32 flex flex-col items-center gap-4 px-6 text-center text-neutral-600">
        <p className="text-lg font-semibold text-neutral-800">
          No encontramos este inmueble.
        </p>
        <p className="text-sm">
          Verifica el enlace o regresa al listado para continuar explorando.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="mt-25">
      {/* Image Section with Overlay */}
      <div className="overflow-hidden relative w-full h-[60vh] md:h-[80vh]">
        <div className="flex transition-transform ease-out duration-700 h-full">
          <img
            src={heroImages[0] || property.image || "/placeholder.svg"}
            alt={property.name}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 p-6 text-white ml-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {property.name}
            </h1>
            <p className="text-lg md:text-xl font-medium mb-4">
              {property.district}
            </p>

            {/* Delivery Status Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md font-medium">
              <MdHome className="w-4 h-4" />
              {property.deliveryStatus}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="bg-black text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Section */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <MdAttachMoney className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-orange-400 font-semibold text-lg mb-1">
              Precio desde:
            </h3>
            <p className="text-xl font-bold">{property.price}</p>
          </div>

          {/* Financing Section */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <FaHandHoldingUsd className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-orange-400 font-semibold text-lg mb-1">
              Financiado por
            </h3>
            <p className="text-xl font-bold"></p>
          </div>

          {/* Location Section */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <LuMapPinned className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-orange-400 font-semibold text-lg mb-1">
              Ubicación
            </h3>
            <p className="text-lg font-medium">{property.address}</p>
            <p className="text-sm text-gray-300">{property.district}</p>
          </div>
        </div>
      </div>
      <section className="bg-white py-16 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-25 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                {property.sectionTitle}
              </h2>

              <div className="space-y-4 text-gray-700 text-justify">
                <p className="text-x leading-relaxed">{property.description}</p>
              </div>
            </div>

            <div className="relative w-full max-h-[600px] overflow-hidden">
              {property.mediaType === "video" ? (
                <video
                  src={property.image2}
                  controls
                  className="w-full h-[600px] object-contain rounded-lg shadow-lg"
                />
              ) : (
                <img
                  src={property.image2 || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <HeroSlide images={property.moreImages || []} />
    </div>
  );
}
