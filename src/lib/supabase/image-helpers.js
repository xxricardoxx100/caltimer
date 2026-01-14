// Toggle to use Supabase image transformations. Set NEXT_PUBLIC_SUPABASE_TRANSFORM=true to enable.
const transformEnabled =
  typeof process !== "undefined" &&
  process.env?.NEXT_PUBLIC_SUPABASE_TRANSFORM === "true";

// Helper to build optimized Supabase render URLs for images
export const buildOptimizedImageUrl = (
  url,
  { width = 800, quality = 70, format = "webp" } = {}
) => {
  if (!url || typeof url !== "string") return url;

  // If transforms are not explicitly enabled, return original URL to avoid 400s
  if (!transformEnabled) return url;

  try {
    const parsed = new URL(url);
    const isSupabaseStorage =
      parsed.hostname.includes(".supabase.co") &&
      parsed.pathname.includes("/storage/v1/object/public/");

    if (!isSupabaseStorage) return url;

    // Switch to render endpoint to request resized/compressed asset
    parsed.pathname = parsed.pathname.replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/"
    );

    if (width) parsed.searchParams.set("width", String(width));
    if (quality) parsed.searchParams.set("quality", String(quality));
    if (format) parsed.searchParams.set("format", format);

    return parsed.toString();
  } catch (err) {
    console.warn("⚠️ No se pudo optimizar la URL de imagen", err);
    return url;
  }
};

