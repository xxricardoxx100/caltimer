"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineArrowBackIos, MdArrowForwardIos, MdLocationPin } from "react-icons/md";
import { BsPeopleFill, BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";

import Loader from "@/app/components/carros/Loader";
import { carService } from "@/lib/supabase/services";

function Carousel({ images }) {
  const sanitizedImages = useMemo(
    () => (Array.isArray(images) && images.length ? images.filter(Boolean) : []),
    [images]
  );

  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const prev = () =>
    setCurrent((curr) =>
      curr === 0 ? sanitizedImages.length - 1 : curr - 1
    );
  const next = () =>
    setCurrent((curr) =>
      curr === sanitizedImages.length - 1 ? 0 : curr + 1
    );

  if (!sanitizedImages.length) {
    return (
      <div className="mb-6 flex h-56 w-full items-center justify-center rounded-lg bg-gray-100 md:h-96">
        <span className="text-sm text-neutral-500">
          No hay imágenes disponibles
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-6 h-56 w-full overflow-hidden rounded-lg bg-gray-100 md:h-96">
        <div
          className="flex h-full transition-transform ease-out duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {sanitizedImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`car-img-${idx}`}
              className="h-full w-full flex-shrink-0 cursor-pointer object-contain"
              style={{ minWidth: "100%", minHeight: "100%" }}
              onClick={() => {
                setModalImage(img);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        {sanitizedImages.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/30 p-2 transition-colors hover:bg-orange-400 hover:text-white"
              onClick={prev}
              aria-label="Previous"
            >
              <MdOutlineArrowBackIos />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/30 p-2 transition-colors hover:bg-orange-400 hover:text-white"
              onClick={next}
              aria-label="Next"
            >
              <MdArrowForwardIos />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {sanitizedImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-3 w-3 rounded-full transition-all ${
                    idx === current
                      ? "bg-orange-400 p-2"
                      : "bg-gray-300 bg-opacity-50"
                  }`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={modalImage ?? ""}
            alt="Imagen ampliada"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
}

export default function CarDetailsPage() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const fetchedCar = await carService.getCarById(id);

        if (!fetchedCar) {
          throw new Error("Vehículo no encontrado");
        }

        const fetchedImages = await carService.getImagesByCarId(id);

        if (isMounted) {
          setCar(fetchedCar);
          setImages(
            Array.isArray(fetchedImages)
              ? fetchedImages.map((entry) => entry.image_url).filter(Boolean)
              : []
          );
          setHasError(false);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        if (isMounted) {
          setHasError(true);
          setCar(null);
          setImages([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (id) {
      fetchCar();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError || !car) {
    return (
      <div className="mt-32 flex flex-col items-center gap-4 px-6 text-center text-neutral-600">
        <p className="text-lg font-semibold text-neutral-800">
          No encontramos este vehículo.
        </p>
        <p className="text-sm">
          Verifica el enlace o regresa al listado para continuar explorando.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft />
          Regresar
        </button>
      </div>
    );
  }

  const carouselImages = images.length
    ? images
    : car.image
    ? [car.image]
    : [];

  return (
    <div
      data-scroll-section
      className="mt-16 px-6 py-25 md:px-16 lg:px-24 xl:px-32"
    >
      <button
        className="mb-6 flex cursor-pointer items-center gap-2 text-gray-500 transition hover:text-gray-700"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
        Back to all Cars
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <Carousel images={carouselImages} />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-lg text-gray-500">
                {car.category ?? "Categoría no especificada"} • {car.year ?? "—"}
              </p>
            </div>

            <hr className="my-6 border-borderColor" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  icon: <BsPeopleFill />,
                  text: car.seating_capacity
                    ? `${car.seating_capacity} Asientos`
                    : "Capacidad no disponible",
                },
                {
                  icon: <BsFillFuelPumpFill />,
                  text: car.fuel_type ?? "Combustible no disponible",
                },
                {
                  icon: <FaCarAlt />,
                  text: car.transmission ?? "Transmisión no disponible",
                },
                {
                  icon: <MdLocationPin />,
                  text: car.location ?? "Ubicación no disponible",
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center rounded-lg bg-gray-100 p-4 text-gray-500"
                >
                  <span className="mb-2 h-5">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div>
              <h1 className="mb-3 text-xl font-medium">Descripción:</h1>
              <p className="text-gray-500">
                {car.description ?? "El vendedor no agregó descripción."}
              </p>
            </div>
          </div>
        </div>

        <aside className="sticky top-30 h-max space-y-6 rounded-xl p-6 text-gray-500 shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800">Precio:</h1>

          <p className="text-3xl font-extrabold text-gray-700">
            {car.currency ? `${car.currency} ` : "$ "}
            {car.price ?? "—"}
          </p>

          <div className="space-y-4 border-t pt-6">
            <h3 className="mb-4 text-lg font-bold">Especificaciones</h3>

            <div className="flex justify-between">
              <span className="text-gray-600">Año:</span>
              <span className="font-semibold">{car.year ?? "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Kilometraje:</span>
              <span className="font-semibold">
                {car.mileage ?? car.kilometraje ?? "—"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Transmisión:</span>
              <span className="font-semibold">
                {car.transmission ?? "—"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Combustible:</span>
              <span className="font-semibold">{car.fuel_type ?? "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Puertas:</span>
              <span className="font-semibold">
                {car.seating_capacity ?? "—"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="font-semibold">
                {car.status ?? car.estado ?? "—"}
              </span>
            </div>
          </div>

          <hr className="border-gray-300" />

          <button className="w-full cursor-pointer rounded-xl bg-orange-500 py-3 font-medium text-white transition-all hover:bg-orange-600">
            Contactar
          </button>
        </aside>
      </div>
    </div>
  );
}
