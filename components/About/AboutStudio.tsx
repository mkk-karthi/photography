"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, CheckCircle2, Aperture, Film, Mountain } from "lucide-react";
import {
  STUDIO_INFO,
  STUDIO_MILESTONES,
  PHILOSOPHY_ITEMS,
  STUDIO_SPECIALTIES,
} from "@/data/portfolioData";
import type { PhilosophyIconName } from "@/data/types";

// Map icon name strings to actual Lucide components
const PHILOSOPHY_ICONS: Record<PhilosophyIconName, React.ReactNode> = {
  Aperture: <Aperture className="w-5 h-5 text-amber-400" />,
  Film: <Film className="w-5 h-5 text-amber-400" />,
  Mountain: <Mountain className="w-5 h-5 text-amber-400" />,
};

export default function AboutStudio() {
  return (
    <section id="about" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Rotating aperture decoration (desktop) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-64 h-64 rounded-full border border-amber-500/10 border-dashed pointer-events-none hidden lg:block"
      >
        <div className="absolute inset-6 rounded-full border border-amber-500/10" />
        <div className="absolute inset-14 rounded-full border border-amber-500/10 border-dashed" />
      </motion.div>

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
            <Camera className="w-3.5 h-3.5" />
            <span>About {STUDIO_INFO.name}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We Preserve The{" "}
            <span className="font-serif text-amber-300 italic font-normal">
              Soul of Your Celebrations
            </span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Studio Photo */}
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-zinc-800 p-3 shadow-2xl">
              <img
                src="/images/about/about-1.webp"
                alt={`${STUDIO_INFO.name} Team in Action`}
                loading="lazy"
                className="w-full h-115 object-cover rounded-2xl block"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent rounded-2xl pointer-events-none" />

              {/* Studio Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-500/30 flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-sm font-bold text-white">{STUDIO_INFO.name} Studio</p>
                  <p className="text-xs text-amber-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
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

            {/* Philosophy Cards */}
            <div className="mt-5 space-y-3">
              {PHILOSOPHY_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/30 transition-colors duration-200"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0">
                    {PHILOSOPHY_ICONS[item.iconName]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-start"
          >
            {/* Studio Story */}
            <div className="mb-8 space-y-4">
              <p className="text-zinc-200 text-sm sm:text-base font-light leading-relaxed">
                At <strong className="text-amber-400 font-semibold">{STUDIO_INFO.name}</strong>, we
                believe every wedding, pre-wedding couple laugh, baby shower smile, and bridal
                portrait deserves to be captured with deep artistic clarity and preserved for a
                lifetime.
              </p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Based in {STUDIO_INFO.city}, {STUDIO_INFO.state}, our studio seamlessly blends
                traditional South Indian cultural reverence with modern 4K cinematic storytelling,
                professional drone aerial captures, and fine-art acrylic wall framing. Every image
                we deliver is color-graded, retouched, and archived to perfection.
              </p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Over {STUDIO_INFO.experienceYears} years, we have built trust with{" "}
                {STUDIO_INFO.weddingsCovered} families across {STUDIO_INFO.state} — from intimate
                home ceremonies to grand palace weddings. Our promise is simple: your memories, told
                with the honesty and warmth they deserve.
              </p>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">
                What We Specialize In
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STUDIO_SPECIALTIES.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Journey Timeline */}
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">
                Studio Journey
              </h3>
              <div className="space-y-3">
                {STUDIO_MILESTONES.map((m, idx) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                    className="relative flex items-start gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/30 transition-colors duration-200"
                  >
                    {/* Timeline connector line */}
                    {idx < STUDIO_MILESTONES.length - 1 && (
                      <div className="absolute left-7 top-13 w-px h-3 bg-amber-500/20" />
                    )}
                    <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-extrabold text-xs shrink-0 mt-0.5 min-w-12 text-center">
                      {m.year}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{m.title}</h4>
                      <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
