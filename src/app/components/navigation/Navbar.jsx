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
    name: "Préstamos",
    description: "Préstamos con garantía vehicular",
    href: "/prestamos",
  },
  {
    name: "Eventos",
    description: "Próximos eventos y actividades",
    href: "/eventos",
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
            {solutions.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg inline-flex font-medium leading-6 text-[#002060] border-b-2 border-[#c06500] hover:scale-110 hover:text-[#E36C09] hover:border-[#E36C09]transition-all duration-300 ease-in-out mx-4"
              >
                {item.name}
              </Link>
            ))}
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
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
