"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
import FramingShowcase from "@/components/Services/FramingShowcase";
import PortfolioGallery from "@/components/Gallery/PortfolioGallery";
import AboutStudio from "@/components/About/AboutStudio";
import StatsSection from "@/components/StatsSection";
import ReviewsSection from "@/components/Testimonials/ReviewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/Enquiry/EnquiryModal";
import PageLoader from "@/components/PageLoader";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>(undefined);
  const [initialQuote, setInitialQuote] = useState<number | undefined>(undefined);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  const handleOpenEnquiry = (service?: string, quote?: number) => {
    setInitialService(service);
    setInitialQuote(quote);
    setEnquiryOpen(true);
  };

  const handleOrderFrame = (frameName: string, sizeLabel: string, calculatedPrice: number) => {
    handleOpenEnquiry(`Photo Framing Order (${frameName} - ${sizeLabel})`, calculatedPrice);
  };

  return (
    <main className="min-h-screen bg-[#09090b]">
      {/* Cinematic Studio Preloader */}
      <PageLoader />

      {/* Sticky Blur Navbar */}
      <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Hero — Full Viewport Slideshow */}
      <Hero onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Achievement Stats Counter */}
      <StatsSection />

      {/* Photography Services */}
      <ServicesSection onSelectService={(serviceTitle) => handleOpenEnquiry(serviceTitle)} />

      {/* Custom Framing & Prints Showcase */}
      <FramingShowcase onOrderFrame={handleOrderFrame} />

      {/* Filterable Portfolio Gallery & Lightbox */}
      <PortfolioGallery />

      {/* About the Studio */}
      <AboutStudio />

      {/* Client Testimonials */}
      <ReviewsSection />

      {/* Booking CTA & Contact */}
      <CTASection onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Footer */}
      <Footer onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Global Consultation & Booking Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialService={initialService}
        initialQuote={initialQuote}
      />
    </main>
  );
}
