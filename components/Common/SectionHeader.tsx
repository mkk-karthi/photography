"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badgeIcon: LucideIcon;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle?: string;
  className?: string;
  badgeIconClassName?: string;
}

export default function SectionHeader({
  badgeIcon: BadgeIcon,
  badgeText,
  titlePrefix,
  titleHighlight,
  titleSuffix = "",
  subtitle,
  className = "text-center max-w-3xl mx-auto mb-12 sm:mb-16",
  badgeIconClassName = "size-3",
}: SectionHeaderProps) {
  return (
    <div className={className} data-aos="fade-up">
      <div className="photo-badge mb-4">
        <BadgeIcon className={badgeIconClassName} />
        <span>{badgeText}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
        {titlePrefix}{" "}
        <span className="font-serif text-amber-300 italic font-normal">
          {titleHighlight}
        </span>
        {titleSuffix && ` ${titleSuffix}`}
      </h2>

      {subtitle && (
        <p className="text-zinc-500 text-sm sm:text-base mt-4 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
