"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Camera,
  Frame,
  Heart,
  MapPin,
  Award,
  ChevronDown,
} from "lucide-react";
import { STUDIO_INFO, HERO_SLIDES, HERO_SECTION_TEXT } from "@/data/portfolioData";

interface HeroProps {
  onOpenEnquiry: () => void;
}

// ── Animation config (not user content) ──────────────────────────────────────

const BOKEH_PARTICLES = [
  { size: 80, top: "15%", left: "8%", dur: 18, delay: 0, opacity: 0.25 },
  { size: 120, top: "60%", left: "3%", dur: 22, delay: 3, opacity: 0.15 },
  { size: 60, top: "80%", left: "20%", dur: 16, delay: 6, opacity: 0.2 },
  { size: 100, top: "25%", left: "85%", dur: 20, delay: 1, opacity: 0.18 },
  { size: 70, top: "70%", left: "75%", dur: 14, delay: 4, opacity: 0.22 },
  { size: 50, top: "40%", left: "92%", dur: 24, delay: 8, opacity: 0.12 },
  { size: 90, top: "5%", left: "50%", dur: 19, delay: 2, opacity: 0.1 },
];

// ── Sidebar stats (derived from STUDIO_INFO, styled here) ────────────────────

const HERO_STATS = [
  { val: `${STUDIO_INFO.experienceYears}+ Yrs`, label: "Excellence", color: "text-amber-400" },
  { val: STUDIO_INFO.weddingsCovered, label: "Events Covered", color: "text-white" },
  { val: STUDIO_INFO.framedPrintsDelivered, label: "Framed Prints", color: "text-amber-400" },
  { val: STUDIO_INFO.clientSatisfaction, label: "Happy Clients", color: "text-white" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length),
      6000,
    );
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero"
      className="relative h-svh min-h-145 sm:min-h-162.5 w-full flex flex-col justify-center pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden bg-zinc-950"
    >
      {/* Background Images with Cross-Fade */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.bgUrl}
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all ease-out ${
            currentSlide === index
              ? "opacity-100 scale-[1.04] pointer-events-auto"
              : "opacity-0 scale-100 pointer-events-none"
          }`}
          style={{ backgroundImage: `url(${s.bgUrl})`, transitionDuration: "1200ms" }}
        >
          <img src={s.bgUrl} alt="" className="hidden" aria-hidden="true" />
        </div>
      ))}

      {/* Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 z-1 bg-black/55 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 z-1 bg-linear-to-b from-black/95 via-black/75 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-linear-to-r from-black/85 via-black/65 to-black/30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 z-1 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />

      {/* Animated Bokeh Particles */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {BOKEH_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              background:
                "radial-gradient(circle at 35% 35%, rgba(212,175,55,0.7) 0%, rgba(212,175,55,0.15) 50%, transparent 75%)",
              filter: `blur(${p.size * 0.25}px)`,
            }}
            animate={{
              y: [0, -40, -70, -30, 0],
              x: [0, 30, -20, 50, 0],
              scale: [1, 1.1, 0.9, 1.15, 1],
              opacity: [p.opacity, p.opacity * 1.4, p.opacity * 0.8, p.opacity * 1.2, p.opacity],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Rotating Aperture Graphic (desktop) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute right-4 top-1/4 size-128 rounded-full pointer-events-none hidden lg:block opacity-[0.07]"
        style={{ border: "1px dashed rgba(212,175,55,0.6)" }}
      >
        <div className="absolute inset-8 rounded-full border border-amber-400/50 border-dashed" />
        <div className="absolute inset-20 rounded-full border border-amber-500/40" />
        <div className="absolute inset-36 rounded-full border border-amber-500/30 border-dashed" />
      </motion.div>

      {/* Aperture Center Pulse */}
      <div className="absolute right-[calc(50%-240px+50px)] top-1/2 size-4 rounded-full bg-amber-400/30 hidden lg:block pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-full border border-amber-400/20"
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left — Hero Copy */}
          <div className="lg:col-span-8 flex flex-col text-left">
            <div className="min-h-56 sm:min-h-64 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="flex flex-col justify-center"
                >
                  {/* Category Tag */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="mb-3"
                  >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                      <Sparkles className="size-3.5 text-amber-400" />
                      <span>{slide.tag}</span>
                    </div>
                  </motion.div>

                  {/* Studio Name + Title */}
                  <div className="mb-3">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="block font-serif text-amber-300 italic font-normal text-lg sm:text-2xl lg:text-3xl mb-1 drop-shadow-lg"
                    >
                      {STUDIO_INFO.name}
                    </motion.span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight gold-gradient-text">
                      {slide.title}
                    </h1>
                  </div>

                  {/* Subtitle */}
                  <div className="mb-6">
                    <p className="text-sm sm:text-lg text-zinc-200 max-w-xl font-light leading-relaxed drop-shadow-md">
                      {slide.subtitle}. {HERO_SECTION_TEXT.studioSubtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <button
                onClick={onOpenEnquiry}
                className="group relative inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-black uppercase tracking-wider bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
              >
                <span>Book Event Consultation</span>
                <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href="#gallery"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white uppercase tracking-wider bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 rounded-full backdrop-blur-md transition-all hover:border-amber-500/40 whitespace-nowrap"
                >
                  <Camera className="size-4 mr-2 text-amber-400" />
                  <span>Portfolio</span>
                </a>
                <a
                  href="#framing"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 uppercase tracking-wider bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-full backdrop-blur-md transition-all whitespace-nowrap"
                >
                  <Frame className="size-4 mr-2" />
                  <span>Framing</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Studio Info Card (desktop only) */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-2xl p-5 border border-amber-500/20 shadow-2xl relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 size-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                <div>
                  <h3 className="text-white font-semibold text-base">{STUDIO_INFO.city} Studio</h3>
                  <p className="text-zinc-400 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3.5 text-amber-400" />
                    <span>
                      {STUDIO_INFO.state}, {STUDIO_INFO.country}
                    </span>
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Award className="size-5" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800"
                  >
                    <p className={`text-xl font-black ${stat.color}`}>{stat.val}</p>
                    <p className="text-xs text-zinc-400 uppercase font-medium mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Booking Callout */}
              <div className="p-3 rounded-xl bg-linear-to-r from-amber-500/15 to-transparent border border-amber-500/25 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-300 font-semibold uppercase">
                    Booking 2026/2027 Dates
                  </p>
                  <p className="text-xs text-zinc-300">Wedding &amp; Pre-wedding dates open</p>
                </div>
                <Heart className="size-4 text-amber-400 fill-amber-400/30 shrink-0" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Selector Tickers */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.tag}
              onClick={() => setCurrentSlide(index)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                currentSlide === index
                  ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-500/30"
                  : "bg-black/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800"
              }`}
            >
              {s.tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
