import { Manrope, Playfair_Display } from "next/font/google";

export const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
