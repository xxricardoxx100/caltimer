"use client";

const VirtualAgent = () => {
  return (
    <a
      href="https://wa.link/k3nf93?text=Tengo%20dudas%20sobre%20la%20pagina%20Web,%20quiero%20informacion%20sobre..."
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-5 bottom-6 z-50 flex items-center gap-3 rounded-2xl border border-orange-200 bg-white/95 px-4 py-3 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-orange-50 ring-2 ring-orange-200">
        <img
          src="/agente.png"
          alt="Agente Caltimer"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="leading-tight">
        <p className="text-xs text-orange-500 font-semibold">Caltimer</p>
        <p className="text-sm font-semibold text-slate-900">¿Tienes alguna duda?</p>
      </div>
    </a>
  );
};

export default VirtualAgent;
