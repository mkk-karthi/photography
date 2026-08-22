"use client";

import React, { useState } from "react";
import {
  PORTFOLIO_PHOTOS,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_SECTION_TEXT,
} from "@/data/portfolioData";
import type { PhotoItem } from "@/data/types";
import LightboxModal from "./LightboxModal";
import { Camera, Eye, MapPin } from "lucide-react";

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? PORTFOLIO_PHOTOS
      : PORTFOLIO_PHOTOS.filter((photo) => photo.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-zinc-950 relative overflow-hidden min-h-212">
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-amber-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera className="size-3.5" />
            <span>{PORTFOLIO_SECTION_TEXT.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {PORTFOLIO_SECTION_TEXT.titlePrefix}{" "}
            <span className="font-serif text-amber-300 italic font-normal">
              {PORTFOLIO_SECTION_TEXT.titleHighlight}
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light leading-relaxed">
            {PORTFOLIO_SECTION_TEXT.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        {/* Category Filter Tabs (Horizontally Scrollable on Mobile with Padding) */}
        <div
          className="flex items-center sm:justify-center overflow-x-auto gap-2 px-4 sm:px-0 pb-3 mb-10 scrollbar-none sm:flex-wrap w-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? PORTFOLIO_PHOTOS.length
                : PORTFOLIO_PHOTOS.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-amber-400 text-black font-bold scale-105"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-black/20 text-black font-extrabold" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <div className="min-h-125">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                data-aos="zoom-in"
                data-aos-delay={(idx % 6) * 60}
                onClick={() => setActivePhoto(photo)}
                className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden glass-panel border border-zinc-800 hover:border-amber-500/50 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className="relative w-full overflow-hidden bg-zinc-950">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out block"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Card Badges Bar (Flex layout prevents mobile overlap) */}
                  <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] text-amber-300 font-bold uppercase tracking-wider border border-amber-500/30 whitespace-nowrap shrink-0">
                      {photo.categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                        <div className="p-1.5 rounded-full bg-amber-400 text-black shadow-lg">
                          <Eye className="size-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                      {photo.title}
                    </h3>

                    <div className="flex items-center text-xs text-zinc-300 mt-1.5">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="size-3.5 text-amber-400" />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <LightboxModal
          photo={activePhoto}
          photosList={filteredPhotos}
          onClose={() => setActivePhoto(null)}
          onNavigate={(newPhoto) => setActivePhoto(newPhoto)}
        />
      )}
    </section>
  );
}
