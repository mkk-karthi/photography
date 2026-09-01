"use client";

import React, { useState, useEffect } from "react";
import { Camera, MapPin, Phone, Mail, ArrowUp, CalendarCheck } from "lucide-react";
import { STUDIO_INFO, FOOTER_CONTENT } from "@/data/portfolioData";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  onOpenEnquiry: () => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contact"
      className="relative text-zinc-500 pt-16 sm:pt-20 pb-12 border-t border-white/5 bg-void"
    >
      {/* Top aperture motif border */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/25 to-transparent" />

      {/* Ambient footer glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212,175,55,0.05) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-white/4">
          {/* Brand & Address */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center size-10 rounded-full bg-amber-500/8 border border-amber-500/25 group-hover:border-amber-400/50 group-hover:bg-amber-500/15 transition-all duration-300">
                <Camera className="size-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 rounded-full bg-amber-500/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none text-center">
                <span className="text-xl font-black tracking-[0.2em] text-white uppercase group-hover:text-amber-200 transition-colors">
                  {STUDIO_INFO.brandFirstName}
                </span>
                <span className="text-xs font-bold tracking-[0.15em] text-amber-400 uppercase group-hover:text-amber-300 transition-colors mt-0.5">
                  {STUDIO_INFO.brandSecondName}
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 max-w-md font-light leading-relaxed">
              {FOOTER_CONTENT.aboutText}
            </p>

            <div className="space-y-2.5 text-xs pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-3.5 text-amber-400/70 shrink-0 mt-0.5" />
                <span className="text-zinc-400">{STUDIO_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-3.5 text-amber-400/70 shrink-0" />
                <a
                  href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                  className="text-zinc-400 hover:text-amber-300 transition-colors"
                >
                  {STUDIO_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-3.5 text-amber-400/70 shrink-0" />
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="text-zinc-400 hover:text-amber-300 transition-colors"
                >
                  {STUDIO_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              {FOOTER_CONTENT.specialtiesList.map((item) => {
                const targetHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={targetHref}
                      className="text-zinc-400 hover:text-amber-300 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Booking Callout */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl border border-amber-500/12 flex flex-col justify-between bg-surface">
            <div>
              <h4 className="text-sm font-bold text-white mb-2">
                {FOOTER_CONTENT.eventPlanningTitle}
              </h4>
              <p className="text-xs text-zinc-400 font-light mb-5 leading-relaxed">
                {FOOTER_CONTENT.eventPlanningSubtitle}
              </p>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 touch-target cursor-pointer"
            >
              <CalendarCheck className="size-4 shrink-0" />
              <span>Request a Free Quote</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & Developer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. All Rights Reserved. {STUDIO_INFO.city}
            , {STUDIO_INFO.state}.
          </p>
          <p className="font-light">
            Developed by{" "}
            <a
              href="https://mkkcreation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500/80 font-semibold hover:underline hover:text-amber-400 transition-colors"
            >
              MKK Creation
            </a>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-5 z-40 size-10 rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center border border-amber-300/30 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          title="Back to top"
          aria-label="Back to top"
          style={{ bottom: "max(24px, env(safe-area-inset-bottom, 24px))" }}
        >
          <ArrowUp className="size-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </footer>
  );
}
