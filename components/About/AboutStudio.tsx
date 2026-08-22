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

// Map icon name strings to actual Lucide components (business-focused)
const PHILOSOPHY_ICONS: Record<PhilosophyIconName, React.ReactNode> = {
  Shield: <Shield className="size-5 text-amber-400" />,
  Clock: <Clock className="size-5 text-amber-400" />,
  ThumbsUp: <ThumbsUp className="size-5 text-amber-400" />,
};

export default function AboutStudio() {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-0 size-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 size-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera className="size-3.5" />
            <span>{ABOUT_SECTION_TEXT.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {ABOUT_SECTION_TEXT.titlePrefix}{" "}
            <span className="font-serif text-amber-300 italic font-normal">
              {ABOUT_SECTION_TEXT.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left — Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 relative flex flex-col"
          >
            {/* Studio Photo */}
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-zinc-800 p-3 shadow-2xl h-full flex flex-col justify-between">
              <img
                src="/images/about/about-1.webp"
                alt={`${STUDIO_INFO.name} Studio`}
                loading="lazy"
                className="w-full h-80 sm:h-96 lg:h-full object-cover rounded-2xl block"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent rounded-2xl pointer-events-none" />

              {/* Studio Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-500/30 flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-sm font-bold text-white">{STUDIO_INFO.name}</p>
                  <p className="text-xs text-amber-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3.5" />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Studio Story */}
            <div className="mb-6 space-y-4">
              <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed">
                {ABOUT_SECTION_TEXT.storyParagraph1}
              </p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {ABOUT_SECTION_TEXT.storyParagraph2}
              </p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {ABOUT_SECTION_TEXT.storyParagraph3}
              </p>
            </div>

            {/* Services Checklist */}
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STUDIO_SPECIALTIES.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Business Value Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PHILOSOPHY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/30 transition-colors duration-200"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                {PHILOSOPHY_ICONS[item.iconName]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
