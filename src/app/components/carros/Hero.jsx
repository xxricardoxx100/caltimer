"use client";
import React from "react";
import { useState } from "react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury cars on vent
      </h1>
      <form className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-md md:max-w-2xl bg-white shadow-[0px_8px_20px_rgb(0,0,0,0.1)]">
        <div className="flex flex-col w-full md:flex-row md:items-center gap-4 md:gap-10">
          <div className="flex flex-col w-full md:w-auto items-start gap-2">
            <div className="w-full min-w-[140px] md:w-auto">
              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="" disabled>
                  Ubicacion
                </option>
                <option value="lima">Lima</option>
                <option value="cusco">Cusco</option>
                <option value="arequipa">Arequipa</option>
                <option value="trujillo">Trujillo</option>
              </select>
              {/* <p className="px-1 text-sm text-gray-500">
                {pickupLocation ? pickupLocation : "Ubicación"}
              </p> */}
            </div>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar marca, modelo..."
            className="border border-gray-300 rounded-md p-2 w-full md:w-64 lg:w-80"
          />
          <button className="flex items-center justify-center gap-1 px-6 py-3 w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white rounded-full cursor-pointer">
            {/* Usa Heroicons React */}
            {/* Instala: npm install @heroicons/react */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search
          </button>
        </div>
      </form>
      <img
        src={
          "https://img.freepik.com/foto-gratis/coche-3d-fondo-simple_23-2150796882.jpg?semt=ais_hybrid&w=740&q=80"
        }
        className="max-h-74"
        alt="car"
      />
    </div>
  );
};

export default Hero;
