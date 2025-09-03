"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BsPeopleFill } from "react-icons/bs";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

const CarCard = ({ car }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/car-details/${car.id}`);
        window.scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {car.isAvailable && (
          <p className="absolute top-4 left-4 bg-orange-400 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        )}

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">${car.price}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm text-muted-foreground">
            <BsPeopleFill className="mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <BsFillFuelPumpFill className="mr-2" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <FaCarAlt className="mr-2" />
            <span>{car.transmission} </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MdLocationPin className="mr-2" />
            <span>{car.location} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
