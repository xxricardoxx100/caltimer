import { useState, useEffect, useCallback } from "react";
import { carService } from "@/lib/supabase/services";

export const useCarDetails = (carId, cars = []) => {
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoizar las funciones del servicio para evitar cambios de referencia
  const getCarById = useCallback((id) => carService.getCarById(id), []);

  const getImagesByCarId = useCallback(
    (id) => carService.getImagesByCarId(id),
    []
  );

  // Función para buscar el carro en la caché local
  const findCarInCache = useCallback(
    (id) => {
      const numericId = Number(id);
      const searchId = Number.isNaN(numericId) ? id : numericId;

      // Buscar por coincidencia estricta
      let found = cars.find((c) => c.id === searchId);

      // Si no se encuentra, intentar con conversión a string
      if (!found) {
        found = cars.find((c) => String(c.id) === String(id));
      }

      return found;
    },
    [cars]
  );

  // Función principal para obtener los datos del carro
  const fetchCarData = useCallback(
    async (id) => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Intentar encontrar en caché primero
        let carData = findCarInCache(id);

        // Si no está en caché, obtener de la API
        if (!carData) {
          const numericId = Number(id);
          const searchId = Number.isNaN(numericId) ? id : numericId;
          carData = await getCarById(searchId);
        }

        if (!carData) {
          throw new Error("Carro no encontrado");
        }

        setCar(carData);

        // Obtener imágenes del carro
        const carImages = await getImagesByCarId(carData.id);
        let imageUrls = Array.isArray(carImages)
          ? carImages.map((img) => img.image_url)
          : [];

        // Procesar las imágenes para incluir la imagen principal
        if (carData.image && !imageUrls.includes(carData.image)) {
          imageUrls = [carData.image, ...imageUrls];
        } else if (carData.image) {
          imageUrls = [
            carData.image,
            ...imageUrls.filter((url) => url !== carData.image),
          ];
        }

        setImages(imageUrls);
      } catch (err) {
        console.error("Error fetching car data:", err);
        setError(err.message || "Error al cargar los datos del carro");
      } finally {
        setLoading(false);
      }
    },
    [findCarInCache, getCarById, getImagesByCarId]
  );

  // Effect para obtener los datos cuando cambie el ID
  useEffect(() => {
    if (carId) {
      fetchCarData(carId);
    }
  }, [carId, fetchCarData]);

  // Función para refrescar los datos
  const refresh = useCallback(() => {
    if (carId) {
      fetchCarData(carId);
    }
  }, [carId, fetchCarData]);

  return {
    car,
    images,
    loading,
    error,
    refresh,
    setCar, // Exponer setCar para el contexto
  };
};
