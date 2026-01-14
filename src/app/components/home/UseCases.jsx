"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const posts = [
  {
    title: "Servicio de asesoría personalizada",
    href: 'https://wa.link/k3nf93',
    kind: "Servicio",
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
    href: "https://wa.link/a1sqyu",
    kind: "Servicio",
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
    kind: "Curso",
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
    kind: "Curso",
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
    kind: "Curso",
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
    kind: "Servicio",
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
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!selectedPost) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === "Todos") return posts;
    return posts.filter((p) => p.kind === activeFilter);
  }, [activeFilter]);

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
      scale: 0.95,
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
    <section className="relative overflow-hidden bg-slate-50 px-4 pt-14 pb-16 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(circle_at_25%_20%,rgba(245,158,11,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(15,23,42,0.10),transparent_38%),radial-gradient(circle_at_40%_90%,rgba(245,158,11,0.14),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22rem] text-slate-600">Servicios y cursos</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Elige lo que necesitas, nosotros te ayudamos
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Contactanos y prueba nuestros servicios. Respuesta directa por WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { key: "Todos", label: "Todos" },
              { key: "Servicio", label: "Servicios" },
              { key: "Curso", label: "Cursos" },
            ].map((f) => {
              const active = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  className={
                    "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-400/60 " +
                    (active
                      ? "bg-slate-900 text-white"
                      : "bg-white/80 text-slate-700 ring-1 ring-slate-200 hover:bg-white")
                  }
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <motion.aside
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-slate-200 backdrop-blur">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Atención rápida
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">¿No sabes cuál elegir?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Te orientamos en menos de 1 minuto. Cuéntanos tu objetivo y te recomendamos el servicio o curso ideal.
              </p>
              <a
                href="https://wa.link/k3nf93"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              >
                Escribir por WhatsApp
                <span aria-hidden>↗</span>
              </a>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold text-slate-500">Items</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">{filteredPosts.length}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold text-slate-500">Respuesta</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">Rápida</p>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            className="lg:col-span-8"
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.title}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-amber-500 via-amber-400 to-transparent opacity-80" />
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 sm:h-20 sm:w-28">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                          {post.kind}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">Duración: {post.readingTime}</span>
                      </div>
                      <h3
                        className="mt-2 text-base font-extrabold leading-snug text-slate-900 sm:text-lg line-clamp-2"
                        title={post.title}
                      >
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPost(post)}
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                      >
                        Ver detalles
                      </button>
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {selectedPost ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Detalles del servicio"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedPost(null);
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-500">{selectedPost.kind} · Duración: {selectedPost.readingTime}</p>
                <h4 className="mt-1 text-lg font-extrabold leading-snug text-slate-900">{selectedPost.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-[160px_1fr] sm:items-start">
                <div className="relative h-36 w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 sm:h-40 sm:w-40">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-slate-700">{selectedPost.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={selectedPost.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    >
                      Hablar por WhatsApp
                      <span aria-hidden className="ml-2">↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedPost(null)}
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}