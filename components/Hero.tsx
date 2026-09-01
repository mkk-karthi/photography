"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Camera, Frame, MapPin, Award, ChevronDown } from "lucide-react";
import { STUDIO_INFO, HERO_SLIDES, HERO_SECTION_TEXT } from "@/data/portfolioData";

interface HeroProps {
  onOpenEnquiry: () => void;
}

// ── Bokeh / Lens Flare Particles ──────────────────────────────────────────────

const BOKEH_PARTICLES = [
  {
    size: 90,
    top: "12%",
    left: "7%",
    dur: 18,
    delay: 0,
    opacity: 0.18,
    color: "rgba(212,175,55,0.8)",
  },
  {
    size: 140,
    top: "62%",
    left: "2%",
    dur: 24,
    delay: 3,
    opacity: 0.1,
    color: "rgba(212,175,55,0.6)",
  },
  {
    size: 65,
    top: "82%",
    left: "22%",
    dur: 16,
    delay: 6,
    opacity: 0.14,
    color: "rgba(245,158,11,0.7)",
  },
  {
    size: 110,
    top: "20%",
    left: "84%",
    dur: 20,
    delay: 1,
    opacity: 0.12,
    color: "rgba(212,175,55,0.6)",
  },
  {
    size: 75,
    top: "68%",
    left: "78%",
    dur: 14,
    delay: 4,
    opacity: 0.16,
    color: "rgba(255,220,80,0.7)",
  },
  {
    size: 55,
    top: "42%",
    left: "91%",
    dur: 26,
    delay: 8,
    opacity: 0.08,
    color: "rgba(212,175,55,0.5)",
  },
  {
    size: 95,
    top: "4%",
    left: "52%",
    dur: 19,
    delay: 2,
    opacity: 0.07,
    color: "rgba(255,200,60,0.6)",
  },
];

// ── Sidebar stats ─────────────────────────────────────────────────────────────

const HERO_STATS = [
  { val: STUDIO_INFO.weddingsCovered, label: "Events Covered", color: "text-amber-300" },
  { val: STUDIO_INFO.framedPrintsDelivered, label: "Framed Prints", color: "text-zinc-100" },
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
      className="relative min-h-150 sm:h-dvh sm:max-h-dvh w-full flex flex-col justify-between pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden film-grain bg-void"
    >
      {/* Background Images with Cross-Fade */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.bgUrl}
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all ease-out ${
            currentSlide === index
              ? "opacity-100 scale-[1.03] pointer-events-auto"
              : "opacity-0 scale-100 pointer-events-none"
          }`}
          style={{ backgroundImage: `url(${s.bgUrl})`, transitionDuration: "1400ms" }}
        >
          <img src={s.bgUrl} alt="" className="hidden" aria-hidden="true" />
        </div>
      ))}

      {/* Multi-layer Gradient Overlays — Cinematic */}
      <div className="absolute inset-0 z-1 bg-black/40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 sm:h-56 z-1 bg-linear-to-b from-black/80 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-linear-to-r from-black/70 via-black/40 to-black/10 pointer-events-none" />
      {/* Bottom fade to page background */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 z-1 pointer-events-none bg-linear-to-t from-deep to-transparent" />

      {/* Animated Bokeh / Lens Flare Particles */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {BOKEH_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size * 0.7,
              top: p.top,
              left: p.left,
              background: `radial-gradient(ellipse at 30% 30%, ${p.color} 0%, rgba(212,175,55,0.08) 55%, transparent 80%)`,
              filter: `blur(${p.size * 0.22}px)`,
            }}
            animate={{
              y: [0, -35, -60, -25, 0],
              x: [0, 20, -15, 40, 0],
              scale: [1, 1.08, 0.92, 1.12, 1],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.7, p.opacity * 1.3, p.opacity],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Rotating Aperture Graphic (desktop) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute right-6 top-1/4 size-105 rounded-full pointer-events-none hidden lg:block opacity-[0.05] border border-dashed border-amber-400/80"
      >
        <div className="absolute inset-8 rounded-full border border-amber-400/60 border-dashed" />
        <div className="absolute inset-20 rounded-full border border-amber-500/50" />
        <div className="absolute inset-36 rounded-full border border-amber-500/40 border-dashed" />
        <div className="absolute inset-48 rounded-full bg-amber-500/5" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center">
          {/* Left — Hero Copy */}
          <div className="lg:col-span-8 flex flex-col text-left justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col justify-between"
              >
                {/* Category Tag with ISO style */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="mb-2.5 sm:mb-4 flex items-center gap-2.5"
                >
                  {/* Category tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <Camera className="size-3 sm:size-3.5 text-amber-400 shrink-0" />
                    <span>{slide.tag}</span>
                  </div>
                </motion.div>

                {/* Studio Name + Title */}
                <div className="mb-2.5 sm:mb-4 min-h-22.5 sm:min-h-32.5 lg:min-h-37.5 flex flex-col justify-end">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="block font-serif text-amber-300/90 italic font-normal text-base sm:text-2xl lg:text-3xl mb-1 sm:mb-1.5 drop-shadow-lg"
                  >
                    {STUDIO_INFO.name}
                  </motion.span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] gold-gradient-text">
                    {slide.title}
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="mb-4 sm:mb-6 min-h-12 sm:min-h-16 flex items-start">
                  <p className="text-xs sm:text-base lg:text-lg text-zinc-300/90 max-w-xl font-light leading-relaxed drop-shadow-md">
                    {slide.subtitle}. {HERO_SECTION_TEXT.studioSubtitle}
                  </p>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3"
                >
                  <button
                    onClick={onOpenEnquiry}
                    className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-black uppercase tracking-wider bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <a
                      href="#gallery"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white uppercase tracking-wider bg-black/50 hover:bg-black/70 border border-zinc-700/60 rounded-full backdrop-blur-md transition-all hover:border-amber-500/30 whitespace-nowrap"
                    >
                      <Camera className="size-3.5 sm:size-4 mr-1.5 sm:mr-2 text-amber-400 shrink-0" />
                      <span>Our Work</span>
                    </a>
                    <a
                      href="#framing"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 uppercase tracking-wider bg-amber-500/8 hover:bg-amber-500/15 border border-amber-500/25 rounded-full backdrop-blur-md transition-all whitespace-nowrap"
                    >
                      <Frame className="size-3.5 sm:size-4 mr-1.5 sm:mr-2 shrink-0" />
                      <span>Framing</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Studio Info Card (desktop only) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div
              data-aos="zoom-in"
              data-aos-delay="20"
              className="glass-panel rounded-2xl p-5 border-amber-500/15 cinematic-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 size-36 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3.5 border-b border-white/5 mb-4">
                <div>
                  <h3 className="text-white font-semibold text-sm">{STUDIO_INFO.city} Studio</h3>
                  <p className="text-zinc-500 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3 text-amber-400" />
                    <span>
                      {STUDIO_INFO.state}, {STUDIO_INFO.country}
                    </span>
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/8 border border-amber-500/20 text-amber-400">
                  <Award className="size-5" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl border border-white/5 bg-surface">
                    <p className={`text-xl font-black ${stat.color}`}>{stat.val}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wide mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Booking Callout */}
              <div className="p-3 rounded-xl bg-linear-to-r from-amber-500/10 to-transparent border border-amber-500/15 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-300 font-semibold uppercase tracking-wide">
                    Accepting Bookings
                  </p>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">Mon–Sat · Free consult</p>
                </div>
                <ChevronDown className="size-4 text-amber-400 -rotate-90 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Selector */}
      <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.tag}
              onClick={() => setCurrentSlide(index)}
              className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all whitespace-nowrap shrink-0 tracking-wider uppercase ${
                currentSlide === index
                  ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-500/30"
                  : "bg-black/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80 border border-zinc-800/80"
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
