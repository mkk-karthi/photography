"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Award, Frame, Users } from "lucide-react";
import { STUDIO_STATS, TRUST_BADGES, STATS_SECTION_TEXT } from "@/data/portfolioData";
import type { StatItem } from "@/data/types";

// ── Icon map (UI layer, not data layer) ───────────────────────────────────────

const STAT_ICONS: Record<StatItem["iconName"], React.ReactNode> = {
  Camera: <Camera className="size-5" />,
  Frame: <Frame className="size-5" />,
  Award: <Award className="size-5" />,
  Users: <Users className="size-5" />,
};

// Accent colors per stat type
const STAT_ACCENT: Record<StatItem["iconName"], string> = {
  Camera: "text-amber-400",
  Frame: "text-amber-300",
  Award: "text-amber-400",
  Users: "text-amber-400",
};

const STAT_GLOW: Record<StatItem["iconName"], string> = {
  Camera: "rgba(212,175,55,0.15)",
  Frame: "rgba(212,175,55,0.10)",
  Award: "rgba(212,175,55,0.15)",
  Users: "rgba(212,175,55,0.12)",
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
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden film-strip-top bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="photo-badge mb-4">
            <Award className="size-3 text-amber-400" />
            <span>{STATS_SECTION_TEXT.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
            {STATS_SECTION_TEXT.titlePrefix}{" "}
            <span className="font-serif text-amber-300 italic font-normal">
              {STATS_SECTION_TEXT.titleHighlight}
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
            {STATS_SECTION_TEXT.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {STUDIO_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-amber-400/50 bg-card hover:bg-card-hover shadow-xl shadow-black/40 overflow-hidden cursor-default will-change-transform"
            >
              {/* Icon */}
              <div
                className={`mb-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 ${STAT_ACCENT[stat.iconName]}`}
              >
                {STAT_ICONS[stat.iconName]}
              </div>

              {/* Number */}
              <p className={`text-2xl sm:text-3xl font-black leading-none mb-1.5 ${STAT_ACCENT[stat.iconName]}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} parentInView={inView} />
              </p>

              <h3 className="text-xs font-bold text-text-primary leading-tight">{stat.label}</h3>
              <p className="text-[11px] text-text-secondary font-light mt-0.5 leading-snug hidden sm:block">
                {stat.sublabel}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-xs text-text-secondary font-medium"
        >
          {TRUST_BADGES.map((badge) => (
            <span key={badge} className="hover:text-amber-400 transition-colors cursor-default">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
