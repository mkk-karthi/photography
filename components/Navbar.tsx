"use client";

import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { Camera, Phone, Menu, X, CalendarCheck, ChevronRight, Aperture } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { STUDIO_INFO } from "@/data/portfolioData";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  onOpenEnquiry: () => void;
}

interface NavLink {
  label: string;
  href: string;
  targetId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", targetId: "hero" },
  { label: "Services", href: "/#services", targetId: "services" },
  { label: "Framing", href: "/#framing", targetId: "framing" },
  { label: "Our Work", href: "/#gallery", targetId: "gallery" },
  { label: "About", href: "/#about", targetId: "about" },
  { label: "Contact", href: "/#cta", targetId: "cta" },
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

// ── Shared Brand Logo component ───────────────────────────────────────────────

// Pure static component — memo prevents re-renders when parent scroll state changes
const BrandLogo = memo(function BrandLogo() {
  return (
    <>
      <div className="relative flex items-center justify-center size-10 rounded-full border border-amber-500/30 bg-amber-500/5 group-hover:border-amber-400/60 group-hover:bg-amber-500/10 transition-all duration-300">
        <Camera className="size-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
        <div
          className="absolute -inset-1.5 rounded-full border border-dashed border-amber-500/15 group-hover:border-amber-500/30 transition-colors"
          style={{ animation: "slowRotate 20s linear infinite" }}
        />
      </div>
      <div className="flex flex-col leading-none text-center drop-shadow-md">
        <span className="text-xl font-black tracking-[0.2em] text-white uppercase group-hover:text-amber-200 transition-colors duration-300">
          {STUDIO_INFO.brandFirstName}
        </span>
        <span className="text-xs font-bold tracking-[0.15em] text-amber-400/90 uppercase group-hover:text-amber-300 transition-colors duration-300 mt-0.5">
          {STUDIO_INFO.brandSecondName}
        </span>
      </div>
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  let pathname = "/";
  let router: any = null;
  try {
    pathname = usePathname() || "/";
    router = useRouter();
  } catch (e) {
    // fallback context
  }

  const isGalleryPage = pathname === "/gallery";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => (isGalleryPage ? "gallery" : "hero"));

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Ref to pause scroll-spy while a programmatic smooth-scroll is in flight.
  // Without this the spy fires for every intermediate section the page drifts
  // through, causing the layoutId pill to sweep across unrelated menu items.
  const isNavigatingRef = useRef(false);

  // Active section tracker on scroll
  useEffect(() => {
    if (isGalleryPage) {
      setActiveSection("gallery");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Skip scroll-spy updates while a click-triggered navigation is in flight
      if (isNavigatingRef.current) return;

      const current = SECTION_IDS.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 250 && bottom >= 150;
      });

      if (current) {
        if (current === "reviews") {
          setActiveSection("about");
        } else {
          setActiveSection(current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGalleryPage]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
      setMobileMenuOpen(false);
      e.preventDefault();

      isNavigatingRef.current = true;
      const lockTimer = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 900);

      if (isGalleryPage) {
        // Jump indicator immediately — router.push triggers a page transition
        // so scroll-spy won't run on the new page until it mounts
        setActiveSection(link.targetId);
        if (router) {
          router.push(link.href);
        } else {
          window.location.href = link.href;
        }
        return () => clearTimeout(lockTimer);
      }

      // On home page: set active immediately so the pill teleports to the
      // target, then lock scroll-spy for 900ms (smooth-scroll duration)
      setActiveSection(link.targetId === "hero" ? "hero" : link.targetId);

      if (link.targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetEl = document.getElementById(link.targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }

      return () => clearTimeout(lockTimer);
    },
    [isGalleryPage, router],
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setMobileMenuOpen(false);
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname],
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-amber-500/18 ${
          scrolled || isGalleryPage
            ? "bg-void/95 backdrop-blur-xl border-b py-3 shadow-2xl"
            : "bg-linear-to-b from-black/98 via-black/80 to-transparent backdrop-blur-xs py-4 border-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group cursor-pointer shrink-0"
            >
              <BrandLogo />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center justify-center gap-1.5 px-4">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.targetId;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap border border-transparent ${
                      isActive
                        ? "text-amber-300 font-bold"
                        : "text-zinc-300 border-transparent hover:text-amber-300 hover:bg-amber-500/15 hover:border-amber-500/40 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        layout="x"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-amber-500/15 border border-amber-500/40 shadow-[0_0_12px_rgba(212,175,55,0.2)] pointer-events-none"
                      />
                    )}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-amber-300 transition-colors px-3 py-2 rounded-full border border-transparent hover:border-amber-500/20 hover:bg-amber-500/5 whitespace-nowrap shrink-0"
              >
                <Phone className="size-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">{STUDIO_INFO.phone}</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="group relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-black uppercase tracking-wider bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <CalendarCheck className="size-4 mr-1.5" />
                <span>Get Free Quote</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="relative flex items-center justify-center size-12 rounded-full text-amber-400 hover:text-white transition-all duration-300 cursor-pointer touch-target"
                aria-label="Toggle Navigation Menu"
              >
                <div className="absolute inset-1.5 rounded-full border border-amber-500/25 hover:border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/10 transition-all duration-300" />
                <Menu className="size-5 relative z-10" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation — Bottom Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-linear-to-b from-surface to-void border-t border-amber-500/20 rounded-t-3xl max-h-[88dvh] pb-[max(20px,env(safe-area-inset-bottom))]"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-zinc-700" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
                  <BrandLogo />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center size-10 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer touch-target"
                  aria-label="Close Navigation Menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="overflow-y-auto flex-1 px-4 pt-2 pb-3">
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.targetId;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 touch-target ${
                          isActive
                            ? "bg-amber-500/10 border border-amber-500/25"
                            : "border border-transparent hover:bg-amber-500/10 hover:border-amber-500/25 active:bg-white/10"
                        }`}
                      >
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-amber-300" : "text-zinc-200"}`}
                        >
                          {link.label}
                        </span>
                        <ChevronRight
                          className={`size-4 transition-all ${isActive ? "text-amber-400 translate-x-0.5" : "text-zinc-600"}`}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* CTA actions */}
                <div className="space-y-3 mt-4">
                  <a
                    href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl border border-zinc-800 bg-white/3 text-sm font-semibold text-zinc-200 hover:text-amber-300 hover:border-amber-500/20 transition-all touch-target"
                  >
                    <Phone className="size-4 text-amber-400" />
                    <span>Call: {STUDIO_INFO.phone}</span>
                  </a>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnquiry();
                    }}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer touch-target"
                  >
                    <CalendarCheck className="size-5" />
                    <span>Get a Free Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
