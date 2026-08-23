"use client";

import React, { useState, useEffect } from "react";
import { Camera, Phone, Menu, X, Sparkles, CalendarCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STUDIO_INFO } from "@/data/portfolioData";
import AOS from "aos";

interface NavbarProps {
  onOpenEnquiry: () => void;
}
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Framing", href: "#framing" },
  { label: "Our Work", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#cta" },
];

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

  // Lock body scroll and refresh AOS when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (typeof window !== "undefined" && AOS.refresh) {
          AOS.refresh();
        }
      }, 50);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href === "#" ? "hero" : href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else if (href === "#") {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 150);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-2.5 shadow-2xl border-b border-amber-500/20"
            : "bg-linear-to-b from-black/95 via-black/85 to-black/40 backdrop-blur-md py-3 sm:py-4 border-b border-white/10 shadow-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0"
            >
              <div className="relative flex items-center justify-center size-9 sm:size-10 rounded-full bg-amber-500/10 border border-amber-500/30 group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all duration-300 shadow-md">
                <Camera className="size-4 sm:size-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none text-left drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <span className="text-base font-black tracking-[0.5em] text-white uppercase group-hover:text-amber-300 transition-colors">
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
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`group relative px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-zinc-200 ${
                      isActive ? "" : "hover:text-white hover:bg-white/10"
                    } hover:scale-105 active:scale-95 border border-transparent whitespace-nowrap`}
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
                <Phone className="size-3.5 text-amber-400 shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="group relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-black uppercase tracking-wider bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0"
              >
                <Sparkles className="size-3.5 mr-1.5 text-black" />
                <span>Get Free Quote</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:text-white hover:bg-amber-500/20 shadow-lg shadow-amber-500/10 transition-all duration-300 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Navigation Overlay using AOS */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 h-screen max-h-dvh w-screen bg-zinc-950/98 backdrop-blur-3xl flex flex-col justify-start p-5 sm:p-6 overflow-y-auto"
          >
            {/* Overlay Subtle Ambient Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header: Logo & Close Button */}
            <div
              className="flex items-center justify-between relative z-10 pb-4 border-b border-white/10"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center size-8 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <Camera className="size-4 text-amber-400" />
                </div>
                <div className="flex flex-col leading-none text-left">
                  <span className="text-base font-black tracking-[0.5em] text-white uppercase">
                    {STUDIO_INFO.brandFirstName}
                  </span>
                  <span className="text-xs font-bold tracking-[0.15em] text-amber-400 uppercase mt-0.5">
                    {STUDIO_INFO.brandSecondName}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Nav Links (Top-Aligned) */}
            <div className="mt-3 mb-4 py-2 space-y-1.5 relative z-10">
              {NAV_LINKS.map((link, i) => {
                const sectionId = link.href === "#" ? "hero" : link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    data-aos="fade-up"
                    data-aos-delay={i * 50 + 100}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-amber-500/15 text-amber-300 font-bold"
                        : "text-zinc-300 hover:text-white hover:bg-white/5 font-medium"
                    }`}
                  >
                    <span className="text-sm uppercase tracking-wider font-semibold">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Actions (Top-Aligned) */}
            <div className="space-y-2.5 pt-2 relative z-10" data-aos="fade-up" data-aos-delay="450">
              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 text-xs font-semibold text-zinc-200 hover:text-amber-300 transition-colors"
              >
                <Phone className="size-3.5 text-amber-400" />
                <span>Call: {STUDIO_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <CalendarCheck className="size-4 text-black" />
                <span>Get a Free Quote</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
