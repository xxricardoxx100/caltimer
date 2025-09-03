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
          title="Featured Vehicules"
          subTitle="Explore our selection of premiun vehicules available for yoour next adventures"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {dummyCarData.slice(0, 6).map((car) => (
          <div key={car.id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
      <Link href="/carros" scroll={true}>
        <button className="flex items-center justify-center gap-2 px-6 py-2 border border-black hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
          Explore all Cars <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default FeacturedSections;
