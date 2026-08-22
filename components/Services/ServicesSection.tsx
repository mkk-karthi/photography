"use client";

import React from "react";
import { SERVICE_PACKAGES, SERVICES_SECTION_TEXT } from "@/data/portfolioData";
import { Camera, CheckCircle2, Sparkles, ArrowRight, Star } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/3 left-0 size-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 size-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera className="size-3.5" />
            <span>{SERVICES_SECTION_TEXT.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {SERVICES_SECTION_TEXT.titlePrefix}{" "}
            <span className="font-serif text-amber-300 italic font-normal">
              {SERVICES_SECTION_TEXT.titleHighlight}
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light leading-relaxed">
            {SERVICES_SECTION_TEXT.subtitle}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <div
              key={pkg.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-zinc-800 hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 bg-zinc-950/80"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Price Tag Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-amber-300 font-extrabold text-xs border border-amber-500/40 shadow-lg">
                      From ₹{pkg.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-amber-400 font-medium italic mb-4">
                    &quot;{pkg.tagline}&quot;
                  </p>

                  {/* Package Inclusions List */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      Package Includes:
                    </p>
                    {pkg.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs/5 text-zinc-300 font-light"
                      >
                        <CheckCircle2 className="size-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons */}
                  {pkg.recommendedAddons.length > 0 && (
                    <div className="pt-4 border-t border-zinc-800/80 mb-2">
                      <p className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles className="size-3" />
                        <span>Popular Add-ons</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.recommendedAddons.map((addon, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-medium"
                          >
                            + {addon}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectService(pkg.title)}
                  className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-linear-to-r hover:from-amber-400 hover:to-amber-500 text-zinc-200 hover:text-black font-bold text-xs uppercase tracking-wider border border-zinc-800 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Event Notice Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/20 bg-zinc-950/90 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left max-w-xl">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Star className="size-4 text-amber-400 fill-amber-400" />
              <span>{SERVICES_SECTION_TEXT.customPackageTitle}</span>
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">
              {SERVICES_SECTION_TEXT.customPackageDesc}
            </p>
          </div>

          <button
            onClick={() => onSelectService("Custom Wedding Package")}
            className="px-6 py-3 rounded-full bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shrink-0 shadow-lg shadow-amber-500/20"
          >
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
