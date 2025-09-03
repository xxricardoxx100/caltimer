import React from "react";
import { FaCarAlt } from "react-icons/fa";

export const ImgBanner = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="overflow-hidden relative w-full h-screen">
        <div className="flex transition-transform ease-out duration-700 h-full">
          <img
            src="https://loscoches.com/wp-content/uploads/2021/04/carros-deportivos-potencia.jpg"
            alt="Luxury car on road"
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <p className="text-sm text-black md:text-base font-medium mb-4 tracking-wider uppercase opacity-90">
                4% APR FINANCING FOR UP TO 72 MONTHS
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                PURCHASE YOUR
                <br />
                PERFECT CAR
              </h1>
              <p className="text-lg md:text-xl mb- opacity-90 max-w-2xl mx-auto">
                From sport cars to daily drivers, find premium automobiles that
                match your lifestyle. Verified dealers and competitive pricing
                guaranteed.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-md transition-colors duration-200 inline-flex items-center justify-center mt-8">
                {/* Puedes poner un ícono SVG aquí si lo deseas */}
                <FaCarAlt className="mr-2" />
                VIEW ALL INVENTORY
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
