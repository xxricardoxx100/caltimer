const vehicularTestimonials = [
  {
    name: "Nefi Rodriguez",
    detail: "Chevrolet Prisma 2020",
    location: "Lima",
    image: "/testimonios/1.jpeg",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Luis A.",
    detail: "Chevrolet Sail 2016",
    location: "Lima",
    image: "/testimonios/2.png",
  },
  {
    name: "Maria P.",
    detail: "Ram v700 2021",
    location: "Lima",
    image: "/testimonios/3.jpeg",
  },
  {
    name: "Roger R.",
    detail: "Kia Cerato",
    location: "Lima",
    image: "/testimonios/4.png",
  },
  {
    name: "Paul M.",
    detail: "Brilliance",
    location: "Lima",
    image: "/testimonios/5.png",
  },
  {
    name: "Richard P.",
    detail: "Toyota Hilux 2023",
    location: "Cusco",
    image: "/testimonios/6.png",
  },
  {
    name: "Angel V.",
    detail: "Kia Rio 2018",
    location: "Lima",
    image: "/testimonios/7.png",
  },
  {
    name: "Raul V.",
    detail: "Hyundai Accent 2016",
    location: "Lima",
    image: "/testimonios/8.png",
  },
];

const realEstateTestimonials = [
  {
    name: "Familia V.",
    location: "Lima",
    image: "/testimonios-inmobiliarios/1.png",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Claudia M.",
    location: "Arequipa",
    image: "/testimonios-inmobiliarios/2.png",
  },
  {
    name: "Luis F.",
    location: "Cusco",
    image: "/testimonios-inmobiliarios/3.png",
  },
  {
    name: "Ana P.",
    location: "Trujillo",
    image: "/testimonios-inmobiliarios/4.png",
  },
  {
    name: "Jose R.",
    location: "Lima",
    image: "/testimonios-inmobiliarios/5.png",
  },
  {
    name: "Lina S.",
    location: "Ica",
    image: "/testimonios-inmobiliarios/6.png",
  },
  {
    name: "Carlos T.",
    location: "Piura",
    image: "/testimonios-inmobiliarios/7.png",
  },
  {
    name: "Paola G.",
    location: "Chiclayo",
    image: "/testimonios-inmobiliarios/8.png",
  },
  {
    name: "Paola G.",
    location: "Chiclayo",
    image: "/testimonios-inmobiliarios/9.png",
  },
  {
    name: "Paola G.",
    location: "Chiclayo",
    image: "/testimonios-inmobiliarios/10.png",
  },
];

function TestimonialsGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[180px]">
      {items.map((item) => (
        <figure
          key={item.name}
          className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${
            item.className || ""
          }`}
        >
          <div className="relative h-full w-full">
            <img
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              src={item.image}
              alt={`Foto de ${item.name}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          </div>
          <figcaption className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-xs text-white/75">
              {item.detail} · {item.location}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative overflow-hidden bg-[#141915] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#223127,_#111311_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200/70">
            Testimonios
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Historias de nuestra comunidad
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Cada imagen es un logro personal. Las fotos de los miembros de nuestra comunidad que
            ya confiaron en nosotros y muestran su historia con orgullo.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-2xl font-semibold text-white">Exitos vehiculares</h3>
            <p className="text-sm text-white/60">
              Historias reales de miembros que ya tienen su auto.
            </p>
          </div>
          <div className="mt-6">
            <TestimonialsGrid items={vehicularTestimonials} />
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-2xl font-semibold text-white">Exitos inmobiliarios</h3>
            <p className="text-sm text-white/60">
              Clientes que lograron su hogar o inversion ideal.
            </p>
          </div>
          <div className="mt-6">
            <TestimonialsGrid items={realEstateTestimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
