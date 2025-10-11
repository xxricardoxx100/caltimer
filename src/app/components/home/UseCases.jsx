"use client";
import { motion } from "framer-motion";

const posts = [
  {
    title: "Servicio de asesoría personalizada",
    href: 'https://wa.link/k3nf93',
    category: { name: "Article", href: "#" },
    description:
      "En nuestro servicio de asesoría personalizada, te ofrecemos la oportunidad de recibir orientación experta adaptada a tus necesidades específicas. Ya sea que estés buscando mejorar tu negocio, optimizar tus procesos o desarrollar nuevas estrategias, nuestro equipo de profesionales está aquí para ayudarte a alcanzar tus objetivos. ",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: "/servicios/service-img4.webp",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl: "/servicios/service-img4.webp",
    },
  },
  {
    title: "Servicio de importación de repuestos",
    href: "https://wa.link/a1sqyu ",
    category: { name: "Article", href: "#" },
    description:
      "En nuestro servicio de importación de repuestos, facilitamos el proceso de adquisición de piezas y componentes necesarios para mantener y reparar tus vehículos o maquinaria. Nos encargamos de gestionar todo el proceso de importación, desde la búsqueda de proveedores confiables hasta la logística de envío, asegurando que recibas los repuestos de alta calidad que necesitas en el menor tiempo posible. ",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: "/servicios/comex1.jpg",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl: "/servicios/comex1.jpg",
    },
  },
  {
    title: "Curso de tarjetas de crédito",
    href: "https://wa.link/41xgx9",
    category: { name: "Article", href: "#" },
    description:
      "En nuestro curso de tarjetas de crédito, aprenderás todo lo que necesitas saber para utilizar este instrumento financiero de manera efectiva y responsable. Desde los conceptos básicos hasta las estrategias avanzadas, nuestro curso te proporcionará las herramientas necesarias para maximizar los beneficios de las tarjetas de crédito mientras evitas las trampas comunes asociadas con su uso. ",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: "/servicios/tarjetas-de-creditos.jpg",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl: "/servicios/tarjetas-de-creditos.jpg",
    },
  },
  {
    title: "Curso de importación de repuestos",
    href: "https://wa.link/h0ex1t",
    category: { name: "Article", href: "#" },
    description:
      "En nuestro curso de importación de repuestos, te enseñaremos los fundamentos y las mejores prácticas para importar piezas y componentes de manera eficiente y rentable. Aprenderás sobre la selección de proveedores, la gestión de la cadena de suministro, los aspectos legales y aduaneros, y las estrategias para optimizar costos y tiempos de entrega. ",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: "/servicios/business.jpg",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl: "/servicios/business.jpg",
    },
  },
  {
    title: "Curso de Remates judiciales, antes de remate y cesión",
    href: "https://wa.link/y7p8vy",
    category: { name: "Video", href: "#" },
    description:
      "En nuestro curso de Remates Judiciales, Antes de Remate y Cesión, te proporcionaremos una comprensión completa del proceso legal y financiero involucrado en la adquisición de bienes a través de remates judiciales. Aprenderás sobre las etapas previas al remate, los procedimientos legales, y las estrategias para participar de manera efectiva en estos eventos, así como las implicaciones de la cesión de derechos. ",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Servicio de inspección mecánica de vehículos",
    href: "https://wa.link/geulvh",
    category: { name: "Case Study", href: "#" },
    description:
      "Nuestro servicio de inspección mecánica de vehículos está diseñado para garantizar que tu automóvil esté en óptimas condiciones de funcionamiento. Nuestros técnicos altamente capacitados realizan una evaluación exhaustiva de todos los sistemas y componentes del vehículo, identificando cualquier problema potencial antes de que se convierta en una falla costosa. ",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl: "/servicios/pexels.jpg",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl: "/servicios/pexels.jpg",
    },
  },
];

export default function UseCases() {
  // Variantes para el contenedor (controla el TIMING)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variantes para cada tarjeta (define CÓMO se anima)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-gray-50 px-4 pt-24 pb-32 sm:px-6 lg:px-8 lg:pt-36 lg:pb-40">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto lg:mx-12 max-w-full">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}  
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            NUESTROS SERVICIOS Y CURSOS
          </h2>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16 grid max-w-lg gap-12 lg:max-w-none lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={cardVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a 
                href={post.href}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg h-full block hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-[#F2B66D] p-6">
                  <div className="flex-1">
                    <p className="text-center text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>  
                    <p className="text-justify mt-3 text-base text-black">
                      {post.description}
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}