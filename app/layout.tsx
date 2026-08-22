import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { STUDIO_INFO, SEO_METADATA } from "@/data/portfolioData";
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
  title: {
    default: SEO_METADATA.titleDefault,
    template: SEO_METADATA.titleTemplate,
  },
  description: SEO_METADATA.description,
  keywords: SEO_METADATA.keywords,
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  authors: [{ name: STUDIO_INFO.name }, { name: "MKK Creation", url: "https://mkkcreation.com" }],
  category: "Photography & Framing Studio",
  openGraph: {
    title: SEO_METADATA.titleDefault,
    description: SEO_METADATA.description,
    type: "website",
    locale: SEO_METADATA.locale,
    siteName: STUDIO_INFO.name,
    images: [
      {
        url: SEO_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: `${STUDIO_INFO.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_METADATA.titleDefault,
    description: SEO_METADATA.description,
    images: [SEO_METADATA.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-amber-400 selection:text-black"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
