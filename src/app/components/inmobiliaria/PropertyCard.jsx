"use client";
import { useRouter } from "next/navigation";
import { MdLocationPin } from "react-icons/md";
import { FaHome, FaBed, FaBath } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/property-details/${property.id}`);
        window.scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.deliveryStatus && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-sm font-medium">
            {property.deliveryStatus}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {property.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MdLocationPin className="mr-1 text-gray-500" />
            <span>{property.address}</span>
          </div>
          <p className="text-gray-600 text-sm">
            M2 desde {property.minArea} m²
          </p>
        </div>

        <div className="mb-4">
          <p className="text-orange-500 font-semibold text-lg">
            {property.district}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-900">
            <span className="text-lg font-bold"> {property.price}</span>
          </div>
        </div>

        {property.features && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-gray-600">
            {property.features && (
              <div className="flex items-center text-sm">
                <FaHome className="mr-1 text-gray-500" />
                <span>{property.features}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
