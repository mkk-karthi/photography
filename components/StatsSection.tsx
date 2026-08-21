"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Award, Heart, Frame, Star, Users } from "lucide-react";
import { STUDIO_STATS, TRUST_BADGES } from "@/data/portfolioData";
import type { StatItem } from "@/data/types";

// ── Icon map (UI layer, not data layer) ───────────────────────────────────────

const STAT_ICONS: Record<StatItem["iconName"], React.ReactNode> = {
  Camera: <Camera className="w-6 h-6" />,
  Frame: <Frame className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

// Gradient styles per stat type — visual treatment owned by this component
const STAT_GRADIENTS: Record<StatItem["iconName"], string> = {
  Camera: "from-amber-500/20 to-amber-600/5",
  Frame: "from-amber-400/15 to-transparent",
  Heart: "from-rose-500/15 to-transparent",
  Award: "from-amber-500/20 to-amber-600/5",
  Star: "from-amber-400/15 to-transparent",
  Users: "from-amber-500/15 to-transparent",
};

// ── Animated counter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
  duration = 2,
  parentInView,
}: {
  target: number;
  suffix: string;
  duration?: number;
  parentInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!parentInView || startedRef.current) return;
    startedRef.current = true;

    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [parentInView, target, duration]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative py-20 overflow-hidden border-t border-b border-zinc-800/60"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%), #0a0a0d",
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Studio Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Numbers That{" "}
            <span className="font-serif text-amber-300 italic font-normal">Tell Our Story</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
            Twelve years of dedication, trust, and artistry — reflected in real milestones from real
            families across Tamil Nadu.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {STUDIO_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              className={`relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-zinc-800 hover:border-amber-500/40 transition-colors duration-300 overflow-hidden bg-linear-to-b ${STAT_GRADIENTS[stat.iconName]} backdrop-blur-sm`}
            >
              <div className="mb-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {STAT_ICONS[stat.iconName]}
              </div>

              <p
                className="text-2xl sm:text-3xl font-black text-amber-400 leading-none mb-1"
                style={{ textShadow: "0 0 30px rgba(245,158,11,0.4)" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} parentInView={inView} />
              </p>

              <h3 className="text-xs sm:text-sm font-bold text-white mt-1 leading-tight">
                {stat.label}
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-light mt-1 leading-snug hidden sm:block">
                {stat.sublabel}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-500/40 to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-zinc-500 font-medium"
        >
          {TRUST_BADGES.map((badge) => (
            <span key={badge} className="hover:text-amber-400 transition-colors">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
