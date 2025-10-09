import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaTiktok } from "react-icons/fa";


const backgroundImages = [
  "https://www.peruautos.pe/wp-content/uploads/2024/05/El-Auge-de-los-Carros-Deportivos-en-Lima-Una-Pasion-en-Crecimiento-peru-autos.pe-el-portal-oficial-de-compra-y-venta-de-autos-en-peru.jpg",
  "/soluto/1.jfif", 
  "/Ramv700/1.jpg",
];	

const navigation = {
  support: [{ name: "Contacto", href: "/contacto" }],
  company: [
    { name: "Casos", href: "/casos" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Carreras", href: "/carreras" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
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
      icon: (props) => (
        <FaTiktok className="h-7 w-7" />
      ),
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
    }, 3000); // Cambia cada 5 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      {/* 1. SE CAMBIA h-screen por una altura (ej. h-96, h-128, o un valor de padding grande) */}
      {/* Usamos padding vertical grande (py-40) para darle altura, además de 'relative' y 'overflow-hidden' */}
      <div className="relative py-85 overflow-hidden"> 
        
        {/* Capa para las imágenes de fondo con transición */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
        ))}

        {/* Capa de overlay oscuro para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black opacity-40" /> 
        
        {/* Contenido del header (texto, typewriter, botones, etc.) */}
        {/* 2. El contenido ahora solo tiene el padding lateral (px-6 lg:px-8) y se centra a sí mismo */}
        <div className="relative z-10 px-6 lg:px-8 h-full flex items-center"> 
          <div className="mx-auto max-w-full xl:mx-12">
            <div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight pb-8 sm:text-7xl text-white"> 
                  Caltimer Group <span> </span>
                  <Typewriter
                    words={["Confianza", "Calidad", "Seguridad"]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={120}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </h1>
                <p className="mt-8 text-2xl max-w-3xl leading-8 text-white"> 
                  Impulsa hoy tu negocio con uno de nuestros servicios{" "}
                </p>
                {/* Íconos sociales ajustados para esta nueva altura */}
                <div className="absolute bottom-[-130px] left-0 flex space-x-6 xl:mx-20 mx-6"> 
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-gray-200"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-8 w-8" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Header;