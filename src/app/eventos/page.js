import React from "react";
import Link from "next/link";

const steps = [
  {
    title: "Elige tu vehiculo",
    description:
      "Te mostramos opciones disponibles y un precio transparente para tu evaluacion.",
  },
  {
    title: "Define inicial y plazo",
    description:
      "Pagas una inicial y el resto se financia en cuotas. Ajustamos el plan a tu capacidad.",
  },
  {
    title: "Contrato con garantia",
    description:
      "El vehiculo queda como garantia hasta cancelar el saldo. Todo se formaliza con contrato y seguimiento.",
  },
  {
    title: "Entrega y seguimiento",
    description:
      "Coordinamos firma, entrega y control de pagos para que tengas respaldo total.",
  },
];

const buyerBenefits = [
  "Inicial flexible para acceder al vehiculo que necesitas.",
  "Cuotas claras, con calendario y recordatorios.",
  "Acompaniamiento en todo el proceso.",
];

const requirements = [
  "Documento de identidad vigente.",
  "Sustento basico de ingresos.",
  "Revision vehicular y documentos en regla.",
  "Datos de contacto verificados.",
];

const waNumber = "51928430066";
const waMessage =
  "Hola, quiero informacion sobre la compra con inicial y cuotas financiadas.";
const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

const VentaConGarantia = () => {
  return (
    <div
      data-scroll-section
      className="pt-28 pb-16 bg-[#F6F1E8] font-sans"
      style={{
        "--sale-accent": "#E36C09",
        "--sale-deep": "#002060",
        "--sale-cream": "#FFF6E8",
      }}
    >
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--sale-accent)", opacity: 0.2 }}
        />
        <div
          className="pointer-events-none absolute -right-20 top-32 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--sale-deep)", opacity: 0.2 }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6 animate-fadeIn">
              <span className="inline-flex items-center rounded-full border border-[#E36C09]/40 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#002060]">
                Venta con garantia
              </span>
              <h1 className="text-4xl leading-tight text-[#002060] sm:text-5xl">
                Compra tu vehiculo con inicial y cuotas financiadas
              </h1>
              <p className="text-lg text-slate-700 max-w-2xl">
                Ofrecemos vehiculos con inicial y cuotas financiadas, usando el mismo vehiculo como garantia. Te guiamos en la evaluacion, el plan de pago y el seguimiento.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Inicial flexible",
                  "Cuotas a medida",
                  "Garantia vehicular",
                  "Proceso guiado",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="rounded-full bg-[#002060] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  Quiero comprar con garantia
                </Link>
                <Link
                  href="/prestamos/calculadora"
                  className="rounded-full border border-[#002060]/20 bg-white px-6 py-3 text-sm font-semibold text-[#002060] shadow-lg transition hover:-translate-y-0.5"
                >
                  Simular cuotas
                </Link>
              </div>
            </div>

            <div className="relative animate-scaleIn">
              <div
                className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(0,32,96,0.18)]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.96) 0%, var(--sale-cream) 100%)",
                }}
              >
                <h3 className="text-xl font-bold text-[#002060]">
                  Plan de pago con garantia
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Definimos el precio final, la inicial y el saldo a financiar con un calendario claro.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Inicial", value: "Flexible" },
                    { label: "Saldo", value: "Financiado" },
                    { label: "Plazo", value: "A medida" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-bold text-[#002060]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-white/80 p-4 text-sm text-slate-700">
                  El vehiculo queda como garantia hasta cancelar el saldo, con contrato y seguimiento de pagos.
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#002060]/90 px-4 py-3 text-white">
                  <span className="text-sm font-semibold">Acompanamiento personalizado</span>
                  <span className="text-xs uppercase tracking-[0.2em]">Caltimer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-14 px-4 md:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="text-3xl font-bold text-[#002060]">Como funciona</h2>
          <p className="text-sm text-slate-600 max-w-xl">
            Un proceso claro para publicar, financiar y cerrar la venta con respaldo.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Paso {index + 1}
                </span>
                <span className="rounded-full bg-[#E36C09]/15 px-3 py-1 text-xs font-semibold text-[#E36C09]">
                  {step.title}
                </span>
              </div>
              <p className="mt-4 text-lg font-semibold text-[#002060]">
                {step.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-14 px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_45px_rgba(0,32,96,0.12)]">
            <h3 className="text-2xl font-bold text-[#002060]">Para compradores</h3>
            <p className="mt-2 text-sm text-slate-600">
              Accede a un vehiculo con pagos accesibles y un plan claro.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {buyerBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#E36C09]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-14 px-4 md:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white/95 to-[var(--sale-cream)] p-8 shadow-[0_18px_50px_rgba(124,67,0,0.12)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="text-2xl font-bold text-[#002060]">Requisitos basicos</h3>
              <p className="mt-2 text-sm text-slate-600">
                Te pediremos informacion simple para evaluar y formalizar la compra.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
                {requirements.map((item) => (
                  <li key={item} className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-[#002060]/95 p-6 text-white">
              <h4 className="text-xl font-semibold">Listo para empezar?</h4>
              <p className="mt-2 text-sm text-white/80">
                Conversemos sobre tu inicial y definamos el plan de cuotas.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#002060]"
                >
                  Hablar con un asesor
                </a>
                <Link
                  href="/carros"
                  className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Ver vehiculos disponibles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VentaConGarantia;
