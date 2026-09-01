"use client";

import React, { useEffect } from "react";
import PortfolioGallery from "@/components/Gallery/PortfolioGallery";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GalleryPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 50 });
  }, []);

  return (
    <main className="min-h-screen bg-void overflow-x-hidden">
      <div className="pt-20">
        <PortfolioGallery />
      </div>
    </main>
  );
}
