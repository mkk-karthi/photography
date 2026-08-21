"use client";

import React, { useState, useEffect } from "react";
import { Camera, Phone, Menu, X, Sparkles, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STUDIO_INFO, NAV_LINKS } from "@/data/portfolioData";

interface NavbarProps {
  onOpenEnquiry: () => void;
}

const SECTION_IDS = [
  "hero",
  "services",
  "framing",
  "gallery",
  "about",
  "reviews",
  "cta",
  "contact",
];

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const current = SECTION_IDS.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 250 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav py-2.5 shadow-2xl border-b border-amber-500/20"
          : "bg-linear-to-b from-black/95 via-black/85 to-black/40 backdrop-blur-md py-3 sm:py-4 border-b border-white/10 shadow-2xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 border border-amber-500/30 group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all duration-300 shadow-md">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col leading-none text-left drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <span className="text-sm sm:text-base font-black tracking-[0.5em] text-white uppercase group-hover:text-amber-300 transition-colors">
                {STUDIO_INFO.brandFirstName}
              </span>
              <span className="text-xs font-bold tracking-[0.15em] text-amber-400 uppercase group-hover:text-amber-300 transition-colors mt-0.5">
                {STUDIO_INFO.brandSecondName}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2.5 relative px-4">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href === "#" ? "hero" : link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group relative px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-zinc-200 ${
                    isActive ? "" : "hover:text-white hover:bg-white/10"
                  } hover:border hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 border border-transparent whitespace-nowrap`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] pointer-events-none"
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4 shrink-0">
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-amber-400 transition-colors px-2.5 py-1.5 rounded-full border-transparent whitespace-nowrap shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{STUDIO_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenEnquiry}
              className="group relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-black uppercase tracking-wider bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-black" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-amber-500/60 shadow-md transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090b]/98 border-b border-zinc-800 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/10 hover:border-l-4 hover:border-amber-400 hover:translate-x-1.5 transition-all duration-200 uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 border-t border-zinc-800 flex flex-col gap-3">
                <a
                  href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-amber-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{STUDIO_INFO.phone}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Event Consultation</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
