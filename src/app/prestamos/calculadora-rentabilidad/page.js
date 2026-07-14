"use client";

import { useMemo, useState } from "react";

const COMISIONES = [3, 5, 10];

const numero = (valor) => Number(valor) || 0;

export default function CalculadoraRentabilidadPage() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");

  const [papeletasSat, setPapeletasSat] = useState("");
  const [impuestoVehicular, setImpuestoVehicular] = useState("");
  const [papeletasCallao, setPapeletasCallao] = useState("");
  const [papeletasAtu, setPapeletasAtu] = useState("");
  const [papeletasSutran, setPapeletasSutran] = useState("");

  const [tieneLlave, setTieneLlave] = useState(true);
  const [costoLlave, setCostoLlave] = useState("");
  const [tieneRevisionTecnica, setTieneRevisionTecnica] = useState(true);
  const [costoRevisionTecnica, setCostoRevisionTecnica] = useState("");
  const [tieneSoat, setTieneSoat] = useState(true);
  const [costoSoat, setCostoSoat] = useState("");

  const [gastoPlanchadoPintura, setGastoPlanchadoPintura] = useState("");
  const [gastoNotaria, setGastoNotaria] = useState("");
  const [gastoOtros, setGastoOtros] = useState("");

  const [pujaMaxima, setPujaMaxima] = useState("");
  const [comisionPct, setComisionPct] = useState(5);
  const [precioMercado, setPrecioMercado] = useState("");
  const [tipoCambio, setTipoCambio] = useState("3.75");

  const formatearSoles = (valor) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor || 0);

  const formatearDolares = (valor) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor || 0);

  const totales = useMemo(() => {
    const totalPapeletas =
      numero(papeletasSat) +
      numero(impuestoVehicular) +
      numero(papeletasCallao) +
      numero(papeletasAtu) +
      numero(papeletasSutran);

    const costoDocumentos =
      (!tieneLlave ? numero(costoLlave) : 0) +
      (!tieneRevisionTecnica ? numero(costoRevisionTecnica) : 0) +
      (!tieneSoat ? numero(costoSoat) : 0);

    const totalDeudas = totalPapeletas + costoDocumentos;

    const totalGastos =
      numero(gastoPlanchadoPintura) + numero(gastoNotaria) + numero(gastoOtros);

    const totalDeudasGastos = totalDeudas + totalGastos;

    const pujaNumerica = numero(pujaMaxima);
    const comisionMonto = pujaNumerica * (numero(comisionPct) / 100);
    const subtotal = pujaNumerica + comisionMonto + totalDeudasGastos;

    const precioMercadoNumerico = numero(precioMercado);
    const tipoCambioNumerico = numero(tipoCambio);

    const rentabilidadSoles = precioMercadoNumerico - subtotal;
    const rentabilidadDolares =
      tipoCambioNumerico > 0 ? rentabilidadSoles / tipoCambioNumerico : 0;
    const rentabilidadPorcentual =
      subtotal > 0 ? (rentabilidadSoles / subtotal) * 100 : 0;

    return {
      totalDeudas,
      totalGastos,
      totalDeudasGastos,
      comisionMonto,
      subtotal,
      rentabilidadSoles,
      rentabilidadDolares,
      rentabilidadPorcentual,
    };
  }, [
    papeletasSat,
    impuestoVehicular,
    papeletasCallao,
    papeletasAtu,
    papeletasSutran,
    tieneLlave,
    costoLlave,
    tieneRevisionTecnica,
    costoRevisionTecnica,
    tieneSoat,
    costoSoat,
    gastoPlanchadoPintura,
    gastoNotaria,
    gastoOtros,
    pujaMaxima,
    comisionPct,
    precioMercado,
    tipoCambio,
  ]);

  const mostrarResultado = numero(precioMercado) > 0;
  const esRentable = totales.rentabilidadSoles >= 0;

  const inputClase =
    "w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20";
  const labelClase = "mb-2 block text-sm font-semibold text-slate-800";

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-[#f6f7fb] px-4 py-24 sm:px-6"
      data-scroll-section
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <div className="bg-gradient-to-r from-[#1f3f58] to-[#2d4f70] px-6 py-8 text-white sm:px-10">
          <h1 className="text-2xl font-bold sm:text-3xl">Calculadora de Rentabilidad</h1>
          <p className="mt-2 text-sm text-slate-100 sm:text-base">
            Evalúa la rentabilidad de un vehículo de subasta considerando deudas, gastos y comisión.
          </p>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
          {/* Datos del vehículo */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClase}>Modelo del vehículo</label>
              <input
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ej: Toyota Yaris 2018"
                className={inputClase}
              />
            </div>
            <div>
              <label className={labelClase}>Placa</label>
              <input
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                placeholder="Ej: ABC-123"
                className={inputClase}
              />
            </div>
          </div>

          {/* Deudas */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#1f3f58]">Deudas</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClase}>Papeletas SAT</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={papeletasSat}
                  onChange={(e) => setPapeletasSat(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Impuesto vehicular</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={impuestoVehicular}
                  onChange={(e) => setImpuestoVehicular(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Papeletas Callao</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={papeletasCallao}
                  onChange={(e) => setPapeletasCallao(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Papeletas ATU</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={papeletasAtu}
                  onChange={(e) => setPapeletasAtu(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Papeletas SUTRAN</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={papeletasSutran}
                  onChange={(e) => setPapeletasSutran(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
            </div>

            {/* Documentos y estado del vehículo, al final de deudas */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={tieneLlave}
                    onChange={(e) => setTieneLlave(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#1f3f58] focus:ring-[#1f3f58]/30"
                  />
                  Tiene llave
                </label>
                {!tieneLlave && (
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Costo estimado de duplicado
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={costoLlave}
                      onChange={(e) => setCostoLlave(e.target.value)}
                      placeholder="S/ 0.00"
                      className={inputClase}
                    />
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={tieneRevisionTecnica}
                    onChange={(e) => setTieneRevisionTecnica(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#1f3f58] focus:ring-[#1f3f58]/30"
                  />
                  Tiene revisión técnica
                </label>
                {!tieneRevisionTecnica && (
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Costo estimado
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={costoRevisionTecnica}
                      onChange={(e) => setCostoRevisionTecnica(e.target.value)}
                      placeholder="S/ 0.00"
                      className={inputClase}
                    />
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={tieneSoat}
                    onChange={(e) => setTieneSoat(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#1f3f58] focus:ring-[#1f3f58]/30"
                  />
                  Tiene SOAT
                </label>
                {!tieneSoat && (
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Costo estimado
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={costoSoat}
                      onChange={(e) => setCostoSoat(e.target.value)}
                      placeholder="S/ 0.00"
                      className={inputClase}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gastos */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#1f3f58]">Gastos</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClase}>Planchado y pintura</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={gastoPlanchadoPintura}
                  onChange={(e) => setGastoPlanchadoPintura(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Notaría</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={gastoNotaria}
                  onChange={(e) => setGastoNotaria(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Otros</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={gastoOtros}
                  onChange={(e) => setGastoOtros(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
            </div>
          </div>

          {/* Resumen financiero */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#1f3f58]">Resumen</h2>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 sm:px-6">
              <p className="flex items-center justify-between gap-3 border-b border-slate-200 py-1.5">
                <span>Total deudas:</span>
                <span className="font-semibold text-[#1f3f58]">
                  {formatearSoles(totales.totalDeudas)}
                </span>
              </p>
              <p className="flex items-center justify-between gap-3 py-1.5">
                <span>Total gastos:</span>
                <span className="font-semibold text-[#1f3f58]">
                  {formatearSoles(totales.totalGastos)}
                </span>
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClase}>Puja máxima</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={pujaMaxima}
                  onChange={(e) => setPujaMaxima(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Comisión (sobre la puja máxima)</label>
                <select
                  value={comisionPct}
                  onChange={(e) => setComisionPct(Number(e.target.value))}
                  className={inputClase}
                >
                  {COMISIONES.map((pct) => (
                    <option key={pct} value={pct}>
                      {pct}%
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 sm:px-6">
              <p className="flex items-center justify-between gap-3 border-b border-slate-200 py-1.5">
                <span>Monto de comisión:</span>
                <span className="font-semibold text-[#1f3f58]">
                  {formatearSoles(totales.comisionMonto)}
                </span>
              </p>
              <p className="flex items-center justify-between gap-3 py-1.5">
                <span>Subtotal (puja + comisión + deudas + gastos):</span>
                <span className="font-semibold text-[#1f3f58]">
                  {formatearSoles(totales.subtotal)}
                </span>
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClase}>Precio de mercado del vehículo</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={precioMercado}
                  onChange={(e) => setPrecioMercado(e.target.value)}
                  placeholder="S/ 0.00"
                  className={inputClase}
                />
              </div>
              <div>
                <label className={labelClase}>Tipo de cambio (S/ por USD)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={tipoCambio}
                  onChange={(e) => setTipoCambio(e.target.value)}
                  placeholder="Ej: 3.75"
                  className={inputClase}
                />
              </div>
            </div>
          </div>

          {/* Resultado */}
          {mostrarResultado ? (
            <div
              className={`rounded-xl px-6 py-6 text-center text-white shadow-sm ${
                esRentable ? "bg-[#2fba66]" : "bg-red-500"
              }`}
            >
              <p className="text-sm">Rentabilidad estimada</p>
              <p className="mt-1 text-4xl font-extrabold">
                {formatearSoles(totales.rentabilidadSoles)}
              </p>
              <p className="mt-1 text-lg font-semibold">
                {formatearDolares(totales.rentabilidadDolares)}
              </p>
              <p className="mt-2 text-sm">
                {totales.rentabilidadPorcentual.toFixed(2)}% sobre la inversión total
              </p>
            </div>
          ) : (
            <p className="text-sm font-medium text-slate-500">
              Ingresa el precio de mercado del vehículo para calcular la rentabilidad.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
