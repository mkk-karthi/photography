"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  FRAMING_OPTIONS,
  FRAME_SIZES,
  SAMPLE_PHOTOS,
  FRAMING_SECTION_TEXT,
} from "@/data/portfolioData";
import type { FramingOption } from "@/data/types";
import { Frame, Check, Ruler, ArrowRight, Layers, Info, Image as ImageIcon } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

interface FramingShowcaseProps {
  onOrderFrame: (frameName: string, sizeLabel: string, calculatedPrice: number) => void;
}

export default function FramingShowcase({ onOrderFrame }: FramingShowcaseProps) {
  const [selectedFrame, setSelectedFrame] = useState<FramingOption>(FRAMING_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(FRAME_SIZES[7]); // Default 12x18 (₹850)
  const [samplePhoto, setSamplePhoto] = useState(SAMPLE_PHOTOS[0].url);

  // Animation state: "visible" | "hiding" | "zooming"
  const [animState, setAnimState] = useState<"visible" | "hiding" | "zooming">("visible");

  // Derived values — memoized so they only recompute when selectedSize or selectedFrame changes
  const calculatedPrice = selectedSize.price;
  const sizeAspectRatio = useMemo(
    () => `${selectedSize.width} / ${selectedSize.height}`,
    [selectedSize],
  );

  const handleStyleChange = useCallback(
    (updateAction: () => void) => {
      if (animState !== "visible") return;
      setAnimState("hiding");
      setTimeout(() => {
        updateAction();
        setAnimState("zooming");
        requestAnimationFrame(() => {
          setTimeout(() => setAnimState("visible"), 50);
        });
      }, 150);
    },
    [animState],
  );

  return (
    <section
      id="framing"
      className="py-12 sm:py-20 lg:py-28 relative overflow-hidden film-strip-top bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader
          badgeIcon={Frame}
          badgeText={FRAMING_SECTION_TEXT.badge}
          titlePrefix={FRAMING_SECTION_TEXT.titlePrefix}
          titleHighlight={FRAMING_SECTION_TEXT.titleHighlight}
          subtitle={FRAMING_SECTION_TEXT.subtitle}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        />

        {/* Interactive Studio Previewer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* ── Left Column: Studio Wall Preview ── */}
          <div className="lg:col-span-7 flex flex-col items-center" data-aos="fade-right">
            {/* Studio Wall Stage — responsive height across mobile & desktop */}
            <div className="relative w-full max-w-xl p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-linear-to-br from-card via-elevated to-surface shadow-2xl shadow-black/50 flex items-center justify-center h-70 sm:h-100 lg:h-120 overflow-hidden">
              {/* Wall spotlight — primary top centre */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/30 rounded-full blur-3xl pointer-events-none" />
              {/* Wall spotlight — softer secondary fill */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />

              {/* Dynamic Frame Box */}
              <div
                className={`relative transition-all duration-500 ease-out flex items-center justify-center sm:max-h-95 sm:max-w-95 max-h-65 max-w-80 ${
                  animState === "hiding"
                    ? "opacity-0 scale-90 pointer-events-none"
                    : animState === "zooming"
                      ? "opacity-0 scale-90 transition-none"
                      : "opacity-100 scale-100 transition-all duration-500 ease-out"
                } ${
                  selectedFrame.id === "acrylic-luxe"
                    ? "p-2 bg-linear-to-r from-zinc-100 via-white to-zinc-200 rounded-lg"
                    : selectedFrame.id === "teak-wood"
                      ? "p-2.5 bg-amber-950 rounded-lg border-3 border-amber-900"
                      : selectedFrame.id === "canvas-wrap"
                        ? "p-0 rounded-none border-2 border-zinc-700"
                        : "p-2 bg-linear-to-br from-amber-900 via-zinc-900 to-black rounded-xl sm:rounded-2xl border-2 border-amber-500/60"
                }`}
                style={{
                  aspectRatio: sizeAspectRatio,
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), 0 4px 20px rgba(212,175,55,0.15)",
                }}
              >
                {/* Photo with dynamic aspect ratio */}
                <div
                  className="relative overflow-hidden rounded bg-zinc-950 w-full h-full flex items-center justify-center"
                  style={{ aspectRatio: sizeAspectRatio }}
                >
                  <img
                    src={samplePhoto}
                    alt="Framing Preview"
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-300 block"
                  />

                  {/* Frame Shine overlay for Acrylic */}
                  {selectedFrame.id === "acrylic-luxe" && (
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                  )}
                  {/* Teak Wood Matting Board */}
                  {selectedFrame.id === "teak-wood" && (
                    <div className="absolute inset-0 border-[6px] sm:border-10 lg:border-14 border-amber-50/95 pointer-events-none" />
                  )}
                  {/* Canvas Texture */}
                  {selectedFrame.id === "canvas-wrap" && (
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[8px_8px] opacity-15 pointer-events-none" />
                  )}

                  {/* Dimension tag */}
                  <div className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] text-amber-300 font-bold tracking-widest border border-amber-500/40">
                    {selectedSize.label} • ₹{calculatedPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Photo preset selector */}
            <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto max-w-full pb-1">
              <span className="text-[11px] font-semibold text-text-secondary mr-1 shrink-0 flex items-center gap-1">
                <ImageIcon className="size-3 text-amber-400" /> Photo:
              </span>
              {SAMPLE_PHOTOS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => {
                      if (samplePhoto === src.url) return;
                      handleStyleChange(() => setSamplePhoto(src.url));
                    }}
                  className={`size-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    samplePhoto === src.url
                      ? "border-amber-400 scale-105 shadow-md shadow-amber-400/30"
                      : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/40"
                  }`}
                >
                  <img src={src.thumb} alt={src.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right Column: Customization Controls ── */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 lg:gap-6" data-aos="fade-left">
            {/* 1. Material Selector */}
            <div>
              <label className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2 sm:mb-3">
                <Layers className="size-3.5 sm:size-4" />
                <span>1. Select Frame Material</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {FRAMING_OPTIONS.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => {
                      if (selectedFrame.id === frame.id) return;
                      handleStyleChange(() => setSelectedFrame(frame));
                    }}
                    className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all duration-200 touch-target cursor-pointer ${
                      selectedFrame.id === frame.id
                        ? "border-amber-500/60 bg-amber-500/15 text-text-primary shadow-lg shadow-amber-500/15"
                        : "border-white/10 bg-card hover:bg-card-hover text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <p className="text-[11px] sm:text-xs text-text-primary leading-tight">{frame.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-amber-300/80 mt-0.5 sm:mt-1 font-medium">
                      {frame.material}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <label className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Ruler className="size-3.5 sm:size-4" />
                  <span>2. Frame Size ({FRAME_SIZES.length} Options)</span>
                </label>
                <span className="text-[9px] sm:text-[10px] text-amber-300/70 font-medium italic">
                  * Variable
                </span>
              </div>

              {/* Mobile: horizontal scroll strip | Desktop: grid */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {FRAME_SIZES.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => {
                      if (selectedSize.label === size.label) return;
                      setSelectedSize(size);
                    }}
                    className={`px-2 py-2 rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center shrink-0 touch-target cursor-pointer min-w-13 ${
                      selectedSize.label === size.label
                        ? "bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/30 border border-amber-300 scale-105"
                        : "border border-white/10 bg-card text-text-primary hover:border-amber-400/40"
                    }`}
                  >
                    <span className="text-[10px] leading-none mb-0.5">{size.label}</span>
                    <span
                      className={`text-[9px] sm:text-[10px] ${selectedSize.label === size.label ? "text-black font-black" : "text-amber-400/80"}`}
                    >
                      ₹{size.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Spec & Price Card */}
            <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-card shadow-xl shadow-black/40">
              <h4 className="text-sm font-bold text-text-primary mb-1.5 sm:mb-2 flex items-center justify-between">
                <span className="truncate pr-2">
                  {selectedFrame.name} ({selectedSize.label})
                </span>
                <span className="text-amber-400 text-xl sm:text-2xl font-black shrink-0">
                  ₹{calculatedPrice.toLocaleString("en-IN")}
                </span>
              </h4>
              <p className="text-xs text-text-secondary font-light mb-3 sm:mb-4 leading-relaxed">
                {selectedFrame.description}
              </p>

              <div className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-5">
                {selectedFrame.features.slice(0, 3).map((feat: string, fIdx: number) => (
                  <div key={fIdx} className="flex items-center gap-2 text-[11px] text-text-primary">
                    <Check className="size-3.5 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  onOrderFrame(selectedFrame.name, selectedSize.label, calculatedPrice)
                }
                className="w-full py-3 sm:py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Frame (₹{calculatedPrice})</span>
                <ArrowRight className="size-4" />
              </button>

              <p className="text-[11px] text-text-secondary font-light italic mt-3 text-center flex items-center justify-center gap-1.5">
                <Info className="size-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-amber-300 not-italic font-semibold">* Note:</strong>{" "}
                  Prices vary by custom glass, finish &amp; bulk order.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
