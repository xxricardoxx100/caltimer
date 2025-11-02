import { supabase } from "./server.js"; // Usa client.js para el cliente

const generateUniquePath = (index = 0, extension = "") => {
  const globalCrypto =
    typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  const baseId =
    globalCrypto && typeof globalCrypto.randomUUID === "function"
      ? globalCrypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `cars/${baseId}-${index}${extension ? `.${extension}` : ""}`;
};

const getFileExtension = (file) => {
  if (!file) return "";
  const fromName = file.name?.split?.(".")?.pop?.();
  if (fromName && fromName !== file.name) return fromName;
  const fromType = file.type?.split?.("/")?.pop?.();
  return fromType || "jpg";
};

export const carService = {
  async getCars() {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("posted_at", { ascending: false });
    if (error) {
      console.error("Error fetching cars:", error);
      return [];
    }
    return data;
  },

  async getCarById(id) {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching car by ID:", error);
      return null;
    }
    return data;
  },

  async getCarByLocation(location) {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("location", location)
      .order("posted_at", { ascending: false });
    if (error) {
      console.error("Error fetching cars by location:", error);
      return [];
    }
    return data;
  },

  async getCarsWithFilters({
    location,
    searchQuery,
    selectedBrands,
    isAutomatic,
    priceRange,
  }) {
    let query = supabase.from("cars").select("*");

    if (location && location !== "All") query = query.eq("location", location);

    if (searchQuery)
      query = query.or(
        `brand.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%`
      );

    if (selectedBrands && selectedBrands[0] !== "All Brand")
      query = query.in("brand", selectedBrands);

    if (isAutomatic) query = query.eq("transmission", "Automática");

    if (priceRange)
      query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);

    // Siempre ordenar por fecha de creación descendente (más recientes primero)
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching cars with filters:", error);
      return [];
    }
    return data;
  },
  async getImagesByCarId(carId) {
    const { data, error } = await supabase
      .from("car_images")
      .select("*")
      .eq("car_id", carId);
    if (error) {
      console.error("Error fetching images by car ID:", error);
      return [];
    }
    return data;
  },

  async uploadCarImages(photos = []) {
    if (!Array.isArray(photos) || !photos.length) return [];

    const bucket = "carimages";
    const uploads = await Promise.all(
      photos.map(async (photo, index) => {
        if (photo?.remoteUrl) return photo.remoteUrl;
        if (!photo?.file) {
          if (typeof photo?.url === "string" && photo.url.startsWith("http")) {
            return photo.url;
          }
          return null;
        }

        const extension = getFileExtension(photo.file);
        const filePath = generateUniquePath(index, extension);
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, photo.file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(filePath);

        return publicUrl || null;
      })
    );

    return uploads.filter(Boolean);
  },

  async createCarListing(carPayload, imageUrls = []) {
    try {
      const { data: insertedCar, error } = await supabase
        .from("cars")
        .insert([carPayload])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const sanitizedImageUrls = Array.isArray(imageUrls)
        ? imageUrls.filter(Boolean)
        : [];

      if (sanitizedImageUrls.length) {
        const imagesPayload = sanitizedImageUrls.map((url) => ({
          car_id: insertedCar.id,
          image_url: url,
        }));

        const { error: imageError } = await supabase
          .from("car_images")
          .insert(imagesPayload);

        if (imageError) {
          console.error("Error inserting car images:", imageError);
        }
      }

      return insertedCar;
    } catch (err) {
      console.error("Error creating car listing:", err);
      throw err;
    }
  },

  async getKeysAuth() {
    const { data, error } = await supabase.from("keys").select("*");
    if (error) {
      console.error("Error fetching auth keys:", error);
      return [];
    }
    return data;
  },

  async updateCarById(id, updatedFields) {
    const { data, error } = await supabase
      .from("cars")
      .update(updatedFields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating car:", error);
      return null;
    }

    return data;
  },
};
