"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Aperture } from "lucide-react";
import { STUDIO_INFO } from "@/data/portfolioData";

// Module-level state: persists during client-side route navigation, resets on browser refresh/initial load
let hasInitiallyLoaded = false;

export default function PageLoader() {
  // If already loaded in this browser session/SPA runtime, don't show loader again
  const [isLoading, setIsLoading] = useState(() => !hasInitiallyLoaded);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasInitiallyLoaded) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          hasInitiallyLoaded = true;
          setTimeout(() => setIsLoading(false), 250);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed! inset-0 z-50 flex flex-col items-center justify-center bg-void overflow-hidden select-none film-grain"
        >
          {/* DSLR Viewfinder Corner Brackets */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 size-8 border-t-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 size-8 border-t-2 border-r-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 size-8 border-b-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 size-8 border-b-2 border-r-2 border-amber-500/50 pointer-events-none" />

          {/* REC Indicator */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-16 flex items-center gap-2 text-[10px] font-mono tracking-widest text-amber-400/80">
            <span className="size-1.5 rounded-full bg-red-500 animate-ping" />
            <span>REC • 4K HDR</span>
          </div>

          {/* Exposure Meter (right side) */}
          <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 sm:flex">
            <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">
              EV
            </div>
            {[-3, -2, -1, 0, 1, 2, 3].map((val) => {
              const active = Math.round((progress / 100) * 6) - 3 === val;
              return (
                <div key={val} className="flex items-center gap-1.5">
                  <span
                    className={`text-[8px] font-mono ${active ? "text-amber-400" : "text-zinc-700"}`}
                  >
                    {val > 0 ? `+${val}` : val}
                  </span>
                  <div
                    className={`w-6 h-px transition-colors duration-200 ${
                      active ? "bg-amber-400" : "bg-zinc-800"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Aperture Lens Animation */}
          <div className="relative mb-6 sm:mb-10 flex items-center justify-center">
            {/* Outer slow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="size-28 sm:size-36 rounded-full border border-dashed border-amber-500/15 flex items-center justify-center"
            >
              <div className="size-24 sm:size-32 rounded-full border border-amber-400/20" />
            </motion.div>

            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute size-18 sm:size-24 rounded-full border border-dashed border-amber-500/20"
            />

            {/* Center aperture icon */}
            <motion.div
              animate={{ scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute flex items-center justify-center size-14 sm:size-18 rounded-full border border-amber-400/40 text-amber-400"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 60%, transparent 100%)",
                boxShadow: "0 0 30px rgba(212,175,55,0.2), inset 0 0 20px rgba(212,175,55,0.05)",
              }}
            >
              <Aperture className="size-7 sm:size-9 text-amber-300" />
            </motion.div>
          </div>

          {/* Brand Logo */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center leading-none text-center mb-8 sm:mb-10"
          >
            <h1 className="text-2xl sm:text-3xl font-black tracking-[0.3em] uppercase text-white">
              {STUDIO_INFO.brandFirstName}
            </h1>
            <h2 className="text-sm sm:text-lg font-bold tracking-[0.25em] uppercase text-amber-400 mt-2">
              {STUDIO_INFO.brandSecondName}
            </h2>
            {/* Thin gold rule */}
            <div className="mt-3 w-24 h-px bg-linear-to-r from-transparent via-amber-500/60 to-transparent" />
          </motion.div>

          {/* Shutter-curtain style progress bar */}
          <div className="w-48 sm:w-64 relative">
            {/* Track */}
            <div className="h-px bg-zinc-900 relative overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-amber-500 to-amber-400"
                initial={{ width: "0%", x: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            {/* Tick marks */}
            <div className="flex justify-between mt-1">
              {[0, 25, 50, 75, 100].map((tick) => (
                <div
                  key={tick}
                  className={`w-px h-1 transition-colors duration-300 ${
                    progress >= tick ? "bg-amber-500/60" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Loading text */}
          <div className="flex items-center gap-2 mt-4 font-mono text-[11px] tracking-widest text-amber-400/80">
            <span>FOCUSING</span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
