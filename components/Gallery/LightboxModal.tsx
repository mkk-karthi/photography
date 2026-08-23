"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoItem } from "@/data/types";
import { X, ChevronLeft, ChevronRight, MapPin, Share2, Check, ArrowRight } from "lucide-react";

interface LightboxModalProps {
  photo: PhotoItem | null;
  photosList: PhotoItem[];
  onClose: () => void;
  onNavigate: (newPhoto: PhotoItem) => void;
}

export default function LightboxModal({
  photo,
  photosList,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const [copied, setCopied] = useState(false);

  const currentIndex = photo ? photosList.findIndex((p) => p.id === photo.id) : 0;

  const handlePrev = () => {
    if (!photo) return;
    const prevIdx = (currentIndex - 1 + photosList.length) % photosList.length;
    onNavigate(photosList[prevIdx]);
  };

  const handleNext = () => {
    if (!photo) return;
    const nextIdx = (currentIndex + 1) % photosList.length;
    onNavigate(photosList[nextIdx]);
  };

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (!photo) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, photosList, currentIndex, onClose]);

  if (!photo) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 h-dvh w-screen z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md overscroll-none touch-none overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700 hover:border-amber-400 transition-colors"
          aria-label="Close"
        >
          <X className="size-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-amber-400 border border-zinc-700 hover:border-amber-400 transition-all hidden md:flex items-center justify-center"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="size-7" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-amber-400 border border-zinc-700 hover:border-amber-400 transition-all hidden md:flex items-center justify-center"
          aria-label="Next Photo"
        >
          <ChevronRight className="size-7" />
        </button>

        {/* Modal Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl w-full max-h-[calc(100dvh-2rem)] lg:max-h-[90dvh] flex flex-col lg:flex-row rounded-2xl overflow-hidden glass-panel border border-zinc-800 shadow-2xl overscroll-contain"
        >
          {/* Left: Image Container */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="max-h-[50dvh] sm:max-h-[70dvh] lg:max-h-[85dvh] w-auto object-contain select-none pointer-events-none"
            />

            {/* Floating Quick Action Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs text-amber-300 font-semibold border border-amber-500/30">
                {photo.categoryLabel}
              </span>

              {/* Hidden share button */}
              <div className="hidden items-center gap-2 pointer-events-auto">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white border border-zinc-700"
                  title="Share"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Share2 className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Details Panel */}
          <div className="w-full lg:w-80 bg-zinc-950 p-6 flex flex-col justify-between overflow-y-auto overscroll-contain border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  {photo.categoryLabel}
                </span>
                <span className="text-xs text-zinc-400">
                  {currentIndex + 1} of {photosList.length}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{photo.title}</h3>

              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
                <MapPin className="size-3.5 text-amber-400 shrink-0" />
                <span>{photo.location}</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-6">
                {photo.description}
              </p>

              {/* Enquiry CTA */}
              <a
                href="#cta"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Enquire About This Service</span>
                <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Footer navigation (mobile) */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-end mt-4">
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs font-medium text-zinc-300"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs font-medium text-amber-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
