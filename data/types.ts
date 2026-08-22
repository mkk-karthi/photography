// ─────────────────────────────────────────────────────────────────────────────
// types.ts — All shared TypeScript interfaces for the Photography app
// ─────────────────────────────────────────────────────────────────────────────

// ── Portfolio Gallery ─────────────────────────────────────────────────────────

export type PhotoCategory =
  | "wedding"
  | "pre-wedding"
  | "post-wedding"
  | "baby-shower"
  | "bridal"
  | "framing";

export type PhotoAspectRatio =
  | "aspect-[3/4]"
  | "aspect-[4/3]"
  | "aspect-[1/1]"
  | "aspect-[16/9]";

export interface PhotoExif {
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: PhotoCategory;
  categoryLabel: string;
  imageUrl: string;
  aspectRatio: PhotoAspectRatio;
  location: string;
  exif: PhotoExif;
  likes: number;
  featured?: boolean;
  description: string;
}

export interface PortfolioCategory {
  id: string;
  label: string;
}

// ── Services & Framing ────────────────────────────────────────────────────────

export interface FramingOption {
  id: string;
  name: string;
  subtitle: string;
  pricePerSqFt: number;
  basePrice: number;
  description: string;
  features: string[];
  material: string;
  finish: string;
}

export interface FrameSize {
  label: string;
  width: number;
  height: number;
  price: number;
}

export interface SamplePhoto {
  id: string;
  label: string;
  url: string;
  thumb: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: string;
  tagline: string;
  startingPrice: number;
  image: string;
  features: string[];
  recommendedAddons: string[];
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  coupleName: string;
  eventType: string;
  quote: string;
  rating: number;
  date: string;
  avatar: string;
  location: string;
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export interface HeroSlide {
  title: string;
  subtitle: string;
  tag: string;
  bgUrl: string;
}

// ── About Studio ──────────────────────────────────────────────────────────────

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export type PhilosophyIconName = "Shield" | "Clock" | "ThumbsUp";

export interface PhilosophyItem {
  iconName: PhilosophyIconName;
  title: string;
  desc: string;
}

// ── Stats Section ─────────────────────────────────────────────────────────────

export type StatIconName = "Camera" | "Frame" | "Heart" | "Award" | "Star" | "Users";

export interface StatItem {
  iconName: StatIconName;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

// ── CTA / Contact ─────────────────────────────────────────────────────────────

export type ContactIconName = "Phone" | "Mail" | "MapPin" | "Share2";

export interface ContactCard {
  iconName: ContactIconName;
  label: string;
  value: string;
  sublabel: string;
  href: string;
}
