  "use client";
  import { useParams } from "next/navigation";
  import sampleProperties from "@/app/components/inmobiliaria/propertyData";
  import { useEffect, useState } from "react";
  import { MdAttachMoney } from "react-icons/md";
  import { LuMapPinned } from "react-icons/lu";
  import { MdHome } from "react-icons/md";
  import { FaHandHoldingUsd } from "react-icons/fa";
  import HeroSlide from "@/app/components/inmobiliaria/HeroSlide";

  export default function PropertyDetailsPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
      setProperty(sampleProperties.find((p) => String(p.id) === String(id)));
    }, [id]);

    return property ? (
      <div className="mt-25">
        {/* Image Section with Overlay */}
        <div className="overflow-hidden relative w-full h-[60vh] md:h-[80vh]">
          <div className="flex transition-transform ease-out duration-700 h-full">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              className="w-full h-full object-cover flex-shrink-0"
              style={{ minWidth: "100%", minHeight: "100%" }}
            />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 p-6 text-white ml-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {property.name}
              </h1>
              <p className="text-lg md:text-xl font-medium mb-4">
                {property.district}
              </p>

              {/* Delivery Status Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md font-medium">
                <MdHome className="w-4 h-4" />
                {property.deliveryStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="bg-black text-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Section */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <MdAttachMoney className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-orange-400 font-semibold text-lg mb-1">
                Precio desde:
              </h3>
              <p className="text-xl font-bold">{property.price}</p>
              <p className="text-sm text-gray-300 mt-1">
                *Precio referencial por {property.minArea} m² dpto 1006
              </p>
            </div>

            {/* Financing Section */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <FaHandHoldingUsd className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-orange-400 font-semibold text-lg mb-1">
                Financiado por
              </h3>
              <p className="text-xl font-bold"></p>
            </div>

            {/* Location Section */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <LuMapPinned className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-orange-400 font-semibold text-lg mb-1">
                Ubicación
              </h3>
              <p className="text-lg font-medium">{property.address}</p>
              <p className="text-sm text-gray-300">{property.district}</p>
            </div>
          </div>
        </div>
        <section className="bg-white py-16 px-4 mt-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-25 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  {property.sectionTitle}
                </h2>

                <div className="space-y-4 text-gray-700 text-justify">
                  {property.description?.map((desc, idx) => (
                    <p key={idx} className="text-x leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              <div className="relative w-full max-h-[600px] overflow-hidden">
                {property.mediaType === "video" ? (
                  <video
                    src={property.image2}
                    controls
                    className="w-full h-[600px] object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <img
                    src={property.image2 || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        <HeroSlide images={property.moreImages} />
      </div>
    ) : (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Inmobiliaria no encontrada</h2>
      </div>
    );
  }
