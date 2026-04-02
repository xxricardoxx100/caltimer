"use client";

import { useEffect, useMemo, useState } from "react";

const PROYECTOS = ["Perla de Huaral 1", "Perla de Huaral 2"];
const LISTA_PRECIOS_FILE = "/inmobiliaria/lotes-propuesta.json";

export default function PrestamosCalculadoraPage() {
  const [proyecto, setProyecto] = useState("Perla de Huaral 2");
  const [primeraCuotaFecha, setPrimeraCuotaFecha] = useState("");
  const [lotes, setLotes] = useState([]);
  const [cargandoLotes, setCargandoLotes] = useState(true);
  const [manzanaSeleccionada, setManzanaSeleccionada] = useState("");
  const [loteSeleccionado, setLoteSeleccionado] = useState("");
  const [precioLote, setPrecioLote] = useState("");
  const [metrosCuadrados, setMetrosCuadrados] = useState("");
  const [ubicacionLote, setUbicacionLote] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [adelanto, setAdelanto] = useState("");
  const [meses, setMeses] = useState("");
  const [incluirInteres, setIncluirInteres] = useState(false);
  const [interesAnual, setInteresAnual] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [procesandoPdf, setProcesandoPdf] = useState(false);

  const precioNumerico = Number(precioLote) || 0;
  const adelantoNumerico = Number(adelanto) || 0;
  const saldoFinanciar = useMemo(() => {
    const saldo = precioNumerico - adelantoNumerico;
    return saldo > 0 ? saldo : 0;
  }, [precioNumerico, adelantoNumerico]);

  const mesesSeguros = Math.min(Number(meses) || 0, 36);
  const manzanasDisponibles = useMemo(
    () => [...new Set(lotes.map((lote) => lote.manzana))].filter(Boolean),
    [lotes]
  );
  const lotesDeManzana = useMemo(
    () => lotes.filter((lote) => lote.manzana === manzanaSeleccionada),
    [lotes, manzanaSeleccionada]
  );
  const loteActual = useMemo(
    () => lotes.find((lote) => lote.loteCompleto === loteSeleccionado) || null,
    [lotes, loteSeleccionado]
  );

  const formatearSoles = (valor) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor || 0);
  };

  const formatearFecha = (fecha) => {
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(fecha);
  };

  useEffect(() => {
    let isMounted = true;

    const cargarLotes = async () => {
      try {
        setCargandoLotes(true);
        const response = await fetch(LISTA_PRECIOS_FILE);
        if (!response.ok) {
          throw new Error("No se pudo cargar la lista de lotes");
        }

        const data = await response.json();
        const lotesNormalizados = Array.isArray(data)
          ? data.filter((lote) => lote?.manzana && lote?.loteCompleto)
          : [];

        if (!isMounted) return;

        setLotes(lotesNormalizados);

        const primerLote = lotesNormalizados[0] || null;
        if (primerLote) {
          setManzanaSeleccionada(primerLote.manzana);
          setLoteSeleccionado(primerLote.loteCompleto);
          setPrecioLote(String(primerLote.precioFinanciamiento || ""));
          setMetrosCuadrados(String(primerLote.area || ""));
          setUbicacionLote(primerLote.ubicacion || "");
          setAdelanto(String(primerLote.inicial || ""));
        }
      } catch {
        if (isMounted) {
          setError("No se pudo cargar la lista de precios propuesta del proyecto.");
        }
      } finally {
        if (isMounted) {
          setCargandoLotes(false);
        }
      }
    };

    cargarLotes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!lotesDeManzana.length) return;

    const loteValido = lotesDeManzana.some((lote) => lote.loteCompleto === loteSeleccionado);
    if (!loteValido) {
      setLoteSeleccionado(lotesDeManzana[0].loteCompleto);
    }
  }, [loteSeleccionado, lotesDeManzana]);

  useEffect(() => {
    const loteEncontrado = lotes.find((lote) => lote.loteCompleto === loteSeleccionado);
    if (!loteEncontrado) return;

    setPrecioLote(String(loteEncontrado.precioFinanciamiento || ""));
    setMetrosCuadrados(String(loteEncontrado.area || ""));
    setUbicacionLote(loteEncontrado.ubicacion || "");
    setAdelanto(String(loteEncontrado.inicial || ""));
  }, [loteSeleccionado, lotes]);

  const crearNombreArchivo = () => {
    const fecha = new Date();
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    return `simulacion-terreno-${y}${m}${d}.pdf`;
  };

  const obtenerLogoDataUrl = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(null);
            return;
          }

          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = `${window.location.origin}/inmobiliaria/logo.jpg`;
    });
  };

  const generarPdfBlob = async () => {
    if (!resultado) return null;

    const [{ jsPDF }, autoTableModule] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
    const autoTable = autoTableModule.default;
    const doc = new jsPDF();

    const logoDataUrl = await obtenerLogoDataUrl();
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, "JPEG", 14, 8, 24, 24);
    }

    doc.setFontSize(15);
    doc.text(resultado.proyecto, 44, 17);
    doc.setFontSize(13);
    doc.text("Resumen del financiamiento", 44, 26);
    doc.setFontSize(10);
    doc.text(`Fecha: ${formatearFecha(new Date())}`, 14, 38);

    const resumenBody = [
      ["Proyecto", resultado.proyecto],
      ["Cliente", resultado.nombreCliente || "No especificado"],
      ["Manzana", resultado.manzana || ""],
      ["Lote", resultado.lote || ""],
      ["Ubicacion", resultado.ubicacion || ""],
      ["Area", `${resultado.area || 0} m2`],
      ["Precio por m2", formatearSoles(resultado.precioMetroCuadrado)],
      ["Precio total del terreno", formatearSoles(resultado.precioLote)],
      ["Adelanto pagado", formatearSoles(resultado.adelanto)],
      ["Monto a financiar", formatearSoles(resultado.capital)],
      ["Interes anual", `${resultado.interes}%`],
      ["Plazo", `${resultado.meses} meses`],
      ["Primera cuota", resultado.primeraCuota],
      ["Cuota mensual", formatearSoles(resultado.cuotaMensual)],
      ["Total a pagar", formatearSoles(resultado.totalPagar)],
    ];

    autoTable(doc, {
      startY: 46,
      head: [["Concepto", "Valor"]],
      body: resumenBody,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [31, 63, 88] },
    });

    if (resultado.descripcion?.trim()) {
      const yPos = doc.lastAutoTable.finalY + 8;
      doc.setFontSize(10);
      doc.text("Descripcion:", 14, yPos);
      doc.setFontSize(9);
      const lineas = doc.splitTextToSize(resultado.descripcion, 180);
      doc.text(lineas, 14, yPos + 5);
    }

    const inicioTablaPagos = (doc.lastAutoTable?.finalY || 60) + 14;
    autoTable(doc, {
      startY: inicioTablaPagos,
      head: [["Mes", "Fecha pago", "Cuota", "Capital", "Interes", "Saldo"]],
      body: resultado.tablaPagos.map((fila) => [
        String(fila.mes),
        fila.fechaPago,
        formatearSoles(fila.cuota),
        formatearSoles(fila.capital),
        formatearSoles(fila.interes),
        formatearSoles(fila.saldo),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [31, 63, 88] },
    });

    return doc.output("blob");
  };

  const descargarPdf = async () => {
    if (!resultado) {
      setError("Primero calcula las cuotas para generar el PDF.");
      return;
    }

    setProcesandoPdf(true);
    setError("");

    try {
      const pdfBlob = await generarPdfBlob();
      if (!pdfBlob) return;

      const nombreArchivo = crearNombreArchivo();
      const url = URL.createObjectURL(pdfBlob);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = nombreArchivo;
      enlace.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("No se pudo generar el PDF. Intenta nuevamente.");
    } finally {
      setProcesandoPdf(false);
    }
  };

  const enviarPorWhatsApp = async () => {
    if (!resultado) {
      setError("Primero calcula las cuotas para generar el PDF.");
      return;
    }

    setProcesandoPdf(true);
    setError("");

    try {
      const pdfBlob = await generarPdfBlob();
      if (!pdfBlob) return;

      const nombreArchivo = crearNombreArchivo();
      const archivo = new File([pdfBlob], nombreArchivo, { type: "application/pdf" });
      const textoWhatsApp = `Simulacion de financiamiento de terreno. Cuota mensual: ${formatearSoles(resultado.cuotaMensual)}.`;

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [archivo] })) {
        await navigator.share({
          title: "Simulacion de financiamiento",
          text: textoWhatsApp,
          files: [archivo],
        });
      } else {
        const url = URL.createObjectURL(pdfBlob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = nombreArchivo;
        enlace.click();
        URL.revokeObjectURL(url);

        const mensaje = encodeURIComponent(
          `${textoWhatsApp} Ya descargue el PDF y te lo adjunto por este medio.`
        );
        window.open(`https://wa.me/?text=${mensaje}`, "_blank");
      }
    } catch {
      setError("No fue posible compartir por WhatsApp en este dispositivo.");
    } finally {
      setProcesandoPdf(false);
    }
  };

  const calcularCuotas = () => {
    setError("");

    if (precioNumerico <= 0) {
      setResultado(null);
      setError("Ingresa un precio de lote válido.");
      return;
    }

    if (adelantoNumerico < 0 || adelantoNumerico > precioNumerico) {
      setResultado(null);
      setError("El adelanto debe ser mayor o igual a 0 y no superar el precio del lote.");
      return;
    }

    if (mesesSeguros < 1 || mesesSeguros > 36) {
      setResultado(null);
      setError("El tiempo de financiamiento debe estar entre 1 y 36 meses.");
      return;
    }

    const capital = saldoFinanciar;
    const metrosNumerico = Number(metrosCuadrados) || 0;
    const interesAnualNumerico = Number(interesAnual) || 0;
    const tasaMensual = incluirInteres && interesAnualNumerico > 0 ? interesAnualNumerico / 12 / 100 : 0;
    const loteEncontrado = loteActual;
    let cuotaMensual = 0;
    let totalPagar = 0;
    const tablaPagos = [];

    if (capital <= 0) {
      cuotaMensual = 0;
      totalPagar = 0;
    } else if (tasaMensual > 0) {
      const factor = Math.pow(1 + tasaMensual, mesesSeguros);
      cuotaMensual = (capital * tasaMensual * factor) / (factor - 1);
      totalPagar = cuotaMensual * mesesSeguros;
    } else {
      cuotaMensual = capital / mesesSeguros;
      totalPagar = capital;
    }

    let saldoRestante = capital;
    const fechaPrimeraCuota = primeraCuotaFecha
      ? new Date(`${primeraCuotaFecha}T00:00:00`)
      : new Date();

    for (let i = 1; i <= mesesSeguros; i += 1) {
      const interesMes = tasaMensual > 0 ? saldoRestante * tasaMensual : 0;
      let capitalMes = cuotaMensual - interesMes;

      if (i === mesesSeguros) {
        capitalMes = saldoRestante;
      }

      const cuotaMes = capitalMes + interesMes;
      saldoRestante = Math.max(0, saldoRestante - capitalMes);

      const fechaPago = new Date(
        fechaPrimeraCuota.getFullYear(),
        fechaPrimeraCuota.getMonth() + (i - 1),
        fechaPrimeraCuota.getDate()
      );

      tablaPagos.push({
        mes: i,
        fechaPago: formatearFecha(fechaPago),
        cuota: cuotaMes,
        capital: capitalMes,
        interes: interesMes,
        saldo: saldoRestante,
      });
    }

    setResultado({
      proyecto,
      nombreCliente,
      manzana: loteEncontrado?.manzana || manzanaSeleccionada,
      lote: loteEncontrado?.loteCompleto || loteSeleccionado,
      ubicacion: loteEncontrado?.ubicacion || ubicacionLote,
      area: loteEncontrado?.area || metrosNumerico,
      precioContado: loteEncontrado?.precioContado || 0,
      precioLote: precioNumerico,
      metrosCuadrados: metrosNumerico,
      precioMetroCuadrado: metrosNumerico > 0 ? precioNumerico / metrosNumerico : 0,
      descripcion,
      adelanto: adelantoNumerico,
      primeraCuota: formatearFecha(fechaPrimeraCuota),
      capital,
      cuotaMensual,
      totalPagar,
      meses: mesesSeguros,
      interes: incluirInteres ? interesAnualNumerico : 0,
      tablaPagos,
    });
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-[#f6f7fb] px-4 py-24 sm:px-6"
      data-scroll-section
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <div className="bg-gradient-to-r from-[#1f3f58] to-[#2d4f70] px-6 py-8 text-white sm:px-10">
          <h1 className="text-2xl font-bold sm:text-3xl">Calculadora de Cuotas de Terreno</h1>
          <p className="mt-2 text-sm text-slate-100 sm:text-base">
            Completa los datos principales del lote para preparar una simulación.
          </p>
        </div>

        <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Proyecto</label>
              <select
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
              >
                {PROYECTOS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Fecha de primera cuota (opcional)</label>
              <input
                type="date"
                value={primeraCuotaFecha}
                onChange={(e) => setPrimeraCuotaFecha(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
              />
              <p className="mt-1 text-xs text-slate-500">Si no seleccionas fecha, se usará la de hoy.</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Manzana</label>
              <select
                value={manzanaSeleccionada}
                onChange={(e) => setManzanaSeleccionada(e.target.value)}
                disabled={cargandoLotes || !manzanasDisponibles.length}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20 disabled:bg-slate-100"
              >
                {cargandoLotes ? (
                  <option value="">Cargando lotes...</option>
                ) : (
                  manzanasDisponibles.map((manzana) => (
                    <option key={manzana} value={manzana}>
                      {manzana}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Lote</label>
              <select
                value={loteSeleccionado}
                onChange={(e) => setLoteSeleccionado(e.target.value)}
                disabled={cargandoLotes || !lotesDeManzana.length}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20 disabled:bg-slate-100"
              >
                {cargandoLotes ? (
                  <option value="">Cargando lotes...</option>
                ) : (
                  lotesDeManzana.map((lote) => (
                    <option key={lote.loteCompleto} value={lote.loteCompleto}>
                      {lote.loteCompleto}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Área del lote</label>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                pattern="[0-9]*"
                value={metrosCuadrados}
                onChange={(e) => setMetrosCuadrados(e.target.value)}
                placeholder="Ej: 140"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Ubicación</label>
              <input
                type="text"
                value={ubicacionLote}
                readOnly
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Precio del lote</label>
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                value={precioLote}
                onChange={(e) => setPrecioLote(e.target.value)}
                placeholder="Ej: 44800.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
              />
              <p className="mt-1 text-xs text-slate-500">Formato: S/ 0.00</p>
            </div>
          </div>

          <details className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-slate-700">
              Ver precio al contado (solo lectura)
            </summary>
            <p className="mt-2 text-base font-semibold text-[#0f6a42]">
              {formatearSoles(loteActual?.precioContado || 0)}
            </p>
          </details>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Nombre del cliente</label>
            <input
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="Ej: Juan Perez"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              placeholder="Ej: Lote esquina, cerca de avenida principal, con acceso a servicios"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Adelanto inicial</label>
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                value={adelanto}
                onChange={(e) => setAdelanto(e.target.value)}
                placeholder="Ej: 50000.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
              />
              <p className="mt-1 text-xs text-slate-500">Formato: S/ 0.00</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Tiempo de financiamiento (meses)</label>
              <input
                type="number"
                min="1"
                max="36"
                inputMode="numeric"
                pattern="[0-9]*"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                placeholder="1 a 36"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
              />
              <p className="mt-1 text-xs text-slate-500">Máximo permitido: 36 meses</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
              <input
                type="checkbox"
                checked={incluirInteres}
                onChange={(e) => setIncluirInteres(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#1f3f58] focus:ring-[#1f3f58]/30"
              />
              Incluir interés anual
            </label>

            {incluirInteres && (
              <div className="mt-4 sm:max-w-xs">
                <label className="mb-2 block text-sm font-semibold text-slate-800">Interés anual (%)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  value={interesAnual}
                  onChange={(e) => setInteresAnual(e.target.value)}
                  placeholder="Ej: 12"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1f3f58] focus:ring-2 focus:ring-[#1f3f58]/20"
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={calcularCuotas}
            className="w-full rounded-xl bg-gradient-to-r from-[#365f87] to-[#1f3f58] px-5 py-3.5 text-base font-semibold text-white shadow-md transition hover:brightness-110"
          >
            Calcular cuotas
          </button>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          {resultado && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-700 sm:px-6">
                <h2 className="text-base font-bold text-[#1f3f58]">Resumen del financiamiento</h2>

                <div className="mt-4 space-y-2">
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Proyecto:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.proyecto}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Cliente:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.nombreCliente || "No especificado"}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Manzana:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.manzana}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Lote:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.lote}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Ubicación:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.ubicacion}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Área:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.area} m2</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Precio por m²:</span>
                    <span className="font-semibold text-[#0f6a42]">{formatearSoles(resultado.precioMetroCuadrado)}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Precio total del terreno:</span>
                    <span className="font-semibold text-[#0f6a42]">{formatearSoles(resultado.precioLote)}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Adelanto pagado:</span>
                    <span className="font-semibold text-[#0f6a42]">{formatearSoles(resultado.adelanto)}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Monto a financiar:</span>
                    <span className="font-semibold text-[#0f6a42]">{formatearSoles(resultado.capital)}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Interés anual:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.interes}%</span>
                  </p>
                  <p className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <span>Primera cuota:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.primeraCuota}</span>
                  </p>
                  <p className="flex items-center justify-between gap-3">
                    <span>Plazo:</span>
                    <span className="font-semibold text-[#0f6a42]">{resultado.meses} meses</span>
                  </p>
                </div>

                {resultado.descripcion?.trim() && (
                  <p className="mt-4 rounded-lg bg-white px-3 py-2 text-xs text-slate-600">
                    <span className="font-semibold">Descripción:</span> {resultado.descripcion}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-[#2fba66] px-6 py-6 text-center text-white shadow-sm">
                <p className="text-sm">Cuota mensual</p>
                <p className="mt-1 text-4xl font-extrabold">{formatearSoles(resultado.cuotaMensual)}</p>
                <p className="mt-1 text-sm text-green-50">por {resultado.meses} meses</p>
                <p className="mt-3 text-sm">
                  Total a pagar: <span className="font-semibold">{formatearSoles(resultado.totalPagar)}</span>
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-[#9cd8b6] bg-[#f6fffa] px-4 py-4 sm:px-6">
                <p className="text-sm font-semibold text-[#1f3f58]">Exportar resultado</p>
                <p className="mt-1 text-xs text-slate-600">
                  Puedes descargar el reporte en PDF o compartirlo por WhatsApp.
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={descargarPdf}
                    disabled={procesandoPdf}
                    className="rounded-lg bg-[#2fba66] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {procesandoPdf ? "Procesando..." : "Descargar PDF"}
                  </button>
                  <button
                    type="button"
                    onClick={enviarPorWhatsApp}
                    disabled={procesandoPdf}
                    className="rounded-lg bg-[#1f3f58] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {procesandoPdf ? "Procesando..." : "Enviar por WhatsApp"}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-base font-bold text-[#1f3f58]">Tabla de pagos</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full overflow-hidden rounded-lg text-sm">
                    <thead className="bg-[#1f3f58] text-white">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Mes</th>
                        <th className="px-3 py-2 text-left font-semibold">Fecha de pago</th>
                        <th className="px-3 py-2 text-right font-semibold">Cuota</th>
                        <th className="px-3 py-2 text-right font-semibold">Capital</th>
                        <th className="px-3 py-2 text-right font-semibold">Interés</th>
                        <th className="px-3 py-2 text-right font-semibold">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.tablaPagos.map((fila) => (
                        <tr key={fila.mes} className="border-b border-slate-100 odd:bg-slate-50">
                          <td className="px-3 py-2">{fila.mes}</td>
                          <td className="px-3 py-2">{fila.fechaPago}</td>
                          <td className="px-3 py-2 text-right">{formatearSoles(fila.cuota)}</td>
                          <td className="px-3 py-2 text-right">{formatearSoles(fila.capital)}</td>
                          <td className="px-3 py-2 text-right">{formatearSoles(fila.interes)}</td>
                          <td className="px-3 py-2 text-right">{formatearSoles(fila.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
