"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const eventos = [
  {
    id: 1,
    fecha: "2026-01-24",
    titulo: "Capacitación Presencial de Subastas Vehiculares y Bienes Raíces",
    descripcion: "Se parte de nuestro próximo taller presencial y aprende de los expertos. Este 24 de Enero en La Molina, Lima.",
    imagen: "/eventos/eventopresencial1.jpg",
    hora: "18:00 PM",
    lugar: "La Molina, Lima",
  },
  {
    id: 2,
    fecha: "2026-01-31",
    titulo: "Capacitación Virtual de Subastas Vehiculares y Bienes Raíces",
    descripcion: "Se parte de nuestro próximo taller virtual y aprende de los expertos. Este 31 de Enero via ZOOM.",
    imagen: "/eventos/zoom.png",
    hora: "19:00 PM",
    lugar: "Vía ZOOM",
  },
  {
    id: 3,
    fecha: "2026-02-15",
    titulo: "Proxima 3° Subasta Virtual de Vehículos",
    descripcion: "Conectate a nuestra plataforma y participa en la tercera subasta virtual de vehículos a cargo de la empresa CALTIMER.",
    imagen: "/eventos/subastadeautos.jpg",
    hora: "10:00 AM",
    lugar: "Plataforma Virtual",
  },
];

const waNumber = "51931516694";
const buildWaUrl = (evento) => {
  const message = `Quiero información sobre: ${evento.titulo}`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
};

const mesesNombres = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function EventCalendar() {
  const [mesActual, setMesActual] = useState(new Date());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);

  // Obtener eventos del mes actual
  const eventosDelMes = eventos.filter(evento => {
    const fechaEvento = new Date(evento.fecha);
    return fechaEvento.getMonth() === mesActual.getMonth() && 
           fechaEvento.getFullYear() === mesActual.getFullYear();
  });

  // Auto-play de eventos si no hay selección
  useEffect(() => {
    if (eventoSeleccionado || eventosDelMes.length === 0) return;

    const interval = setInterval(() => {
      setAutoPlayIndex((prev) => (prev + 1) % eventosDelMes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [eventoSeleccionado, eventosDelMes.length]);

  // Actualizar evento mostrado en auto-play
  useEffect(() => {
    if (!eventoSeleccionado && eventosDelMes.length > 0) {
      // No establecer directamente, solo usar el index para el display
    }
  }, [autoPlayIndex, eventoSeleccionado, eventosDelMes]);

  const eventoMostrado = eventoSeleccionado || eventosDelMes[autoPlayIndex];

  const cambiarMes = (direccion) => {
    const nuevaFecha = new Date(mesActual);
    nuevaFecha.setMonth(mesActual.getMonth() + direccion);
    setMesActual(nuevaFecha);
    setEventoSeleccionado(null);
    setAutoPlayIndex(0);
  };

  const getDiasDelMes = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const primerDia = new Date(año, mes, 1).getDay();
    const ultimoDia = new Date(año, mes + 1, 0).getDate();

    const dias = [];
    
    // Días vacíos del inicio
    for (let i = 0; i < primerDia; i++) {
      dias.push(null);
    }
    
    // Días del mes
    for (let dia = 1; dia <= ultimoDia; dia++) {
      dias.push(dia);
    }
    
    return dias;
  };

  const tieneEvento = (dia) => {
    if (!dia) return false;
    const fecha = `${mesActual.getFullYear()}-${String(mesActual.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    return eventos.some(evento => evento.fecha === fecha);
  };

  const getEvento = (dia) => {
    const fecha = `${mesActual.getFullYear()}-${String(mesActual.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    return eventos.find(evento => evento.fecha === fecha);
  };

  const esHoy = (dia) => {
    const hoy = new Date();
    return dia === hoy.getDate() && 
           mesActual.getMonth() === hoy.getMonth() && 
           mesActual.getFullYear() === hoy.getFullYear();
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-[#e03131] to-[#f55f4e] rounded-3xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Calendario - Lado Izquierdo */}
        <div className="p-8 md:p-12 bg-white text-gray-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaCalendarAlt className="text-[#e03131]" />
              Calendario de Eventos
            </h3>
          </div>

          {/* Navegación de mes */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => cambiarMes(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Mes anterior"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <h4 className="text-xl font-semibold text-gray-800">
              {mesesNombres[mesActual.getMonth()]} {mesActual.getFullYear()}
            </h4>
            <button
              onClick={() => cambiarMes(1)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Mes siguiente"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-2">
            {/* Encabezados de días */}
            {diasSemana.map((dia) => (
              <div key={dia} className="text-center text-sm font-semibold text-gray-500 py-2">
                {dia}
              </div>
            ))}

            {/* Días del mes */}
            {getDiasDelMes().map((dia, index) => {
              const hayEvento = tieneEvento(dia);
              const evento = getEvento(dia);
              const esSeleccionado = eventoSeleccionado?.id === evento?.id;
              const esDiaActual = esHoy(dia);

              return (
                <div key={index} className="aspect-square">
                  {dia ? (
                    <button
                      onClick={() => {
                        if (hayEvento) {
                          setEventoSeleccionado(evento);
                        }
                      }}
                      disabled={!hayEvento}
                      className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition ${
                        hayEvento
                          ? esSeleccionado
                            ? "bg-[#e03131] text-white scale-105 shadow-lg"
                            : "bg-orange-100 text-orange-700 hover:bg-orange-200 hover:scale-105 cursor-pointer"
                          : esDiaActual
                          ? "bg-gray-200 text-gray-900 font-bold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {dia}
                    </button>
                  ) : (
                    <div className="w-full h-full"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-100 border-2 border-orange-400"></div>
              <span className="text-gray-600">Con evento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#e03131]"></div>
              <span className="text-gray-600">Seleccionado</span>
            </div>
          </div>
        </div>

        {/* Evento - Lado Derecho */}
        <div className="relative min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-[#e03131] to-[#f55f4e]">
          <AnimatePresence mode="wait">
            {eventoMostrado ? (
              <motion.div
                key={eventoMostrado.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col"
              >
                {/* Imagen del evento */}
                <div className="relative h-1/2 overflow-hidden">
                  <Image
                    src={eventoMostrado.imagen}
                    alt={eventoMostrado.titulo}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Información del evento */}
                <div className="flex-1 p-8 text-white flex flex-col justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-white/80 mb-2">
                      Próximos eventos
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {eventoMostrado.titulo}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {eventoMostrado.descripcion}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>{new Date(eventoMostrado.fecha + 'T00:00:00').toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </p>
                      <p>🕐 {eventoMostrado.hora}</p>
                      <p>📍 {eventoMostrado.lugar}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={buildWaUrl(eventoMostrado)}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center rounded-full bg-white text-[#e03131] px-6 py-3 font-semibold shadow-lg hover:-translate-y-0.5 transition"
                    >
                      Inscríbete ahora
                    </a>
                    
                    {!eventoSeleccionado && eventosDelMes.length > 1 && (
                      <div className="flex justify-center gap-2">
                        {eventosDelMes.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setAutoPlayIndex(idx)}
                            className={`h-2 rounded-full transition ${
                              idx === autoPlayIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                            }`}
                            aria-label={`Ir al evento ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                <div className="text-center text-white">
                  <FaCalendarAlt className="text-6xl mb-4 mx-auto opacity-50" />
                  <h3 className="text-2xl font-bold mb-2">No hay eventos este mes</h3>
                  <p className="text-white/80">Selecciona otro mes para ver los próximos eventos</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
