"use client";

import React, { useState, useEffect } from "react";
import { Camera, MapPin, Phone, Mail, ArrowUp, CalendarCheck } from "lucide-react";
import { STUDIO_INFO } from "@/data/portfolioData";

interface FooterProps {
  onOpenEnquiry: () => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="bg-[#060608] border-t border-zinc-800 text-zinc-400 pt-16 pb-12 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand & Address */}
          <div className="lg:col-span-5 space-y-4">
            {/* Matching Navbar Brand Logo Style */}
            <a href="#" className="inline-flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all duration-300">
                <Camera className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="text-base font-black tracking-[0.5em] text-white uppercase group-hover:text-amber-300 transition-colors">
                  {STUDIO_INFO.brandFirstName}
                </span>
                <span className="text-xs font-bold tracking-[0.15em] text-amber-400 uppercase group-hover:text-amber-300 transition-colors mt-0.5">
                  {STUDIO_INFO.brandSecondName}
                </span>
              </div>
            </a>

            <p className="text-xs text-zinc-400 max-w-md font-light leading-relaxed">
              Professional wedding, pre-wedding, beach post-wedding, outdoor baby shower maternity,
              bridal portrait, and custom photo framing studio based out of {STUDIO_INFO.city},{" "}
              {STUDIO_INFO.state}.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">{STUDIO_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                  className="text-zinc-300 hover:text-amber-300"
                >
                  {STUDIO_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="text-zinc-300 hover:text-amber-300"
                >
                  {STUDIO_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Our Specialties
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Wedding Photography
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Pre-Wedding Shoots
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Post-Wedding Beach Photoshoot
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Baby Shower Outdoor Photos
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Bridal Solo Portraits
                </a>
              </li>
              <li>
                <a href="#framing" className="hover:text-amber-300 transition-colors">
                  Acrylic & Teak Photo Framing
                </a>
              </li>
            </ul>
          </div>

          {/* Booking & Callout */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-amber-500/20 bg-zinc-900/90 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-2">
                Planning a {STUDIO_INFO.currentYear}/{STUDIO_INFO.nextYear} Event?
              </h4>
              <p className="text-xs text-zinc-400 font-light mb-4">
                Get in touch with {STUDIO_INFO.name} for custom dates, resort venue advice, and
                lay-flat album preview packages.
              </p>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Send Event Enquiry</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & Developer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. All Rights Reserved. {STUDIO_INFO.city}
            , {STUDIO_INFO.state}.
          </p>
          <p className="text-zinc-400 font-light">
            Developed by{" "}
            <a
              href="https://mkkcreation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-semibold hover:underline hover:text-amber-300 transition-colors"
            >
              MKK Creation
            </a>
          </p>
        </div>
      </div>

      {/* Reduced Compact Size Sticky Floating Move to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-40 w-9 h-9 rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center border border-amber-300 hover:scale-110 active:scale-95 transition-all duration-300 group"
          title="Move to top"
          aria-label="Move to top"
        >
          <ArrowUp className="w-4 h-4 font-bold group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </footer>
  );
}
