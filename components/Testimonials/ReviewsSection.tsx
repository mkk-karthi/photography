"use client";

import React from "react";
import { TESTIMONIALS, STUDIO_INFO } from "@/data/portfolioData";
import { Star, Quote, Heart } from "lucide-react";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-[#0c0c0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 fill-amber-400/30" />
            <span>Client Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Words From Our <span className="font-serif text-amber-300 italic font-normal">Happy Couples</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Read real reviews from brides, grooms, and families who trusted {STUDIO_INFO.name} with their most precious life milestones.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 relative overflow-hidden bg-zinc-950/80 hover:-translate-y-1 shadow-lg"
            >
              <Quote className="w-10 h-10 text-amber-500/10 absolute top-4 right-4 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed italic mb-6">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <img
                  src={t.avatar}
                  alt={t.coupleName}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.coupleName}</h4>
                  <p className="text-[11px] text-amber-300 font-medium">
                    {t.eventType} • {t.location}
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
