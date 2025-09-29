import Image from "next/image";

const incentives = [
  {
    name: "Servicio de Grúa",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/1048/1048318.png",
    description:
      "Ofrecemos servicio de grúa rápido y seguro para trasladar tu vehículo donde lo necesites.",
  },
  {
    name: "Servicio Mecánico",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
    description:
      "Contamos con mecánicos expertos para solucionar cualquier problema de tu auto, en taller o a domicilio.",
  },
  {
    name: "Ayuda en Subastas",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    description:
      "Te asesoramos y acompañamos en el proceso de compra de vehículos en subastas, facilitando cada paso.",
  },
];

export default function Incentives() {
  return (
    <div className="bg-white">
      <div className="mx-auto lg:mx-12 max-w-full py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-gray-500">
              Ofrecemos soluciones integrales para tu vehículo, desde asistencia
              en carretera hasta apoyo en la compra de autos en subastas.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">
                  <Image
                    className="h-16 w-16"
                    src={incentive.imageSrc}
                    alt={incentive.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
