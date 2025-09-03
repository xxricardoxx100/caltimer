"use client";
import { useParams } from "next/navigation";
import dummyCarData from "@/app/components/carros/carData";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Loader from "@/app/components/carros/Loader";

function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative w-full h-56 md:h-96 rounded-lg mb-6 bg-gray-100">
      <div
        className="flex transition-transform ease-out duration-700 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`car-img-${idx}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        ))}
      </div>
      {/* Controls */}
      <button
        type="button"
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-white/30 rounded-full p-2 hover:bg-orange-400 hover:text-white transition-colors"
        onClick={prev}
        aria-label="Previous"
      >
        <MdOutlineArrowBackIos />
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-white/30 rounded-full p-2 hover:bg-orange-400 hover:text-white transition-colors"
        onClick={next}
        aria-label="Next"
      >
        <MdArrowForwardIos />
      </button>
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? "bg-orange-400 p-2"
                : "bg-gray-300 bg-opacity-50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CarDetailsPage() {
  const { id } = useParams();

  const [car, setCar] = useState(null);

  useEffect(() => {
    setCar(dummyCarData.find((c) => String(c.id) === String(id)));
  }, [id]);

  return car ? (
    <div
      data-scroll-section
      className="p-25 px-6 md:px-16 lg:px-24 xl:px-32 mt-16"
    >
      <button
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-gray-700"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
        Back to all Cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* lef car image */}
        <div className="lg:col-span-2">
          <Carousel images={car.images || [car.image]} />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} ● {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: <BsPeopleFill />,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: <BsFillFuelPumpFill />, text: car.fuel_type },
                { icon: <FaCarAlt />, text: car.transmission },
                { icon: <MdLocationPin />, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg text-gray-500"
                >
                  <span className="h-5 mb-2">{icon}</span>
                  <span className="">{text}</span>
                </div>
              ))}
            </div>

            {/* description  */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
          </div>
        </div>
        {/* right side booking */}
        <form className="shadow-lg h-max sticky top-30 rounded-xl p-6 space-y-6 text-gray-500">
          <p className="text-2xl text-black font-bold ">$ {car.price}</p>
          <hr className="border-zinc-400" />
          <button className="w-full bg-orange-300 hover:bg-orange-400 trasnition-all py-3 font-medium text-white rounded-xl cursor-pointer">
            Contactar
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
