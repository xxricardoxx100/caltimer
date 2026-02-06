"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MdAttachMoney, MdHome } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import { FaHandHoldingUsd } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import HeroSlide from "@/app/components/inmobiliaria/HeroSlide";
import { InmobiliariaService } from "@/lib/supabase/services2";
import { buildOptimizedImageUrl } from "@/lib/supabase/image-helpers";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

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
    const baseList = galleryImages.length
      ? galleryImages
      : property?.image
      ? [property.image]
      : [];

    return baseList.map((img) =>
      buildOptimizedImageUrl(img, { width: 1400, quality: 70 })
    );
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
      <div 
        className="overflow-hidden relative w-full h-[60vh] md:h-[80vh] cursor-pointer group"
        onClick={() => openImageModal(heroImages[0] || property.image)}
      >
        <div className="flex transition-transform ease-out duration-700 h-full">
          <div className="relative w-full h-full" style={{ minWidth: "100%", minHeight: "100%" }}>
            <Image
              src={heroImages[0] || property.image || "/placeholder.svg"}
              alt={property.name}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none">
          <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12 text-white w-full">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg">
                {property.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-medium mb-4 drop-shadow-md">
                {property.district}
              </p>

              {/* Delivery Status Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium shadow-lg backdrop-blur-sm">
                <MdHome className="w-5 h-5" />
                {property.deliveryStatus}
              </div>
            </div>
          </div>
          
          {/* Click to expand hint */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
            Click para ampliar
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price Section */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <MdAttachMoney className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Precio desde
              </h3>
              <p className="text-2xl md:text-3xl font-bold">{property.price}</p>
            </div>

            {/* Financing Section */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <FaHandHoldingUsd className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Financiamiento
              </h3>
              <p className="text-xl font-medium text-gray-300">Disponible</p>
            </div>

            {/* Location Section */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <LuMapPinned className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Ubicación
              </h3>
              <p className="text-lg font-semibold">{property.address}</p>
              <p className="text-sm text-gray-400 mt-1">{property.district}</p>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                  Detalles del Inmueble
                </span>
                <div className="h-1 w-20 bg-orange-500 mt-2"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {property.sectionTitle}
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="text-base md:text-lg leading-relaxed whitespace-pre-line text-justify">
                  {property.description}
                </p>
              </div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Estado</p>
                  <p className="font-semibold text-gray-900">{property.deliveryStatus}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Distrito</p>
                  <p className="font-semibold text-gray-900">{property.district}</p>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              {property.mediaType === "video" ? (
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <video
                    src={property.image2}
                    controls
                    className="w-full h-auto max-h-[600px] object-contain bg-black"
                  />
                </div>
              ) : (
                <div 
                  className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] cursor-pointer group overflow-hidden rounded-xl shadow-2xl"
                  onClick={() => openImageModal(property.image2)}
                >
                  <Image
                    src={
                      buildOptimizedImageUrl(property.image2, {
                        width: 1200,
                        quality: 85,
                      }) || "/placeholder.svg"
                    }
                    alt={property.name}
                    fill
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className="object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full text-base font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      🔍 Click para ampliar
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <HeroSlide images={property.moreImages || []} />

      {/* Modal para imagen en pantalla completa */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/97 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeImageModal}
        >
          {/* Botón de cerrar mejorado */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-orange-400 transition-all duration-300 z-[10000] bg-black/70 hover:bg-orange-500 rounded-full p-3 shadow-2xl backdrop-blur-sm group"
            aria-label="Cerrar"
          >
            <IoClose className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Indicador de cerrar en la parte inferior */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Presiona ESC o haz click fuera de la imagen para cerrar
          </div>

          {/* Contenedor de imagen */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Imagen ampliada"
              fill
              sizes="100vw"
              className="object-contain drop-shadow-2xl"
              quality={95}
            />
          </div>
        </div>
      )}
    </div>
  );
}
