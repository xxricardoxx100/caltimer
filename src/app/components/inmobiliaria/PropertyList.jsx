import React from "react";
import PropertyCard from "./PropertyCard";
import sampleProperties from "@/app/components/inmobiliaria/propertyData";

export const PropertyList = () => {
  return (
    <div>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Proyectos Destacados
            </h2>
            <p className="text-gray-600 text-lg">
              Descubre las mejores opciones inmobiliarias en Lima
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
