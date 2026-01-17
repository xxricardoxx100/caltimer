"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { InmobiliariaService } from "@/lib/supabase/services2";
import { FaHome, FaBuilding, FaMapMarkedAlt } from "react-icons/fa";

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

export const PropertyList = ({ filters }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeSection, setActiveSection] = useState("Casa o edificio");

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

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const normalizeCategory = (value) => {
    const normalized = String(value || "").toLowerCase();
    if (normalized.includes("depart")) return "Departamento";
    if (normalized.includes("casa") || normalized.includes("edificio")) {
      return "Casa o edificio";
    }
    if (normalized.includes("terreno")) return "Terrenos";
    return "Otros";
  };

  const sections = [
    { key: "Casa o edificio", title: "Casa o Edificio", icon: FaBuilding },
    { key: "Departamento", title: "Departamentos", icon: FaHome },
    { key: "Terrenos", title: "Terrenos", icon: FaMapMarkedAlt },
  ];

  const filteredProperties = properties.filter((property) => {
    const categoryMatch = filters?.category
      ? normalizeCategory(property.features) === filters.category
      : true;

    const districtMatch = filters?.district
      ? normalizeText(property.district) === normalizeText(filters.district)
      : true;

    return categoryMatch && districtMatch;
  });

  const sectionItemsMap = useMemo(() => {
    const map = new Map();
    sections.forEach((section) => {
      map.set(
        section.key,
        filteredProperties.filter(
          (property) => normalizeCategory(property.features) === section.key
        )
      );
    });
    return map;
  }, [filteredProperties]);

  useEffect(() => {
    if (!sectionItemsMap.size) return;
    const currentItems = sectionItemsMap.get(activeSection) || [];
    if (currentItems.length === 0) {
      const firstAvailable = sections.find(
        (section) => (sectionItemsMap.get(section.key) || []).length > 0
      );
      if (firstAvailable) {
        setActiveSection(firstAvailable.key);
      }
    }
  }, [sectionItemsMap, activeSection]);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Nuestros Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600">
            Selecciona una categoría para ver sus inmuebles.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.key;
              const totalItems = sectionItemsMap.get(section.key)?.length || 0;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={
                    "group flex flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-6 text-left transition focus:outline-none focus:ring-2 focus:ring-orange-400/60 " +
                    (isActive
                      ? "border-orange-400 bg-orange-50"
                      : "border-neutral-200 bg-white hover:border-orange-300")
                  }
                >
                  <Icon className={"text-4xl " + (isActive ? "text-orange-500" : "text-neutral-400")} />
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{section.title}</p>
                    <p className="text-xs text-gray-500">{totalItems} disponibles</p>
                  </div>
                </button>
              );
            })}
          </div>
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
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-sm text-neutral-500">
            No hay inmuebles que coincidan con los filtros seleccionados.
          </p>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {sections.find((section) => section.key === activeSection)?.title}
              </h3>
              <p className="text-sm text-gray-500">
                {(sectionItemsMap.get(activeSection) || []).length} opciones disponibles
              </p>
            </div>

            <motion.div
              key={activeSection}
              className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {(sectionItemsMap.get(activeSection) || []).map((property) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyList;
