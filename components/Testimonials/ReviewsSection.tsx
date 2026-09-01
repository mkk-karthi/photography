"use client";

import React from "react";
import { TESTIMONIALS, REVIEWS_SECTION_TEXT } from "@/data/portfolioData";
import { Star, Heart } from "lucide-react";

import SectionHeader from "@/components/Common/SectionHeader";

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 relative overflow-hidden bg-deep"
    >
      {/* Ambient glow */}
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
          badgeIconClassName="size-3 fill-amber-400/30"
          titlePrefix={REVIEWS_SECTION_TEXT.titlePrefix}
          titleHighlight={REVIEWS_SECTION_TEXT.titleHighlight}
          subtitle={REVIEWS_SECTION_TEXT.subtitle}
        />

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="relative p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-amber-400/50 flex flex-col justify-between overflow-hidden group card-lift bg-card hover:bg-card-hover shadow-xl shadow-black/40"
            >
              {/* Large decorative quote mark */}
              <div
                className="absolute top-3 right-4 font-serif text-[80px] sm:text-[96px] leading-none font-black select-none pointer-events-none text-amber-400/10"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Hover top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-500" />

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="size-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-text-primary text-sm font-light leading-relaxed italic mb-6">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 relative z-10">
                <img
                  src={t.avatar}
                  alt={t.coupleName}
                  loading="lazy"
                  className="size-10 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-text-primary group-hover:text-amber-200 transition-colors">{t.coupleName}</h4>
                  <p className="text-[11px] text-amber-400/90 font-medium">
                    {t.eventType} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
