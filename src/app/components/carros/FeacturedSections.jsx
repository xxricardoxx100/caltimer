import React from "react";
import Tittle from "./Tittle";
import CarCard from "./CarCard";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import dummyCarData from "./carData";

const FeacturedSections = () => {
  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Tittle
          title="VEHICULOS DISPONIBLES"
          subTitle="Explora nuestra selección de vehículos premium disponibles para tus próximas aventuras."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mt-18">
        {dummyCarData.slice(0, 6).map((car) => (
          <div key={car.id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FeacturedSections;
