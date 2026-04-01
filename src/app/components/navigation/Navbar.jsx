"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link";

const solutions = [
  {
    name: "Vehiculos",
    description: "Compra y venta de vehículos",
    href: "/carros",
  },
  {
    name: "Inmuebles",
    description: "Compra y venta de propiedades",
    href: "/inmobiliaria",
  },
  {
    name: "Subasta",
    description: "Compra de Vehiculos en subasta",
    href: "/subasta",
  },
  {
    name: "Eventos",
    description: "Próximos eventos y actividades",
    href: "/eventos",
  },
];

const prestamosSubmenu = [
  {
    name: "Calculadora",
    href: "/prestamos/calculadora",
  },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 70;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      data-scroll
      data-scroll-id="hey"
      id="navbar"
      style={{ backgroundColor: '#F8FAFC' }}
      className={`w-full py-4 top-0 transition-all duration-300 ease-in-out z-40 fixed ${scrolled ? 'shadow-lg' : ''}`}
    >
      <div className="px-4 sm:px-6">
        {/* Desktop Navbar */}
        <div className="-ml-4 -mt-2 hidden lg:flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
          <Link href="/" className="ml-4 mt-2">
            <img
              src={"/logo_caltimer.webp"}
              width={140}
              height={140}
              className=""
              alt="Logo"
            />
          </Link>
          <div className="ml-4 mt-2 flex-shrink-0">
            {solutions.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg inline-flex font-medium leading-6 text-[#002060] border-b-2 border-[#c06500] hover:scale-110 hover:text-[#E36C09] hover:border-[#E36C09]transition-all duration-300 ease-in-out mx-4"
              >
                {item.name}
              </Link>
            ))}
            <div className="relative group inline-block mx-4 align-middle">
              <Link
                href="/prestamos"
                className="text-lg inline-flex items-center font-medium leading-6 text-[#002060] border-b-2 border-[#c06500] hover:scale-110 hover:text-[#E36C09] hover:border-[#E36C09] transition-all duration-300 ease-in-out"
              >
                Préstamos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>
              <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible translate-y-2 scale-95 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out z-50">
                <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-[0_12px_35px_rgba(15,23,42,0.15)] ring-1 ring-slate-100/80 py-2">
                  {prestamosSubmenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="mx-2 block rounded-lg px-4 py-2.5 text-sm font-medium text-[#002060] transition-colors duration-150 hover:bg-[#fff3e8] hover:text-[#E36C09]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="-ml-4 -mt-2 lg:hidden flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
          <Link href="/" className="ml-4 mt-2">
            <img
              src={"/logo_caltimer.webp"}
              width={100}
              height={100}
              className=""
              alt="Logo"
            />
          </Link>
          <button
            className="ml-auto mt-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-8 w-8 text-[#002060]" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-[#002060]" />
            )}
          </button>
        </div>
        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl ring-1 ring-gray-900/5 px-4 py-6 absolute top-20 left-0 w-full z-50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {solutions.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/prestamos"
                className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Préstamos
              </Link>
              {prestamosSubmenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:bg-gray-200 px-8 py-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
