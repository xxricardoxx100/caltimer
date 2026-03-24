const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const allowedImageQualities = [60, 75, 80, 85, 95];
const supabaseHost = (() => {
	try {
		return supabaseUrl ? new URL(supabaseUrl).hostname : undefined;
	} catch (err) {
		console.warn("No se pudo obtener el hostname de SUPABASE_URL", err);
		return undefined;
	}
})();

const imageConfig = supabaseHost
	? {
			remotePatterns: [
				{
					protocol: "https",
					hostname: supabaseHost,
					pathname: "/storage/**",
				},
			],
			formats: ["image/avif", "image/webp"],
			qualities: allowedImageQualities,
		}
	: {
			// Si no hay URL de Supabase en el entorno, no optimizamos para evitar 400
			unoptimized: true,
			qualities: allowedImageQualities,
		};

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: imageConfig,
};

export default nextConfig;
