"use client";

import React, { useState } from "react";
import {
  FRAMING_OPTIONS,
  FRAME_SIZES,
  SAMPLE_PHOTOS,
  STUDIO_INFO,
} from "@/data/portfolioData";
import type { FramingOption } from "@/data/types";
import { Frame, Check, Ruler, ArrowRight, Layers, Info } from "lucide-react";

interface FramingShowcaseProps {
  onOrderFrame: (frameName: string, sizeLabel: string, calculatedPrice: number) => void;
}

export default function FramingShowcase({ onOrderFrame }: FramingShowcaseProps) {
  const [selectedFrame, setSelectedFrame] = useState<FramingOption>(FRAMING_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(FRAME_SIZES[7]); // Default 12x18 (₹850)
  const [samplePhoto, setSamplePhoto] = useState(SAMPLE_PHOTOS[0].url); // Wedding Photo first by default

  // Animation state: "visible" | "hiding" | "zooming"
  const [animState, setAnimState] = useState<"visible" | "hiding" | "zooming">("visible");

  const calculatedPrice = selectedSize.price;
  const sizeAspectRatio = `${selectedSize.width} / ${selectedSize.height}`;

  const handleStyleChange = (updateAction: () => void) => {
    if (animState !== "visible") return;
    // Step 1: Hide old frame (scale down & fade out)
    setAnimState("hiding");
    setTimeout(() => {
      // Step 2: Apply state update and trigger zoom-in
      updateAction();
      setAnimState("zooming");
      requestAnimationFrame(() => {
        setTimeout(() => {
          setAnimState("visible");
        }, 50);
      });
    }, 150);
  };

  return (
    <section
      id="framing"
      className="py-24 bg-[#09090b] relative overflow-hidden border-t border-b border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Frame className="w-3.5 h-3.5" />
            <span>{STUDIO_INFO.shortName} Custom Framing Studio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transform Photos Into{" "}
            <span className="font-serif text-amber-300 italic font-normal">Archival Wall Art</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Handcrafted in {STUDIO_INFO.city} with museum-grade UV protection glass, seasoned{" "}
            {STUDIO_INFO.region} teak wood, and 100-year anti-fade guarantees.
          </p>
        </div>

        {/* Interactive Studio Previewer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Studio Wall Stage for High-Contrast Frame Visibility */}
          <div className="lg:col-span-7 flex flex-col items-center" data-aos="fade-right">
            {/* Studio Wall Stage Container */}
            <div className="relative w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-linear-to-b from-zinc-800/90 via-zinc-900 to-black border border-zinc-700/80 flex items-center justify-center h-115 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Wall Light Spotlight Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Dynamic Frame Box (Resizes visually according to selected dimension aspect ratio) */}
              <div
                className={`relative transition-all duration-500 ease-out flex items-center justify-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ${
                  animState === "hiding"
                    ? "opacity-0 scale-90 pointer-events-none"
                    : animState === "zooming"
                      ? "opacity-0 scale-90 transition-none"
                      : "opacity-100 scale-100 transition-all duration-500 ease-out"
                } ${
                  selectedFrame.id === "acrylic-luxe"
                    ? "p-2.5 bg-linear-to-r from-zinc-100 via-white to-zinc-200 rounded-lg shadow-[0_0_35px_rgba(255,255,255,0.4)]"
                    : selectedFrame.id === "teak-wood"
                      ? "p-4 sm:p-5 bg-[#3e2723] rounded-lg border-[6px] border-[#5d4037] shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                      : selectedFrame.id === "canvas-wrap"
                        ? "p-0 rounded-none shadow-[15px_15px_40px_rgba(0,0,0,0.9)] border-2 border-zinc-700"
                        : "p-4 bg-linear-to-br from-amber-900 via-zinc-900 to-black rounded-2xl border-2 border-amber-500/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                }`}
                style={{
                  aspectRatio: sizeAspectRatio,
                  maxHeight: "330px",
                  maxWidth: "380px",
                }}
              >
                {/* Photo Container with DYNAMIC Aspect Ratio reflecting selected dimension */}
                <div
                  className="relative overflow-hidden rounded bg-zinc-950 transition-all duration-500 ease-out w-full h-full flex items-center justify-center mx-auto"
                  style={{ aspectRatio: sizeAspectRatio }}
                >
                  <img
                    src={samplePhoto}
                    alt="Framing Preview"
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-300 block"
                  />

                  {/* Acrylic Gloss Reflection Effect */}
                  {selectedFrame.id === "acrylic-luxe" && (
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
                  )}

                  {/* Teak Wood Matting Board */}
                  {selectedFrame.id === "teak-wood" && (
                    <div className="absolute inset-0 border-10 sm:border-14 border-amber-50/95 pointer-events-none" />
                  )}

                  {/* Canvas Texture Overlay */}
                  {selectedFrame.id === "canvas-wrap" && (
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[8px_8px] opacity-15 pointer-events-none" />
                  )}

                  {/* Dimension Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-amber-300 font-bold tracking-widest border border-amber-500/40 shadow-md">
                    {selectedSize.label} • ₹{calculatedPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Sample Photo Swapper (With Active Border Highlight) */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs text-zinc-400 font-medium">Switch Sample Photo:</span>
              {SAMPLE_PHOTOS.map((sp) => {
                const isActive = samplePhoto === sp.url;
                return (
                  <button
                    key={sp.id}
                    onClick={() => {
                      if (samplePhoto === sp.url) return;
                      handleStyleChange(() => setSamplePhoto(sp.url));
                    }}
                    title={sp.label}
                    className={`w-9 h-9 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                      isActive
                        ? "border-2 border-amber-400 ring-2 ring-amber-400/40 scale-110 shadow-lg shadow-amber-500/30"
                        : "border-2 border-zinc-700 opacity-60 hover:opacity-100 hover:border-zinc-500"
                    }`}
                  >
                    <img
                      src={sp.thumb}
                      alt={sp.label}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6" data-aos="fade-left">
            {/* Material Selector */}
            <div>
              <label className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" />
                <span>1. Select Frame Material</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FRAMING_OPTIONS.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => {
                      if (selectedFrame.id === frame.id) return;
                      handleStyleChange(() => setSelectedFrame(frame));
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      selectedFrame.id === frame.id
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10 font-bold"
                        : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <p className="text-xs text-white leading-tight">{frame.name}</p>
                    <p className="text-[10px] text-amber-300/80 mt-1 font-medium">
                      {frame.material}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector (15 Dimensions & Prices - Size Changing Animation Only) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  <span>2. Select Frame Dimension ({FRAME_SIZES.length} Options)</span>
                </label>
                <span className="text-[10px] text-amber-300/80 font-medium italic">
                  * Prices are variable
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {FRAME_SIZES.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => {
                      if (selectedSize.label === size.label) return;
                      setSelectedSize(size);
                    }}
                    className={`px-2 py-2 rounded-lg text-center transition-all duration-300 flex flex-col items-center justify-center ${
                      selectedSize.label === size.label
                        ? "bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/30 border border-amber-300 scale-105"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    <span className="text-[11px] leading-none mb-1">{size.label}</span>
                    <span
                      className={`text-[10px] ${selectedSize.label === size.label ? "text-black font-black" : "text-amber-400"}`}
                    >
                      ₹{size.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications & Price Card */}
            <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-zinc-900/90">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center justify-between">
                <span>
                  {selectedFrame.name} ({selectedSize.label})
                </span>
                <span className="text-amber-400 text-2xl font-black">
                  ₹{calculatedPrice.toLocaleString("en-IN")}
                </span>
              </h4>
              <p className="text-xs text-zinc-400 font-light mb-4">{selectedFrame.description}</p>

              <div className="space-y-1.5 mb-5">
                {selectedFrame.features.slice(0, 3).map((feat: string, fIdx: number) => (
                  <div key={fIdx} className="flex items-center gap-2 text-[11px] text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  onOrderFrame(selectedFrame.name, selectedSize.label, calculatedPrice)
                }
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <span>Order Frame (₹{calculatedPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Explicit Pricing Variable Note */}
              <p className="text-[11px] text-zinc-400 font-light italic mt-3 text-center flex items-center justify-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-amber-300 not-italic font-semibold">* Note:</strong>{" "}
                  Prices are variable depending on custom glass, finish & bulk order requirements.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
