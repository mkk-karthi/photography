"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Aperture } from "lucide-react";
import { STUDIO_INFO } from "@/data/portfolioData";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 250);
          return 100;
        }
        return prev + 10;
      });
    }, 65);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden"
        >
          {/* DSLR Viewfinder Corner Brackets */}
          <div className="absolute top-8 left-8 size-8 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute top-8 right-8 size-8 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-8 left-8 size-8 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-8 right-8 size-8 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

          {/* Viewfinder REC Indicator */}
          <div className="absolute top-12 left-14 flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400/80">
            <span className="size-2 rounded-full bg-red-500 animate-ping" />
            <span>REC • 4K HDR</span>
          </div>

          {/* Photography Camera Aperture Lens */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Outer Rotating Aperture Blades */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="size-28 rounded-full border border-amber-500/20 border-dashed flex items-center justify-center"
            >
              <div className="size-24 rounded-full border border-amber-400/30" />
            </motion.div>

            {/* Inner Lens Shutter Icon with Flash Glow */}
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute flex items-center justify-center size-16 rounded-full bg-linear-to-br from-amber-400/20 via-amber-500/10 to-transparent border-2 border-amber-400/60 text-amber-400 shadow-2xl shadow-amber-500/30 backdrop-blur-md"
            >
              <Aperture className="size-8 text-amber-300 animate-pulse" />
            </motion.div>
          </div>

          {/* Photography Brand Logo */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center leading-none text-center mb-8"
          >
            <h1 className="text-3xl sm:text-3xl font-black tracking-[0.25em] uppercase text-white">
              {STUDIO_INFO.brandFirstName}
            </h1>
            <h2 className="text-lg sm:text-lg font-bold tracking-[0.2em] uppercase text-amber-400 mt-1.5">
              {STUDIO_INFO.brandSecondName}
            </h2>
          </motion.div>

          {/* Photography Shutter Loading Progress Bar */}
          <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
            <motion.div
              className="h-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center gap-2 mt-3 font-mono text-xs text-amber-400/90 font-bold">
            <Camera className="size-3.5" />
            <span>FOCUSING... {progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
