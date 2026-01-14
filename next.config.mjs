const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
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
		}
	: {
			// Si no hay URL de Supabase en el entorno, no optimizamos para evitar 400
			unoptimized: true,
		};

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: imageConfig,
};

export default nextConfig;
