"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonios = [
  {
    nombre: "Carlos Mendoza",
    ubicacion: "Lima, Perú",
    rating: 5,
    comentario: "Necesitaba dinero urgente para una emergencia médica. En menos de 24 horas tenía el efectivo en mi cuenta. El proceso fue transparente y rápido. ¡Excelente servicio!",
    vehiculo: "Toyota Corolla 2018"
  },
  {
    nombre: "María González",
    ubicacion: "Arequipa, Perú",
    rating: 5,
    comentario: "Estaba preocupada por mi historial crediticio, pero aquí no fue problema. Me dieron el 75% del valor de mi camioneta y las cuotas están dentro de mi presupuesto. Muy recomendado.",
    vehiculo: "Nissan Frontier 2019"
  },
  {
    nombre: "Roberto Silva",
    ubicacion: "Cusco, Perú",
    rating: 5,
    comentario: "El trato fue muy profesional. Me explicaron todo detalladamente y no hubo costos ocultos. Usé el dinero para expandir mi negocio y ahora puedo pagar cómodamente.",
    vehiculo: "Hyundai Tucson 2020"
  }
];

export default function PrestamosTestimonios() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E36C09] font-semibold text-sm uppercase tracking-wider">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#1F3F58]">
            Lo que dicen nuestros <span className="text-[#E36C09]">clientes</span>
          </h2>
          <p className="text-lg text-gray-600">
            Miles de personas han confiado en nosotros para obtener préstamos rápidos y seguros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((testimonio, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#F6F1E8] to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Icono de comilla */}
              <div className="absolute -top-4 left-8 bg-[#E36C09] w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <FaQuoteLeft className="text-white text-xl" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonio.rating)].map((_, i) => (
                  <FaStar key={i} className="text-[#E36C09] text-lg" />
                ))}
              </div>

              {/* Comentario */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonio.comentario}"
              </p>

              {/* Información del cliente */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-[#1F3F58]">{testimonio.nombre}</p>
                <p className="text-sm text-gray-500">{testimonio.ubicacion}</p>
                <p className="text-xs text-[#E36C09] mt-2 font-semibold">{testimonio.vehiculo}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estadísticas */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { valor: "5,000+", label: "Préstamos otorgados" },
            { valor: "98%", label: "Clientes satisfechos" },
            { valor: "S/ 800K", label: "Desembolsados" },
            { valor: "4.9/5", label: "Calificación promedio" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-[#E36C09] mb-2">
                {stat.valor}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
