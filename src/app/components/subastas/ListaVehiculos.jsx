"use client";
import React, { useMemo, useState } from "react";
import SubastaCard from "./SubastaCard";
import { subastaData } from "./SubastaData";

const ListaVehiculos = () => {
  const ahora = useMemo(() => new Date(), []);

  const proximas = useMemo(
    () =>
      subastaData
        .filter((item) => new Date(item.fecha_fin) >= ahora)
        .sort((a, b) => new Date(a.fecha_fin) - new Date(b.fecha_fin)),
    [ahora]
  );

  const finalizadas = useMemo(
    () =>
      subastaData
        .filter((item) => new Date(item.fecha_fin) < ahora)
        .sort((a, b) => new Date(b.fecha_fin) - new Date(a.fecha_fin)),
    [ahora]
  );

  const [activeTab, setActiveTab] = useState(
    proximas.length > 0 ? "proximas" : "finalizadas"
  );

  if (subastaData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl font-semibold text-gray-600">
          Vehículos no disponibles por el momento 😔
        </p>
      </div>
    );
  }

  const listaActiva = activeTab === "proximas" ? proximas : finalizadas;

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("proximas")}
            className={
              activeTab === "proximas"
                ? "group rounded-2xl border border-[#F29F05] bg-[#FFF7ED] px-6 py-5 text-left shadow-sm transition"
                : "group rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm transition hover:border-[#F29F05]/60"
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold">Próximas subastas</p>
                <p className="text-sm text-gray-500">{proximas.length} disponibles</p>
              </div>
              <span
                className={
                  activeTab === "proximas"
                    ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F29F05] text-white"
                    : "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500"
                }
              >
                🕒
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("finalizadas")}
            className={
              activeTab === "finalizadas"
                ? "group rounded-2xl border border-[#F29F05] bg-[#FFF7ED] px-6 py-5 text-left shadow-sm transition"
                : "group rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm transition hover:border-[#F29F05]/60"
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold">Subastas finalizadas</p>
                <p className="text-sm text-gray-500">{finalizadas.length} disponibles</p>
              </div>
              <span
                className={
                  activeTab === "finalizadas"
                    ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F29F05] text-white"
                    : "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500"
                }
              >
                ✅
              </span>
            </div>
          </button>
        </div>
      </div>

      {listaActiva.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listaActiva.map((vehiculo) => (
            <SubastaCard key={vehiculo.id} vehiculo={vehiculo} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center text-gray-500">
          No hay vehículos para esta sección.
        </div>
      )}
    </div>
  );
};

export default ListaVehiculos;