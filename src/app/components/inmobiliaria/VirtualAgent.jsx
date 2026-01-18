"use client";

const VirtualAgent = () => {
  return (
    <a
      href="https://wa.link/k3nf93"
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-5 bottom-6 z-50 flex items-center gap-3 rounded-2xl border border-orange-200 bg-white/95 px-4 py-3 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 ring-2 ring-orange-200">
        <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-orange-400" />
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
        </div>
        <div className="absolute bottom-2 h-1.5 w-5 rounded-full bg-slate-900/80" />
      </div>
      <div className="leading-tight">
        <p className="text-xs text-orange-500 font-semibold">Caltimer</p>
        <p className="text-sm font-semibold text-slate-900">¿Tienes alguna duda?</p>
      </div>
    </a>
  );
};

export default VirtualAgent;
