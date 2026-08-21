import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { STUDIO_INFO } from "@/data/portfolioData";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${STUDIO_INFO.name} | Professional Wedding & Event Photography Studio`,
  description:
    `Official portfolio for ${STUDIO_INFO.name}, ${STUDIO_INFO.city}, ${STUDIO_INFO.state}. Premium traditional wedding photography, post-wedding beach shoots, outdoor baby shower maternity photos, bridal portraits, and custom Ultra-HD acrylic photo framing. Serving ${STUDIO_INFO.region} since ${STUDIO_INFO.establishedYear}.`,
  keywords: [
    STUDIO_INFO.name,
    `Wedding Photography ${STUDIO_INFO.city}`,
    `Pre-wedding Photoshoot ${STUDIO_INFO.state}`,
    "Post-wedding Beach Shoot",
    "Baby Shower Outdoor Photos",
    "Bridal Portraits",
    `Photo Framing ${STUDIO_INFO.city}`,
    "Acrylic Photo Prints",
    "Candid Wedding Photographer",
    `${STUDIO_INFO.state} Wedding Photographer`,
    `Best Photography Studio ${STUDIO_INFO.region}`,
  ],
  openGraph: {
    title: `${STUDIO_INFO.name} | Professional Wedding Studio`,
    description:
      `Premium wedding, pre-wedding & baby shower photography with custom photo framing. Based in ${STUDIO_INFO.city}, ${STUDIO_INFO.state}.`,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-amber-400 selection:text-black"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
