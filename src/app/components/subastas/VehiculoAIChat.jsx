"use client";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

const MAX_PREGUNTAS_SESION = 8;

const PREGUNTAS_SUGERIDAS = [
  "¿Cuál es el precio de mercado en Perú?",
  "¿Es un buen precio este?",
  "¿Qué tan confiable es este modelo?",
];

const VehiculoAIChat = ({ vehiculo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [pregunta, setPregunta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const scrollRef = useRef(null);

  const preguntasHechas = mensajes.filter((m) => m.rol === "user").length;
  const limiteAlcanzado = preguntasHechas >= MAX_PREGUNTAS_SESION;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, isLoading]);

  const enviarPregunta = async (texto) => {
    const textoLimpio = texto.trim();
    if (!textoLimpio || isLoading || limiteAlcanzado) return;

    const nuevosMensajes = [...mensajes, { rol: "user", texto: textoLimpio }];
    setMensajes(nuevosMensajes);
    setPregunta("");
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/vehiculo-asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehiculoId: vehiculo.id,
          pregunta: textoLimpio,
          historial: nuevosMensajes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error || "No se pudo obtener respuesta. Intenta de nuevo.");
        return;
      }

      setMensajes((prev) => [...prev, { rol: "ai", texto: data.respuesta }]);
    } catch (err) {
      setErrorMsg("No se pudo contactar al servicio de IA. Revisa tu conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarPregunta(pregunta);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 left-5 z-50 flex h-[420px] w-80 sm:w-96 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#040164] via-[#293578] to-[#4A5AA0] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <FaWandMagicSparkles className="text-sm" />
              </span>
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold">
                  Asistente IA
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </p>
                <p className="text-xs text-white/70">Sobre {vehiculo.marca} {vehiculo.modelo}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Cerrar"
            >
              <FaTimes />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {mensajes.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Prueba con una de estas preguntas:</p>
                <div className="flex flex-wrap gap-2">
                  {PREGUNTAS_SUGERIDAS.map((sugerida) => (
                    <button
                      key={sugerida}
                      type="button"
                      onClick={() => enviarPregunta(sugerida)}
                      className="rounded-full border border-[#1F3F58]/15 bg-[#1F3F58]/5 px-3 py-1.5 text-xs font-medium text-[#1F3F58] hover:bg-[#1F3F58]/10 transition"
                    >
                      {sugerida}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mensajes.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.rol === "user"
                    ? "ml-auto bg-[#F29F05] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.texto}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[85%] rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                Pensando...
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            {limiteAlcanzado && (
              <div className="rounded-xl border border-[#1F3F58]/15 bg-[#1F3F58]/5 px-3 py-2 text-xs text-[#1F3F58]">
                Alcanzaste el límite de preguntas por esta sesión. Contacta al administrador por WhatsApp para más dudas.
              </div>
            )}
          </div>

          <div className="border-t border-black/5 p-3">
            <p className="mb-2 text-[10px] leading-tight text-gray-400">
              Respuestas generadas por IA, son referenciales y no constituyen un avalúo oficial.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                placeholder={limiteAlcanzado ? "Límite alcanzado" : "Escribe tu pregunta..."}
                disabled={isLoading || limiteAlcanzado}
                maxLength={300}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#F29F05] focus:outline-none focus:ring-1 focus:ring-[#F29F05] disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || limiteAlcanzado || !pregunta.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#F29F05] to-[#E36C09] text-white disabled:from-gray-300 disabled:to-gray-300"
                aria-label="Enviar"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir asistente de IA"
        className="fixed left-5 bottom-6 z-50 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#040164] via-[#293578] to-[#5468C4] px-4 py-3 text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
      >
        {/* Halo difuminado y animado detrás del botón, con el azul real del logo */}
        <span className="absolute -inset-1.5 -z-10 rounded-3xl bg-gradient-to-br from-[#293578] via-[#4A5AA0] to-[#737BA7] opacity-70 blur-lg animate-pulse" />

        <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/15 text-base ring-1 ring-white/40">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-white/40" />
          <FaWandMagicSparkles className="relative" />
        </span>
        <span className="text-left leading-tight">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Asistente IA
          </span>
          <span className="block text-sm font-bold">Pregúntame lo que quieras</span>
        </span>
      </button>
    </>
  );
};

export default VehiculoAIChat;
