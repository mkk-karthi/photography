"use client";

import React from "react";
import { SERVICE_PACKAGES, SERVICES_SECTION_TEXT } from "@/data/portfolioData";
import { Camera, CheckCircle2, Sparkles, ArrowRight, Star } from "lucide-react";

import SectionHeader from "@/components/Common/SectionHeader";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 sm:py-28 relative overflow-hidden bg-deep">
      {/* Ambient glows */}
      <div className="ambient-glow-left opacity-40" />
      <div className="ambient-glow-right opacity-40" />

      {/* Film strip top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Camera}
          badgeText={SERVICES_SECTION_TEXT.badge}
          titlePrefix={SERVICES_SECTION_TEXT.titlePrefix}
          titleHighlight={SERVICES_SECTION_TEXT.titleHighlight}
          subtitle={SERVICES_SECTION_TEXT.subtitle}
        />

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <div
              key={pkg.id}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between card-lift bg-card shadow-xl shadow-black/40"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-surface">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Film noir gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/30 to-transparent" />
                  {/* Side darkening for atmosphere */}
                  <div className="absolute inset-0 bg-linear-to-r from-void/30 to-transparent" />

                  {/* Price Tag Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-void/90 backdrop-blur-md text-amber-300 font-extrabold text-[10px] border border-amber-500/30 shadow-lg tracking-wider">
                      From ₹{pkg.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-amber-300 transition-colors mb-1.5">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-amber-400/90 font-medium italic mb-4">
                    &quot;{pkg.tagline}&quot;
                  </p>

                  {/* Package Inclusions */}
                  <div className="space-y-2 mb-5">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                      Package Includes:
                    </p>
                    {pkg.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-text-secondary font-light"
                      >
                        <CheckCircle2 className="size-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons */}
                  {pkg.recommendedAddons.length > 0 && (
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[10px] font-semibold text-amber-400/90 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="size-3" />
                        <span>Popular Add-ons</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.recommendedAddons.map((addon, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold"
                          >
                            <span className="text-amber-400 font-black">+</span>
                            <span className="text-text-primary">{addon}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectService(pkg.title)}
                  className="w-full py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-amber-400/50 text-text-primary hover:text-black hover:bg-linear-to-r hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 group/btn bg-elevated"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Event Notice Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl border border-amber-500/20 bg-linear-to-r from-card via-elevated to-surface shadow-xl shadow-black/40 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h4 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
              <Star className="size-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>{SERVICES_SECTION_TEXT.customPackageTitle}</span>
            </h4>
            <p className="text-xs text-text-secondary mt-1 font-light leading-relaxed">
              {SERVICES_SECTION_TEXT.customPackageDesc}
            </p>
          </div>

          <button
            onClick={() => onSelectService("Custom Wedding Package")}
            className="px-6 py-3 rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 transition-all shrink-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
          >
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
