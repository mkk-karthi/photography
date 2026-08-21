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
import { STUDIO_INFO, CONTACT_CARDS, AVAILABILITY_ITEMS, ContactCard } from "@/data/portfolioData";

interface CTASectionProps {
  onOpenEnquiry: () => void;
}

// ── Icon & style maps (UI layer, not data layer) ──────────────────────────────

const CONTACT_ICONS: Record<ContactCard["iconName"], React.ReactNode> = {
  Phone: <Phone className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
};

const CONTACT_GRADIENTS: Record<ContactCard["iconName"], string> = {
  Phone: "from-amber-500/15 to-transparent",
  Mail: "from-amber-400/10 to-transparent",
  MapPin: "from-amber-500/15 to-transparent",
  Share2: "from-amber-400/10 to-transparent",
};

const EXTERNAL_LABELS = new Set(["Instagram", "Studio Location"]);

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function CTASection({ onOpenEnquiry }: CTASectionProps) {
  return (
    <section
      id="cta"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 65%), #08080b",
      }}
    >
      {/* Pulsing aperture rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[320, 480, 640, 800].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-amber-500/5"
            style={{ width: size, height: size }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.07, 0.18, 0.07] }}
            transition={{
              duration: 4 + i * 1.5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bokeh orbs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl mb-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(9,9,11,0.95) 50%, rgba(212,175,55,0.06) 100%)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-linear-to-r from-transparent via-amber-500/60 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />

          <div className="p-8 sm:p-12 lg:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Booking {STUDIO_INFO.currentYear} / {STUDIO_INFO.nextYear} Events
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Ready to{" "}
              <span className="font-serif text-amber-300 italic font-normal">Preserve</span> Your{" "}
              <br className="hidden sm:block" />
              Most Precious Moments?
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
              From royal wedding ceremonies and cinematic pre-wedding shoots to outdoor baby showers
              and premium photo framing — {STUDIO_INFO.name} is here to capture every milestone with
              heart.
            </p>

            {/* Availability Items */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {AVAILABILITY_ITEMS.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={onOpenEnquiry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-200 hover:text-white hover:border-amber-500/50 font-semibold text-sm uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-zinc-800/90"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Now</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-amber-500/60" />
              <span>Studio Hours: Mon–Sat, 9:00 AM – 8:00 PM IST · Walk-ins welcome</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CONTACT_CARDS.map((card) => (
            <motion.a
              key={card.label}
              variants={itemVariants}
              href={card.href}
              target={EXTERNAL_LABELS.has(card.label) ? "_blank" : undefined}
              rel={EXTERNAL_LABELS.has(card.label) ? "noopener noreferrer" : undefined}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`flex items-start gap-4 p-5 rounded-2xl border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 bg-linear-to-br ${CONTACT_GRADIENTS[card.iconName]} backdrop-blur-sm group cursor-pointer`}
            >
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-colors">
                {CONTACT_ICONS[card.iconName]}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
                  {card.label}
                </p>
                <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                  {card.value}
                </p>
                <p className="text-[10px] text-zinc-500 font-light mt-0.5">{card.sublabel}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
