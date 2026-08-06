"use client";
import React, { useEffect, useMemo, useState } from "react";
import SubastaCard from "./SubastaCard";
import { subastaData } from "./SubastaData";

const GRACE_PERIOD_MS = 2 * 60 * 60 * 1000;

const WEEKDAYS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

const formatGroupLabel = (fechaISO) => {
  const d = new Date(fechaISO);
  return `${WEEKDAYS[d.getDay()]}. ${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}.`;
};

const formatHora = (fechaISO) =>
  new Date(fechaISO).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

const agruparPorFecha = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const d = new Date(item.fecha_fin);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });
  return Array.from(map.entries()).map(([key, items]) => ({ key, items }));
};

const ListaVehiculos = () => {
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setAhora(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const proximas = useMemo(
    () =>
      subastaData
        .filter(
          (item) =>
            new Date(item.fecha_fin).getTime() + GRACE_PERIOD_MS >= ahora.getTime()
        )
        .sort((a, b) => new Date(a.fecha_fin) - new Date(b.fecha_fin)),
    [ahora]
  );

  const finalizadas = useMemo(
    () =>
      subastaData
        .filter(
          (item) =>
            new Date(item.fecha_fin).getTime() + GRACE_PERIOD_MS < ahora.getTime()
        )
        .sort((a, b) => new Date(b.fecha_fin) - new Date(a.fecha_fin)),
    [ahora]
  );

  const [activeTab, setActiveTab] = useState(
    proximas.length > 0 ? "proximas" : "finalizadas"
  );

  if (subastaData.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-xl font-semibold text-gray-600">
          Vehículos no disponibles por el momento 😔
        </p>
      </div>
    );
  }

  const listaActiva = activeTab === "proximas" ? proximas : finalizadas;
  const grupos = agruparPorFecha(listaActiva);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 mb-16">
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full bg-[#1F3F58]/5 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("proximas")}
            className={
              activeTab === "proximas"
                ? "flex items-center gap-2 rounded-full bg-[#1F3F58] px-5 py-2.5 text-sm font-semibold text-white shadow transition"
                : "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#1F3F58]/60 transition hover:text-[#1F3F58]"
            }
          >
            🕒 Próximas
            <span
              className={
                activeTab === "proximas"
                  ? "rounded-full bg-white/20 px-2 py-0.5 text-xs"
                  : "rounded-full bg-[#1F3F58]/10 px-2 py-0.5 text-xs"
              }
            >
              {proximas.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("finalizadas")}
            className={
              activeTab === "finalizadas"
                ? "flex items-center gap-2 rounded-full bg-[#1F3F58] px-5 py-2.5 text-sm font-semibold text-white shadow transition"
                : "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#1F3F58]/60 transition hover:text-[#1F3F58]"
            }
          >
            ✅ Finalizadas
            <span
              className={
                activeTab === "finalizadas"
                  ? "rounded-full bg-white/20 px-2 py-0.5 text-xs"
                  : "rounded-full bg-[#1F3F58]/10 px-2 py-0.5 text-xs"
              }
            >
              {finalizadas.length}
            </span>
          </button>
        </div>
      </div>

      {grupos.length > 0 ? (
        <div className="space-y-10">
          {grupos.map(({ key, items }) => (
            <div key={key}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#1F3F58]/10 pb-2">
                <span className="rounded-lg bg-[#1F3F58] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {formatGroupLabel(items[0].fecha_fin)}
                </span>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>
                    {items.length} vehículo{items.length !== 1 ? "s" : ""}
                  </span>
                  {activeTab === "proximas" && (
                    <span className="font-semibold text-[#F29F05]">
                      Cierra desde {formatHora(items[0].fecha_fin)}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((vehiculo) => (
                  <SubastaCard key={vehiculo.id} vehiculo={vehiculo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#1F3F58]/20 bg-[#1F3F58]/[0.03] px-6 py-12 text-center text-gray-500">
          No hay vehículos para esta sección.
        </div>
      )}
    </div>
  );
};

export default ListaVehiculos;
