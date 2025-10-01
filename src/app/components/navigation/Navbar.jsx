"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link";
import DotLoader from "react-spinners/DotLoader";

const solutions = [
  {
    name: "Carros",
    description: "Compra y venta de vehículos",
    href: "/carros",
  },
  {
    name: "Inmobiliaria",
    description: "Compra y venta de propiedades",
    href: "/inmobiliaria",
  },
  {
    name: "Servicios",
    description: "Servicios complementarios",
    href: "/servicios",
  },
  
  {
    name: "Contacto",
    description: "Contáctanos",
    href: "/contacto",
  },
];

function Navbar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
    function scrollFunction() {
      if (document.getElementById("navbar")) {
        if (
          document.body.scrollTop > 70 ||
          document.documentElement.scrollTop > 70
        ) {
          document.getElementById("navbar").classList.add("shadow-navbar");
          document.getElementById("navbar").classList.add("bg-orange-50");
        } else {
          document.getElementById("navbar").classList.remove("shadow-navbar");
          document.getElementById("navbar").classList.remove("bg-orange-50");
        }
      }
    }
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      data-scroll
      data-scroll-id="hey"
      id="navbar"
      className="w-full py-6 top-0 transition duration-300 ease-in-out z-40 fixed"
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
                className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://wa.me/51928430066?text=Solicito informacion, vengo de la pagina web"
              className="inline-flex ml-12 items-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              WhatsApp
              <DotLoader
                className="ml-3 -mr-1 h-5 w-5"
                loading={loading}
                size={20}
                color="#f2f2f2"
              />
            </Link>
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
              <XMarkIcon className="h-8 w-8 text-gray-900" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-gray-900" />
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
                href="https://wa.me/51928430066?text=Solicito informacion, vengo de la pagina web"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                WhatsApp
                <DotLoader
                  className="ml-3 -mr-1 h-5 w-5"
                  loading={loading}
                  size={20}
                  color="#f2f2f2"
                />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
