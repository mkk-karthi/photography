"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, CheckCircle2, Shield, Clock, ThumbsUp } from "lucide-react";
import {
  STUDIO_INFO,
  PHILOSOPHY_ITEMS,
  STUDIO_SPECIALTIES,
  ABOUT_SECTION_TEXT,
} from "@/data/portfolioData";
import type { PhilosophyIconName } from "@/data/types";

// Map icon name strings to actual Lucide components
const PHILOSOPHY_ICONS: Record<PhilosophyIconName, React.ReactNode> = {
  Shield: <Shield className="size-5 text-amber-400" />,
  Clock: <Clock className="size-5 text-amber-400" />,
  ThumbsUp: <ThumbsUp className="size-5 text-amber-400" />,
};

import SectionHeader from "@/components/Common/SectionHeader";

export default function AboutStudio() {
  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-surface">
      {/* Ambient glow orbs */}
      <div className="ambient-glow-left" />
      <div className="ambient-glow-right" />

      {/* Film strip top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Camera}
          badgeText={ABOUT_SECTION_TEXT.badge}
          titlePrefix={ABOUT_SECTION_TEXT.titlePrefix}
          titleHighlight={ABOUT_SECTION_TEXT.titleHighlight}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left — Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-5 relative flex flex-col"
          >
            {/* Decorative vertical film-strip strip */}
            <div className="absolute -left-3 top-6 bottom-6 w-px hidden lg:block bg-linear-to-b from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute -left-3 top-[10%] h-6 flex flex-col gap-1 lg:flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-px h-1 bg-amber-500/50" />
              ))}
            </div>

            {/* Studio Photo */}
            <div className="relative rounded-3xl overflow-hidden p-2.5 shadow-2xl h-full flex flex-col justify-between border border-white/5 bg-elevated">
              <img
                src="/images/about/about-1.webp"
                alt={`${STUDIO_INFO.name} Studio`}
                loading="lazy"
                className="w-full h-72 sm:h-96 lg:h-full object-cover rounded-2xl block"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent rounded-2xl pointer-events-none" />

              {/* Studio Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md border border-amber-500/20 flex items-center justify-between shadow-xl bg-[#1a1a28]/90">
                <div>
                  <p className="text-sm font-bold text-white">{STUDIO_INFO.name}</p>
                  <p className="text-xs text-amber-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3" />
                    <span>
                      {STUDIO_INFO.city}, {STUDIO_INFO.state}
                    </span>
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold text-xs shadow-lg">
                  Est. {STUDIO_INFO.establishedYear}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Studio Story */}
            <div className="mb-6 space-y-4">
              <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed">
                {ABOUT_SECTION_TEXT.storyParagraph1}
              </p>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {ABOUT_SECTION_TEXT.storyParagraph2}
              </p>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {ABOUT_SECTION_TEXT.storyParagraph3}
              </p>
            </div>

            {/* Services Checklist */}
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STUDIO_SPECIALTIES.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy / Value Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {PHILOSOPHY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 hover:border-amber-500/25 group bg-elevated will-change-transform"
            >
              <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 shrink-0 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all duration-300">
                {PHILOSOPHY_ICONS[item.iconName]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
