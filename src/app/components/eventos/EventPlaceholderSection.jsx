import React from "react";

export default function EventPlaceholderSection({ title, description }) {
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-orange-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
        {description || "Contenido pendiente de definir."}
      </p>
    </section>
  );
}
