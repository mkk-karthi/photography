"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Phone,
  Mail,
  MapPin,
  Share2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  STUDIO_INFO,
  CONTACT_CARDS,
  AVAILABILITY_ITEMS,
  CTA_SECTION_TEXT,
} from "@/data/portfolioData";
import type { ContactCard } from "@/data/types";

interface CTASectionProps {
  onOpenEnquiry: () => void;
}

// ── Icon & style maps ─────────────────────────────────────────────────────────

const CONTACT_ICONS: Record<ContactCard["iconName"], React.ReactNode> = {
  Phone: <Phone className="size-5" />,
  Mail: <Mail className="size-5" />,
  MapPin: <MapPin className="size-5" />,
  Share2: <Share2 className="size-5" />,
};

const EXTERNAL_LABELS = new Set(["Instagram", "Studio Location"]);

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function CTASection({ onOpenEnquiry }: CTASectionProps) {
  return (
    <section id="cta" className="relative py-20 sm:py-28 overflow-hidden film-strip-top bg-surface">
      {/* Pulsing aperture rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[320, 480, 640, 820].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-amber-500/4"
            style={{ width: size, height: size }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.16, 0.06] }}
            transition={{
              duration: 5 + i * 1.5,
              delay: i * 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 100%)",
        }}
      />
      <div className="absolute bottom-10 right-10 size-64 rounded-full blur-3xl pointer-events-none bg-amber-500/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-linear-to-br from-card via-elevated to-surface shadow-2xl shadow-black/50 mb-12 sm:mb-16"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-amber-400/60 to-transparent" />

          <div className="p-8 sm:p-12 lg:p-16 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="photo-badge mb-6 inline-flex"
            >
              <Sparkles className="size-3 text-amber-400" />
              <span>
                Serving {STUDIO_INFO.region} Since {STUDIO_INFO.establishedYear}
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight mb-4 leading-tight">
              {CTA_SECTION_TEXT.titlePrefix}{" "}
              <span className="font-serif text-amber-300 italic font-normal">
                {CTA_SECTION_TEXT.titleHighlight}
              </span>{" "}
              <br className="hidden sm:block" />
              {CTA_SECTION_TEXT.titleSuffix}
            </h2>

            <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed mb-8">
              {CTA_SECTION_TEXT.subtitle}
            </p>

            {/* Availability Items */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {AVAILABILITY_ITEMS.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full border border-amber-500/20 text-amber-300 text-[11px] font-medium bg-amber-500/10"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button
                onClick={onOpenEnquiry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:shadow-amber-500/45 will-change-transform"
              >
                <CalendarCheck className="size-4 shrink-0" />
                <span>Get a Free Quote</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </motion.button>

              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-white/10 bg-surface text-text-primary hover:text-amber-300 hover:border-amber-400/50 font-semibold text-sm uppercase tracking-wider backdrop-blur-xs transition-all duration-300"
              >
                <Phone className="size-4 text-amber-400 shrink-0" />
                <span>Call Now</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-text-secondary">
              <Clock className="size-3.5 text-amber-400 shrink-0" />
              <span>{CTA_SECTION_TEXT.hoursNotice}</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Cards — 2x2 on mobile, 4 col on lg */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {CONTACT_CARDS.map((card) => (
            <motion.a
              key={card.label}
              variants={itemVariants}
              href={card.href}
              target={EXTERNAL_LABELS.has(card.label) ? "_blank" : undefined}
              rel={EXTERNAL_LABELS.has(card.label) ? "noopener noreferrer" : undefined}
              className="flex flex-row items-center gap-3 p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-amber-400/50 group cursor-pointer hover:-translate-y-1 transition-transform duration-300 bg-card hover:bg-card-hover shadow-lg shadow-black/40"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 group-hover:bg-amber-500/20 group-hover:border-amber-400/40 transition-colors">
                {CONTACT_ICONS[card.iconName]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-0.5">
                  {card.label}
                </p>
                <p className="text-sm font-semibold text-text-primary group-hover:text-amber-300 transition-colors truncate">
                  {card.value}
                </p>
                <p className="text-xs text-text-muted font-light mt-0.5">{card.sublabel}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
