"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { InmobiliariaService } from "@/lib/supabase/services2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        const baseProperties = await InmobiliariaService.getInmobiliaria();
        const sanitized = Array.isArray(baseProperties) ? baseProperties : [];

        const withImages = await Promise.all(
          sanitized.map(async (property) => {
            try {
              const gallery =
                (await InmobiliariaService.getImagesByinmobiliariaId(
                  property.id
                )) || [];

              const galleryUrls = Array.isArray(gallery)
                ? gallery.map((image) => image?.url_images).filter(Boolean)
                : [];

              return {
                ...property,
                image: property.image || galleryUrls[0] || null,
                moreImages: galleryUrls,
              };
            } catch (imagesError) {
              console.error(
                `Error fetching gallery for property ${property.id}:`,
                imagesError
              );
              return {
                ...property,
                image: property.image || null,
                moreImages: [],
              };
            }
          })
        );

        if (!isMounted) return;
        setProperties(withImages);
        setHasError(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        if (isMounted) {
          setHasError(true);
          setProperties([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasProperties = properties.length > 0;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Nuestros Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600">
            Descubre las mejores opciones inmobiliarias
          </p>
        </motion.div>

        {isLoading ? (
          <p className="text-center text-sm text-neutral-500">
            Cargando propiedades...
          </p>
        ) : hasError ? (
          <p className="text-center text-sm text-rose-500">
            No pudimos cargar las propiedades. Intenta nuevamente.
          </p>
        ) : !hasProperties ? (
          <p className="text-center text-sm text-neutral-500">
            Aún no se han registrado inmuebles.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {properties.map((property) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertyList;
