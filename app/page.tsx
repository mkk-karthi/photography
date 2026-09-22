"use client";

import React, { useEffect, useCallback } from "react";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
import FramingShowcase from "@/components/Services/FramingShowcase";
import PortfolioGallery from "@/components/Gallery/PortfolioGallery";
import AboutStudio from "@/components/About/AboutStudio";
import StatsSection from "@/components/StatsSection";
import ReviewsSection from "@/components/Testimonials/ReviewsSection";
import CTASection from "@/components/CTASection";
import { useEnquiry } from "@/components/Common/EnquiryContext";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 50 });
  }, []);

  const handleSelectService = useCallback(
    (title: string) => {
      openEnquiry(title);
    },
    [openEnquiry],
  );

  const handleOrderFrame = useCallback(
    (frameName: string, sizeLabel: string, price: number) => {
      openEnquiry(`Photo Framing Order (${frameName} - ${sizeLabel})`, price);
    },
    [openEnquiry],
  );

  return (
    <main className="min-h-screen bg-void overflow-x-hidden relative">
      <Hero onOpenEnquiry={openEnquiry} />
      <StatsSection />
      <ServicesSection onSelectService={handleSelectService} />
      <FramingShowcase onOrderFrame={handleOrderFrame} />
      <PortfolioGallery preview />
      <AboutStudio />
      <ReviewsSection />
      <CTASection onOpenEnquiry={openEnquiry} />
    </main>
  );
}
