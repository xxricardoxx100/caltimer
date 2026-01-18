// Toggle to use Supabase image transformations. Set NEXT_PUBLIC_SUPABASE_TRANSFORM=true to enable.
const transformEnabled =
  typeof process !== "undefined" &&
  process.env?.NEXT_PUBLIC_SUPABASE_TRANSFORM === "true";

// Helper to build optimized Supabase render URLs for images
export const buildOptimizedImageUrl = (
  url,
  { width = 800, height, quality = 70, format, fit, position } = {}
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
    if (height) parsed.searchParams.set("height", String(height));
    if (quality) parsed.searchParams.set("quality", String(quality));
    if (format) parsed.searchParams.set("format", format);
    if (fit) parsed.searchParams.set("fit", fit);
    if (position) parsed.searchParams.set("position", position);

    return parsed.toString();
  } catch (err) {
    console.warn("⚠️ No se pudo optimizar la URL de imagen", err);
    return url;
  }
};

