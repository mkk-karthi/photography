"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS, REVIEWS_SECTION_TEXT } from "@/data/portfolioData";
import { Star, Heart, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import SectionHeader from "@/components/Common/SectionHeader";

export default function ReviewsSection() {
  // Monotonic page count for continuous infinite looping slide direction
  const [[page, direction], setPage] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS.length;
  const currentIndex = ((page % total) + total) % total;

  const handleNext = useCallback(() => {
    setPage(([prevPage]) => [prevPage + 1, 1]);
  }, []);

  const handlePrev = useCallback(() => {
    setPage(([prevPage]) => [prevPage - 1, -1]);
  }, []);

  // Auto-play swiping timer (4.5s interval, pauses on hover/touch)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  // Touch drag / swipe gesture handler with smooth threshold
  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev();
    }
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  // Silky smooth spring variants preventing layout jitter or shaking
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 relative overflow-hidden bg-deep select-none"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Heart}
          badgeText={REVIEWS_SECTION_TEXT.badge}
          badgeIconClassName="size-3 fill-amber-400/30 text-amber-400"
          titlePrefix={REVIEWS_SECTION_TEXT.titlePrefix}
          titleHighlight={REVIEWS_SECTION_TEXT.titleHighlight}
          subtitle={REVIEWS_SECTION_TEXT.subtitle}
        />

        {/* Swiping Carousel Wrapper */}
        <div
          className="relative max-w-3xl mx-auto mt-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Swiper Viewport (Strict even height & width container) */}
          <div className="relative overflow-hidden h-85 sm:h-75 p-1">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full p-6 sm:p-8 rounded-3xl border border-white/10 bg-card hover:bg-card-hover shadow-2xl shadow-black/40 flex flex-col justify-between group overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* Decorative quote mark background */}
                <div className="absolute top-4 right-6 text-amber-400/10 pointer-events-none select-none">
                  <Quote className="size-20 sm:size-24" />
                </div>

                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />

                <div className="relative z-10 space-y-3 sm:space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-300/90 uppercase tracking-widest">
                      Verified Client Review
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-text-primary text-sm sm:text-base md:text-lg font-light leading-relaxed italic line-clamp-4">
                    &quot;{activeTestimonial.quote}&quot;
                  </p>
                </div>

                {/* Author Profile Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10 mt-auto">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.coupleName}
                      loading="lazy"
                      className="size-11 rounded-full object-cover border-2 border-amber-400/40 shadow-md shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-text-primary group-hover:text-amber-200 transition-colors truncate">
                        {activeTestimonial.coupleName}
                      </h4>
                      <p className="text-xs text-amber-400/90 font-medium truncate">
                        {activeTestimonial.eventType} · {activeTestimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Slide Counter Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono font-bold text-amber-400 shrink-0">
                    <span>0{currentIndex + 1}</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-500">0{total}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Pagination Dots */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-400/50 hover:bg-zinc-800 transition-all cursor-pointer shadow-lg active:scale-95 touch-manipulation"
              aria-label="Previous review"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    const targetDirection = idx > currentIndex ? 1 : -1;
                    const diff = idx - currentIndex;
                    setPage(([prevPage]) => [prevPage + diff, targetDirection]);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 bg-amber-400 shadow-md shadow-amber-500/30"
                      : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-400/50 hover:bg-zinc-800 transition-all cursor-pointer shadow-lg active:scale-95 touch-manipulation"
              aria-label="Next review"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Fallback for inactive slides so each review exists exactly once in DOM */}
          <div className="sr-only">
            {TESTIMONIALS.filter((_, idx) => idx !== currentIndex).map((t) => (
              <div key={t.id}>
                <span>{t.coupleName}</span>
                <span>{t.quote}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
