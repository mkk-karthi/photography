"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoItem } from "@/data/types";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Camera,
  Sliders,
  Maximize2,
  Share2,
  Check,
} from "lucide-react";

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
  const [liked, setLiked] = useState(false);
  const [zoom, setZoom] = useState(false);

  const currentIndex = photo ? photosList.findIndex((p) => p.id === photo.id) : 0;

  const handlePrev = () => {
    if (!photo) return;
    const prevIdx = (currentIndex - 1 + photosList.length) % photosList.length;
    onNavigate(photosList[prevIdx]);
    setZoom(false);
  };

  const handleNext = () => {
    if (!photo) return;
    const nextIdx = (currentIndex + 1) % photosList.length;
    onNavigate(photosList[nextIdx]);
    setZoom(false);
  };

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700 hover:border-amber-400 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-amber-400 border border-zinc-700 hover:border-amber-400 transition-all hidden md:flex items-center justify-center"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-amber-400 border border-zinc-700 hover:border-amber-400 transition-all hidden md:flex items-center justify-center"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Modal Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row rounded-2xl overflow-hidden glass-panel border border-zinc-800 shadow-2xl"
        >
          {/* Left: Image Container */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-87.5 lg:min-h-150">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className={`max-h-[85vh] w-auto object-contain transition-transform duration-300 cursor-zoom-in ${
                zoom ? "scale-125" : "scale-100"
              }`}
              onClick={() => setZoom(!zoom)}
            />

            {/* Floating Quick Action Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-amber-300 font-semibold border border-amber-500/30">
                {photo.categoryLabel}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setZoom(!zoom)}
                  className="p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white border border-zinc-700"
                  title="Toggle Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white border border-zinc-700"
                  title="Share Photo"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Metadata & Details Panel */}
          <div className="w-full lg:w-96 bg-zinc-950 p-6 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  {photo.categoryLabel}
                </span>
                <span className="text-xs text-zinc-400">
                  {currentIndex + 1} of {photosList.length}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{photo.title}</h3>

              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{photo.location}</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-6">
                {photo.description}
              </p>

              {/* Camera EXIF Details Box */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider pb-2 border-b border-zinc-800">
                  <Camera className="w-4 h-4" />
                  <span>Camera & Shot EXIF Specs</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">Camera Body</span>
                    <span className="text-zinc-200 font-medium">{photo.exif.camera}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">Prime Lens</span>
                    <span className="text-zinc-200 font-medium">{photo.exif.lens}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">Aperture</span>
                    <span className="text-amber-300 font-semibold">{photo.exif.aperture}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">Shutter Speed</span>
                    <span className="text-amber-300 font-semibold">{photo.exif.shutter}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Interaction */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                  liked
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{photo.likes + (liked ? 1 : 0)} Appreciations</span>
              </button>

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
