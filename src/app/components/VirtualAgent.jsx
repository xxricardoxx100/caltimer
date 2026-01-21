"use client";

const VirtualAgent = () => {
  return (
    <>
      <a
        href="https://wa.link/k3nf93?text=Tengo%20dudas%20sobre%20la%20pagina%20Web,%20quiero%20informacion%20sobre..."
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed left-5 bottom-6 z-50 flex items-center gap-3 rounded-2xl border border-orange-200 bg-white/95 px-4 py-3 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
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

      <a
        href="https://wa.me/51928430066?text=Solicito informacion, vengo de la pagina web"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed right-5 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-7 w-7 fill-current"
        >
          <path d="M19.11 17.69c-.29-.15-1.68-.83-1.94-.92-.26-.1-.45-.15-.64.15-.19.29-.74.92-.9 1.1-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.49h-.55c-.19 0-.49.07-.75.37-.26.29-1 1-1 2.44s1.03 2.83 1.18 3.03c.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
          <path d="M16.04 4.5c-6.34 0-11.5 5.16-11.5 11.5 0 2.02.53 3.99 1.53 5.73L4.5 27.5l5.93-1.54c1.68.92 3.58 1.4 5.61 1.4 6.34 0 11.5-5.16 11.5-11.5 0-6.34-5.16-11.5-11.5-11.5zm0 20.93c-1.82 0-3.58-.49-5.1-1.41l-.37-.22-3.52.91.94-3.43-.24-.38c-.95-1.51-1.45-3.27-1.45-5.1 0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z" />
        </svg>
      </a>
    </>
  );
};

export default VirtualAgent;
