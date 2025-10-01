import { Typewriter } from "react-simple-typewriter";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
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
        <FaTiktok className="h-7 w-7"/>
      ),
    },
    
    
    
  ],
};
function Header() {
  return (
    <main>
      <div
        className="relative px-6 lg:px-8"
        style={{
          backgroundImage:
            "url('https://www.peruautos.pe/wp-content/uploads/2024/05/El-Auge-de-los-Carros-Deportivos-en-Lima-Una-Pasion-en-Crecimiento-peru-autos.pe-el-portal-oficial-de-compra-y-venta-de-autos-en-peru.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-full xl:mx-12 xl:pt-40 xl:pb-64 lg:pt-40 lg:pb-48 pt-24 pb-12  ">
          <div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight pb-16 sm:text-7xl text-white">
                Caltimer Group <span> </span>
                <Typewriter
                  words={["Confianza", "Calidad", "Seguridad"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  // onLoopDone={handleDone}
                  // onType={handleType}
                />
              </h1>
              <p className="mt-16 text-2xl max-w-3xl leading-8 text-white">
                Impulsa hoy tu negocio con uno de nuestros servicios{" "}
              </p>
              <div className="absolute bottom-0 left-0 flex space-x-6 xl:mx-20 mx-6 mb-10">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 hover:text-gray-800"
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
    </main>
  );
}

export default Header;
