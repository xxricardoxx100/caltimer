const reviews = [
  {
    name: "Juan Pérez",
    rating: 5,
    comment:
      "Excelente servicio de grúa, llegaron muy rápido y el trato fue muy profesional. ¡Recomendado!",
    date: "04 Sep 2025",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "María López",
    rating: 4,
    comment:
      "El mecánico solucionó el problema de mi auto en mi casa. Muy práctico y eficiente.",
    date: "28 Ago 2025",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Carlos Ramírez",
    rating: 5,
    comment:
      "Me ayudaron en todo el proceso de la subasta, muy atentos y profesionales.",
    date: "15 Ago 2025",
    imageUrl: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

function StarRating({ rating }) {
  return (
    <span className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.4 15,17.2 9.9,14.1 4.8,17.2 6.1,11.4 1.6,7.3 7.5,6.6 " />
        </svg>
      ))}
    </span>
  );
}

export default function BlogList() {
  return (
    <div className="bg-[#F8FAFC] px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto lg:mx-12 max-w-lg divide-y-2 divide-gray-200 lg:max-w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Opiniones de nuestros clientes
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Conoce la experiencia de quienes ya confiaron en nuestros servicios.
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {reviews.map((review, idx) => (
            <div key={idx} className="border rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">

                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-900">
                    {review.name}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-700 mb-2">"{review.comment}"</p>
              <p className="text-sm text-gray-400">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
