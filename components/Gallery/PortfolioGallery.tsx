"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import {
  PORTFOLIO_PHOTOS,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_SECTION_TEXT,
} from "@/data/portfolioData";
import type { PhotoItem } from "@/data/types";
import LightboxModal from "./LightboxModal";
import { Camera, Eye, MapPin, ArrowRight, Images } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";
import Link from "next/link";

interface PortfolioGalleryProps {
  /** When true: shows 3 preview photos + "View Full Gallery" CTA (home page mode) */
  preview?: boolean;
}

// ── Shared photo card ─────────────────────────────────────────────────────────

interface PhotoCardProps {
  photo: PhotoItem;
  index: number;
  onClick: (photo: PhotoItem) => void;
  isSquarePreview?: boolean;
}

// Memoized card — only re-renders if its own photo/index/handler changes
const PhotoCard = memo(function PhotoCard({ photo, index, onClick, isSquarePreview = false }: PhotoCardProps) {
  const handleClick = useCallback(() => onClick(photo), [photo, onClick]);

  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={(index % 6) * 50}
      onClick={handleClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-amber-500/40 transition-all duration-500 ${
        isSquarePreview ? "w-full" : "break-inside-avoid mb-4 sm:mb-5"
      }`}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
    >
      <div
        className={`relative w-full overflow-hidden bg-surface ${isSquarePreview ? "aspect-4/3 sm:aspect-4/3" : ""}`}
      >
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out block ${
            isSquarePreview ? "h-full" : "h-auto"
          }`}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[9px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider border border-amber-500/25 whitespace-nowrap shrink-0">
            {photo.categoryLabel}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-black text-[9px] font-bold shadow-lg">
              <Eye className="size-3" />
              <span>View</span>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-sm font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
            {photo.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin className="size-3 text-amber-400 shrink-0" />
            <span>{photo.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// ── Home page preview (3 photos in equal width & height grid) ─────────────────

function GalleryPreview() {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  // Stable slice reference — PORTFOLIO_PHOTOS is a module constant
  const previewPhotos = useMemo(() => PORTFOLIO_PHOTOS.slice(0, 3), []);
  const handlePhotoClick = useCallback((photo: PhotoItem) => setActivePhoto(photo), []);
  const handleClose = useCallback(() => setActivePhoto(null), []);

  return (
    <section id="gallery" className="py-20 sm:py-28 relative overflow-hidden bg-deep">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={Camera}
          badgeText={PORTFOLIO_SECTION_TEXT.badge}
          titlePrefix={PORTFOLIO_SECTION_TEXT.titlePrefix}
          titleHighlight={PORTFOLIO_SECTION_TEXT.titleHighlight}
          subtitle={PORTFOLIO_SECTION_TEXT.subtitle}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        />

        {/* Uniform 3-column grid with equal height & width cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {previewPhotos.map((photo, idx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={idx}
              onClick={handlePhotoClick}
              isSquarePreview
            />
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-zinc-400 font-light">
            Showing 3 of{" "}
            <span className="text-amber-400 font-semibold">{PORTFOLIO_PHOTOS.length}</span>{" "}
            portfolio photos
          </p>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Images className="size-4" />
            <span>View Full Gallery</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox for preview */}
      {activePhoto && (
        <LightboxModal
          photo={activePhoto}
          photosList={previewPhotos}
          onClose={handleClose}
          onNavigate={handlePhotoClick}
        />
      )}
    </section>
  );
}


// ── Full gallery (with filters, used on /gallery page) ────────────────────────

function FullGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = useMemo(
    () =>
      activeCategory === "all"
        ? PORTFOLIO_PHOTOS
        : PORTFOLIO_PHOTOS.filter((photo) => photo.category === activeCategory),
    [activeCategory]
  );

  const handlePhotoClick = useCallback((photo: PhotoItem) => setActivePhoto(photo), []);
  const handleClose = useCallback(() => setActivePhoto(null), []);

  return (
    <section id="gallery" className="py-20 sm:py-28 relative overflow-hidden min-h-200 bg-deep">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 size-150 rounded-full blur-[150px] pointer-events-none opacity-30"
        style={{ background: "rgba(120,20,20,0.08)" }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={Camera}
          badgeText={PORTFOLIO_SECTION_TEXT.badge}
          titlePrefix={PORTFOLIO_SECTION_TEXT.titlePrefix}
          titleHighlight={PORTFOLIO_SECTION_TEXT.titleHighlight}
          subtitle={PORTFOLIO_SECTION_TEXT.subtitle}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        />

        {/* Category Filter Tabs */}
        <div
          className="flex items-center sm:justify-start overflow-x-auto gap-2 px-1 sm:px-0 pb-2 mb-8 sm:mb-10 scrollbar-none w-full"
          data-aos="fade-up"
          data-aos-delay="80"
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
                className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 touch-target cursor-pointer ${
                  isActive
                    ? "bg-amber-400 text-black shadow-md shadow-amber-500/30"
                    : "border border-white/8 bg-elevated text-zinc-400 hover:text-white hover:border-amber-500/20"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                    isActive ? "bg-black/20 text-black" : "bg-surface text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry Grid for Full Gallery */}
        <div className="min-h-125">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
            {filteredPhotos.map((photo, idx) => (
              <PhotoCard key={photo.id} photo={photo} index={idx} onClick={handlePhotoClick} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <LightboxModal
          photo={activePhoto}
          photosList={filteredPhotos}
          onClose={handleClose}
          onNavigate={handlePhotoClick}
        />
      )}
    </section>
  );
}

// ── Default export ─────────────────────────────────────────────────────────────

export default function PortfolioGallery({ preview = false }: PortfolioGalleryProps) {
  return preview ? <GalleryPreview /> : <FullGallery />;
}
