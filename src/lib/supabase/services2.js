import { supabase } from "./server.js"; // Usa client.js para el cliente

const generateUniquePath = (index = 0, extension = "") => {
  const globalCrypto =
    typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  const baseId =
    globalCrypto && typeof globalCrypto.randomUUID === "function"
      ? globalCrypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `inmobiliarias/${baseId}-${index}${extension ? `.${extension}` : ""}`;
};

const getFileExtension = (file) => {
  if (!file) return "";
  const fromName = file.name?.split?.(".")?.pop?.();
  if (fromName && fromName !== file.name) return fromName;
  const fromType = file.type?.split?.("/")?.pop?.();
  return fromType || "jpg";
};

export const InmobiliariaService = {
  async getInmobiliaria() {
    const { data, error } = await supabase
      .from("inmobiliaria")
      .select("*")
    if (error) {
      console.error("Error fetching inmobiliaria:", error);
      return [];
    }
    return data;
  },

  async getInmobiliariaById(id) {
    const { data, error } = await supabase
      .from("inmobiliaria")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching inmobiliaria by ID:", error);
      return null;
    }
    return data;
  },

  async getImagesByinmobiliariaId(inmobiliariaId) {
    const { data, error } = await supabase
      .from("inmobiliaria_img")
      .select("*")
      .eq("id_inmobiliaria", inmobiliariaId);
    if (error) {
      console.error("Error fetching images by inmbiliaria ID:", error);
      return [];
    }
    return data;
  },

  async uploadinmobiliariaImages(photos = []) {
    if (!Array.isArray(photos) || !photos.length) return [];

    const bucket = "inmobiliariaimages";
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

  async createinmobiliariaListing(inmobiliariaPayload, imageUrls = []) {
    try {
      const { data: insertedinmobiliaria, error } = await supabase
        .from("inmobiliaria")
        .insert([inmobiliariaPayload])
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
          inmobiliaria_id: insertedinmobiliaria.id,
          image_url: url,
        }));

        const { error: imageError } = await supabase
          .from("inmobiliaria_images")
          .insert(imagesPayload);

        if (imageError) {
          console.error("Error inserting inmobiliaria images:", imageError);
        }
      }

      return insertedinmobiliaria;
    } catch (err) {
      console.error("Error creating inmobiliaria listing:", err);
      throw err;
    }
  },

};
