import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";

const backgroundImages = [
  "/general/compramos2.png",
  "/general/bannersubasta.png",
  "/general/bannergrupal.jpg",
];

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/jeancalderonsubastas?locale=es_LA",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Tiktok",
      href: "https://www.tiktok.com/@jeancalderonsubastas?is_from_webapp=1&sender_device=pc",
      icon: (props) => <FaTiktok className="h-5 w-5" {...props} />,
    },
  ],
};

function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <div className="relative min-h-[52vh] overflow-hidden bg-gradient-to-br from-[#1a2436] via-[#212c42] to-[#2a3650] pt-20">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-[#F29F05]/18 blur-[120px]" />
          <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#9fb4ff]/18 blur-[150px]" />
        </div>
        <div className="relative z-10 px-6 lg:px-10 py-8 lg:py-10 min-h-[52vh]">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="grid items-center gap-50 lg:gap-24 lg:grid-cols-[minmax(0,3.1fr)_minmax(0,8.9fr)]">
              <div className="w-full max-w-[500px] rounded-3xl border border-white/10 bg-black/45 p-6 sm:p-8 backdrop-blur-xl shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)]">
                <p className="text-[11px] uppercase tracking-[0.26em] text-orange-200/90">
                  Caltimer Group
                </p>
                <h1 className="mt-3 text-[28px] sm:text-[34px] lg:text-[35px] font-semibold tracking-tight text-white">
                  Seguridad y confianza en cada operación
                </h1>
                <p className="mt-4 text-[13px] sm:text-[14px] text-white/80 leading-6">
                  Servicios integrales para compra, venta y subastas con procesos claros,
                  respaldo legal y atención personalizada.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/subasta"
                    className="inline-flex items-center justify-center rounded-xl bg-[#F29F05] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d98904]"
                  >
                    Ver subastas
                  </Link>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
                  >
                    Conocer servicios
                  </Link>
                </div>

                <div className="mt-8 flex items-center gap-4 text-white/80">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-white/60 hover:text-white"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative h-[360px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_45px_130px_-80px_rgba(0,0,0,0.95)] lg:ml-20">
                {backgroundImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt="Imagen destacada"
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Header;