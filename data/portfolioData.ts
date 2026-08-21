// ─────────────────────────────────────────────────────────────────────────────
// portfolioData.ts — Centralized Content & Configuration Source
// All TypeScript interfaces live in ./types.ts
// ─────────────────────────────────────────────────────────────────────────────

import type {
  PhotoItem,
  FramingOption,
  ServicePackage,
  Testimonial,
  HeroSlide,
  FrameSize,
  SamplePhoto,
  Milestone,
  NavLink,
  PhilosophyItem,
  StatItem,
  ContactCard,
} from "./types";

export type {
  PhotoItem,
  FramingOption,
  ServicePackage,
  Testimonial,
  HeroSlide,
  FrameSize,
  SamplePhoto,
  Milestone,
  NavLink,
  PhilosophyItem,
  StatItem,
  ContactCard,
};

/* ═════════════════════════════════════════════════════════════════════════════
   1. STUDIO IDENTITY & BRAND CONFIGURATION
   Central source of truth for branding, location, contact, and system dates.
   ═════════════════════════════════════════════════════════════════════════════ */

const ESTABLISHED_YEAR = 2014;
const CURRENT_YEAR = new Date().getFullYear();
const EXPERIENCE_YEARS = CURRENT_YEAR - ESTABLISHED_YEAR;

export const STUDIO_INFO = {
  name: "Nanban Photography",
  brandFirstName: "NANBAN",
  brandSecondName: "PHOTOGRAPHY",
  shortName: "Nanban",
  establishedYear: ESTABLISHED_YEAR,
  experienceYears: EXPERIENCE_YEARS,
  currentYear: CURRENT_YEAR,
  nextYear: CURRENT_YEAR + 1,
  tagline: "Preserving Timeless Emotions & Royal Heritage Celebrations",
  phone: "+91 9786152034",
  email: "nanbanphotographyvnr@gmail.com",
  address: "No.60 Keelakadai Street (near Makesh Bakery), Virudhunagar, Tamil Nadu - 626001, India",
  city: "Virudhunagar",
  state: "Tamil Nadu",
  country: "India",
  zipCode: "626001",
  region: "South India",
  instagram: "@nanbanphotography",
  weddingsCovered: "850+",
  framedPrintsDelivered: "4,500+",
  clientSatisfaction: "99.8%",
  helplinePrefix: `NP-${CURRENT_YEAR}`,
};

/* ═════════════════════════════════════════════════════════════════════════════
   2. NAVIGATION & SITE STRUCTURE
   Navbar header links.
   ═════════════════════════════════════════════════════════════════════════════ */

export const NAV_LINKS: NavLink[] = [
  { label: "Home",      href: "#" },
  { label: "Services",  href: "#services" },
  { label: "Portfolio", href: "#gallery" },
  { label: "Framing",   href: "#framing" },
  { label: "About",     href: "#about" },
  { label: "Contact",   href: "#cta" },
];

/* ═════════════════════════════════════════════════════════════════════════════
   3. HERO CAROUSEL CONTENT
   Slides for top landing hero carousel.
   ═════════════════════════════════════════════════════════════════════════════ */

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Royal Wedding Stories",
    subtitle: "Capture Sacred Vows & Haldi Rituals in High Definition",
    tag: "Wedding Photography",
    bgUrl: "/images/hero/hero-1.webp",
  },
  {
    title: "Bridal Elegance & Grace",
    subtitle: "Handcrafted Jewelry & Fine-Art Solo Portraits",
    tag: "Bridal Portraits",
    bgUrl: "/images/hero/hero-2.webp",
  },
  {
    title: "Cinematic Pre-Wedding",
    subtitle: "Mist-covered Hills & Heritage Temple Courtyards",
    tag: "Pre-wedding Photography",
    bgUrl: "/images/hero/hero-3.webp",
  },
  {
    title: "Post-Wedding Shorelines",
    subtitle: "Golden Hour Romance Along Sunlit Ocean Waves",
    tag: "Post-wedding Shoot",
    bgUrl: "/images/hero/hero-4.webp",
  },
  {
    title: "Baby Shower Outdoors",
    subtitle: "Sunlit Maternity Glow in Blooming Nature Gardens",
    tag: "Baby Shower Outdoor",
    bgUrl: "/images/hero/hero-5.webp",
  },
  {
    title: "Photo Framing Studio",
    subtitle: "Ultra-HD Acrylic Glass & Handcrafted Teak Wood Wall Frames",
    tag: "Photo Framing & Prints",
    bgUrl: "/images/hero/hero-6.webp",
  },
];

/* ═════════════════════════════════════════════════════════════════════════════
   4. SERVICE PACKAGES & PRICING
   Service cards with features, add-ons, and pricing.
   ═════════════════════════════════════════════════════════════════════════════ */

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "wedding-royal",
    title: "Royal Wedding Photography",
    category: "wedding",
    tagline: "Comprehensive 2-Day Coverage for Muhurtham & Grand Reception",
    startingPrice: 75000,
    image: "/images/services/service-1.webp",
    features: [
      "2 Senior Candid Photographers + 2 Traditional Photographers",
      "Full HD Cinematic Highlight Reel & 4K Teaser Video",
      "Unlimited High-Res Edited Digital Photos",
      "1 Signature Luxe Leather Lay-Flat Album (40 Spreads)",
      "1 Free 24x36 Premium Acrylic Wall Frame",
    ],
    recommendedAddons: ["Drone Aerial Video", "Live LED Wall Streaming", "Haldi & Sangeet Add-on"],
  },
  {
    id: "pre-wedding-cinematic",
    title: "Cinematic Pre-Wedding Shoot",
    category: "pre-wedding",
    tagline: "Destination & Storytelling Couple Sessions",
    startingPrice: 35000,
    image: "/images/services/service-2.webp",
    features: [
      "Full Day Shoot (2 Scenic Locations)",
      "3 Outfit Changes & Stylist Guidance",
      "50 Retouched High-Resolution Photos",
      "3-Minute Cinematic Story Video (4K)",
      "Includes Drone Overhead Shots",
    ],
    recommendedAddons: ["Resort Rental Assistance", "Hair & Makeup Artist"],
  },
  {
    id: "post-wedding-beach",
    title: "Post-Wedding Beach Shoot",
    category: "post-wedding",
    tagline: "Relaxed Golden Hour Coastal Sunset Moments",
    startingPrice: 30000,
    image: "/images/services/service-3.webp",
    features: [
      "Half-Day Beach & Resort Session",
      "Candid & Posed Couple Portraits",
      "40 Fully Color-Graded Photos",
      "Digital Gallery with Mobile App Download",
      "1 Teak Wood Framed Print (16x24 inch)",
    ],
    recommendedAddons: ["Underwater / Shoreline Drone"],
  },
  {
    id: "baby-shower-outdoor",
    title: "Baby Shower Outdoor Shoot",
    category: "baby-shower",
    tagline: "Maternity Bliss & Nature Sunlit Portraits",
    startingPrice: 25000,
    image: "/images/services/service-4.webp",
    features: [
      "Outdoor Garden / Farmstead Venue Shoot",
      "Maternity Props & Floral Decoration Support",
      "Family & Couple Candid Shots",
      "35 Edited HD Photos",
      "1 Mini Softcover Gift Album",
    ],
    recommendedAddons: ["Traditional Indoor Seemantham Setup"],
  },
  {
    id: "bridal-portraits",
    title: "Bridal Studio & Location Portraits",
    category: "bridal",
    tagline: "Solo Heritage Portraits Celebrating Jewellery & Attire",
    startingPrice: 20000,
    image: "/images/services/service-5.webp",
    features: [
      "3-Hour Dedicated Solo Bridal Session",
      "Macro Jewellery Focus & Silhouette Lighting",
      "25 Fine-Art Retouched Images",
      "RAW Photo Access",
      "1 Table-top Acrylic Canvas Frame",
    ],
    recommendedAddons: ["HD Slow-Motion Jewelry Reel"],
  },
  {
    id: "framing-custom",
    title: "Custom Photo Framing & Albums",
    category: "framing",
    tagline: "Turn Memories into Archival Heritage Wall Art",
    startingPrice: 2999,
    image: "/images/services/service-6.webp",
    features: [
      "Choice of Optical Acrylic, Teak Wood, Canvas or Leather Albums",
      "Archival Pigment Printing (Fading-proof for 100+ years)",
      "Free In-Home Framing Consultation & Mounting Advice",
      "Custom Sizing up to 48x72 inches",
      "Doorstep Safe Pan-India Delivery",
    ],
    recommendedAddons: ["Anti-Glare Museum Glass Upgrade"],
  },
];

/* ═════════════════════════════════════════════════════════════════════════════
   5. PORTFOLIO GALLERY & CATEGORIES
   Filter categories & photo items.
   ═════════════════════════════════════════════════════════════════════════════ */

export const PORTFOLIO_CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "wedding", label: "Wedding Photography" },
  { id: "pre-wedding", label: "Pre-Wedding Shoot" },
  { id: "post-wedding", label: "Post-Wedding Beach" },
  { id: "baby-shower", label: "Baby Shower Outdoor" },
  { id: "bridal", label: "Bridal Portraits" },
  { id: "framing", label: "Photo Framing & Wall Art" },
];

export const PORTFOLIO_PHOTOS: PhotoItem[] = [
  // Wedding
  {
    id: "w1",
    title: "Royal Muhurtham Vows",
    category: "wedding",
    categoryLabel: "Wedding Photography",
    imageUrl: "/images/portfolio/portfolio-1.webp",
    aspectRatio: "aspect-[3/4]",
    location: "Chennai Palace, TN",
    exif: {
      camera: "Sony Alpha 1",
      lens: "FE 85mm f/1.2 GM",
      aperture: "f/1.4",
      shutter: "1/500s",
      iso: "ISO 200",
    },
    likes: 342,
    featured: true,
    description: "A tender emotional moment during the sacred mangalsutra tying ritual amidst cascading marigold flora.",
  },
  {
    id: "w2",
    title: "The Haldi Golden Shower",
    category: "pre-wedding",
    categoryLabel: "Pre-Wedding Photography",
    imageUrl: "/images/portfolio/portfolio-2.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Madurai Heritage Resort",
    exif: {
      camera: "Canon EOS R3",
      lens: "RF 50mm f/1.2L",
      aperture: "f/1.8",
      shutter: "1/1000s",
      iso: "ISO 100",
    },
    likes: 289,
    featured: true,
    description: "Burst of laughter and radiant turmeric joy surrounded by close family members.",
  },
  {
    id: "w3",
    title: "Grand Evening Reception Entrance",
    category: "wedding",
    categoryLabel: "Wedding Photography",
    imageUrl: "/images/portfolio/portfolio-3.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Coimbatore Convention Center",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 24-70mm f/2.8 GM II",
      aperture: "f/2.8",
      shutter: "1/250s",
      iso: "ISO 400",
    },
    likes: 415,
    featured: false,
    description: "Sparklers lit up the night sky as the newlywed couple made their grand ballroom walk.",
  },
  {
    id: "w4",
    title: "Sangeet Celebration Dance",
    category: "wedding",
    categoryLabel: "Sangeet & Dance",
    imageUrl: "/images/portfolio/portfolio-4.webp",
    aspectRatio: "aspect-[3/4]",
    location: "Virudhunagar Palace Hall",
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 35mm f/1.4",
      aperture: "f/2.0",
      shutter: "1/500s",
      iso: "ISO 800",
    },
    likes: 368,
    featured: false,
    description: "High-energy joyful dance performances captured with vivid dynamic stage lighting.",
  },

  // Bridal Portraits
  {
    id: "b1",
    title: "Temple Jewelry & Temple Grace",
    category: "bridal",
    categoryLabel: "Bridal Portraits",
    imageUrl: "/images/portfolio/portfolio-5.webp",
    aspectRatio: "aspect-[3/4]",
    location: "Virudhunagar Studio",
    exif: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      aperture: "f/2.5",
      shutter: "1/160s",
      iso: "ISO 64",
    },
    likes: 512,
    featured: true,
    description: "Close-up solo portrait capturing intricate handcrafted Kundan and gold temple ornaments.",
  },
  {
    id: "b2",
    title: "Kanjivaram Silk Drapery",
    category: "bridal",
    categoryLabel: "Bridal Portraits",
    imageUrl: "/images/portfolio/portfolio-6.webp",
    aspectRatio: "aspect-[3/4]",
    location: "Karaikudi Chettinad Mansion",
    exif: {
      camera: "Sony A7 IV",
      lens: "FE 135mm f/1.8 GM",
      aperture: "f/1.8",
      shutter: "1/400s",
      iso: "ISO 100",
    },
    likes: 388,
    featured: false,
    description: "Sunlight filtering through carved wooden pillars illuminating traditional crimson silk.",
  },
  {
    id: "b3",
    title: "The Bride's Reflection",
    category: "bridal",
    categoryLabel: "Bridal Portraits",
    imageUrl: "/images/portfolio/portfolio-7.webp",
    aspectRatio: "aspect-[3/4]",
    location: "Virudhunagar Studio",
    exif: {
      camera: "Canon R5",
      lens: "RF 85mm f/1.2 L USM DS",
      aperture: "f/1.2",
      shutter: "1/320s",
      iso: "ISO 100",
    },
    likes: 476,
    featured: true,
    description: "Quiet contemplative moment of anticipation as the bride finalizes her veil.",
  },
  {
    id: "b4",
    title: "Mehndi Henna Art Detail",
    category: "wedding",
    categoryLabel: "Haldi & Rituals",
    imageUrl: "/images/portfolio/portfolio-8.webp",
    aspectRatio: "aspect-[16/9]",
    location: "Madurai Heritage Villa",
    exif: {
      camera: "Sony A7R IV",
      lens: "FE 90mm f/2.8 Macro",
      aperture: "f/2.8",
      shutter: "1/200s",
      iso: "ISO 100",
    },
    likes: 410,
    featured: false,
    description: "Macro fine-art shot highlighting intricate bridal henna patterns.",
  },

  // Pre-Wedding
  {
    id: "pw1",
    title: "Cinematic Misty Hills Romance",
    category: "pre-wedding",
    categoryLabel: "Pre-Wedding Photography",
    imageUrl: "/images/portfolio/portfolio-9.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Kodaikanal Pine Forest",
    exif: {
      camera: "Sony A1",
      lens: "FE 35mm f/1.4 GM",
      aperture: "f/1.4",
      shutter: "1/800s",
      iso: "ISO 100",
    },
    likes: 620,
    featured: true,
    description: "Dreamy early morning session tucked away in the foggy pine canopy.",
  },
  {
    id: "pw2",
    title: "Ancient Architecture Romance",
    category: "pre-wedding",
    categoryLabel: "Pre-Wedding Photography",
    imageUrl: "/images/portfolio/portfolio-10.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Thanjavur Temple Courtyard",
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 50mm f/1.2 S",
      aperture: "f/2.0",
      shutter: "1/1250s",
      iso: "ISO 64",
    },
    likes: 310,
    featured: false,
    description: "Symmetric historic pillar composition accentuating the couple's graceful pose.",
  },

  // Post-Wedding
  {
    id: "post1",
    title: "Golden Hour Coastal Escape",
    category: "post-wedding",
    categoryLabel: "Post-Wedding Photoshoot Beach",
    imageUrl: "/images/portfolio/portfolio-11.webp",
    aspectRatio: "aspect-[16/9]",
    location: "Rameswaram Beach Coast",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 24mm f/1.4 GM",
      aperture: "f/2.0",
      shutter: "1/640s",
      iso: "ISO 100",
    },
    likes: 540,
    featured: true,
    description: "Barefoot laughter alongside soft ocean waves at sunset.",
  },
  {
    id: "post2",
    title: "Sunset Serenade by the Sea",
    category: "post-wedding",
    categoryLabel: "Post-Wedding Photoshoot Beach",
    imageUrl: "/images/portfolio/portfolio-12.webp",
    aspectRatio: "aspect-[3/4]",
    location: "Kanyakumari Shoreline",
    exif: {
      camera: "Canon R6 II",
      lens: "RF 70-200mm f/2.8L",
      aperture: "f/2.8",
      shutter: "1/500s",
      iso: "ISO 200",
    },
    likes: 295,
    featured: false,
    description: "Warm amber glow reflecting on wet sand during post-wedding getaway.",
  },

  // Baby Shower Outdoor
  {
    id: "bs2",
    title: "Nature's Blessing Maternity",
    category: "baby-shower",
    categoryLabel: "Baby Shower Outdoor Photos",
    imageUrl: "/images/portfolio/portfolio-13.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Virudhunagar Farmstead",
    exif: {
      camera: "Canon R5",
      lens: "RF 50mm f/1.2L",
      aperture: "f/1.8",
      shutter: "1/800s",
      iso: "ISO 100",
    },
    likes: 330,
    featured: false,
    description: "Peaceful family outdoor portrait under golden hour canopy.",
  },
  {
    id: "bs3",
    title: "Garden Celebration Glow",
    category: "baby-shower",
    categoryLabel: "Baby Shower Outdoor Photos",
    imageUrl: "/images/portfolio/portfolio-14.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Madurai Private Garden",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 135mm f/1.8 GM",
      aperture: "f/2.0",
      shutter: "1/640s",
      iso: "ISO 100",
    },
    likes: 390,
    featured: false,
    description: "Vibrant yellow floral arrangements framing radiant expectant parents.",
  },

  // Framing & Art Prints
  {
    id: "fr1",
    title: "Living Room Acrylic Masterpiece",
    category: "framing",
    categoryLabel: "Photo Framing & Prints",
    imageUrl: "/images/portfolio/portfolio-15.webp",
    aspectRatio: "aspect-[1/1]",
    location: "Client Residence, Madurai",
    exif: {
      camera: "Nanban Print Studio",
      lens: "6mm Optical Glass",
      aperture: "N/A",
      shutter: "UV Resistant",
      iso: "Archival Quality",
    },
    likes: 420,
    featured: true,
    description: "60x40 inch custom borderless acrylic photo wall installation.",
  },
  {
    id: "fr2",
    title: "Chettinad Teak Wood Gallery Wall",
    category: "framing",
    categoryLabel: "Photo Framing & Prints",
    imageUrl: "/images/portfolio/portfolio-16.webp",
    aspectRatio: "aspect-[4/3]",
    location: "Client Villa, Chennai",
    exif: {
      camera: "Nanban Print Studio",
      lens: "Handmade Teak Wood",
      aperture: "N/A",
      shutter: "Museum Mat",
      iso: "Lifetime Warranty",
    },
    likes: 390,
    featured: false,
    description: "Trio set of framed bridal portraits with double acid-free mat board.",
  },
];

/* ═════════════════════════════════════════════════════════════════════════════
   6. CUSTOM PHOTO FRAMING CATALOG
   Materials, frame sizes, and sample photo previews.
   ═════════════════════════════════════════════════════════════════════════════ */

export const FRAMING_OPTIONS: FramingOption[] = [
  {
    id: "acrylic-luxe",
    name: "Ultra-HD Premium Acrylic Framing",
    subtitle: "Modern Rimless Glass Look with 3D Depth",
    pricePerSqFt: 650,
    basePrice: 4999,
    description: "Museum-grade shatterproof acrylic glass bonded with archival metallic paper. Delivers unbelievable color saturation and deep shadow contrast.",
    features: [
      "99% UV Protection Coating",
      "Diamond-Polished Beveled Edges",
      "Hidden Aluminum Backing Float Mount",
      "Scratch Resistant Hard-coat",
      "Lifetime Color Guarantee",
    ],
    material: "6mm Optical Grade Acrylic",
    finish: "High-Gloss Crystal",
  },
  {
    id: "teak-wood",
    name: "Heritage Teak Wood Handmade Frame",
    subtitle: "Classic Vintage Elegance for Royal Portraits",
    pricePerSqFt: 550,
    basePrice: 3999,
    description: "Hand-carved solid South Indian Teak Wood with antique matte wax finish. Includes double acid-free archival matting board.",
    features: [
      "100% Solid Teak Wood",
      "Anti-Reflective Italian Glass",
      "Acid-Free Cotton Mat Board",
      "Hand-Stained Natural Grain",
      "Durable Corner Splines",
    ],
    material: "Seasoned Teak Wood",
    finish: "Hand-Rubbed Matte Wax",
  },
  {
    id: "canvas-wrap",
    name: "Museum Canvas Fine Art Gallery Wrap",
    subtitle: "Textured Oil-Painting Effect for Grand Walls",
    pricePerSqFt: 450,
    basePrice: 2999,
    description: "100% Cotton canvas stretched over dried kiln wooden stretcher bars. Ideal for large living room focal statements.",
    features: [
      "400 GSM 100% Cotton Canvas",
      "Satin Protective Varnish",
      "1.5 inch Heavy-Duty Pine Frame",
      "Fading Resistant Pigment Inks",
      "Ready to Hang Wire Kit",
    ],
    material: "Cotton Canvas & Pine Wood",
    finish: "Soft Satin Grain",
  },
  {
    id: "royal-album",
    name: "Luxe Handcrafted Flush Mount Album",
    subtitle: "Italian Leather Cover & Seamless Lay-flat Pages",
    pricePerSqFt: 0,
    basePrice: 14999,
    description: "Custom leather-bound heirlooms printed on thermal silk paper. Water-resistant, unbreakable pages designed to endure for generations.",
    features: [
      "Italian Nappa Leather Cover",
      "Custom Engraved Gold Foil Name",
      "Velvet Presentation Box",
      "25 Spread Lay-Flat Seamless Pages",
      "Fuji Crystal Archival Silk Paper",
    ],
    material: "Italian Leather & Silk Paper",
    finish: "Metallic Embossed",
  },
];

export const FRAME_SIZES: FrameSize[] = [
  { label: '6" x 4"', width: 6, height: 4, price: 100 },
  { label: '8" x 6"', width: 8, height: 6, price: 250 },
  { label: '10" x 8"', width: 10, height: 8, price: 350 },
  { label: '12" x 8"', width: 12, height: 8, price: 450 },
  { label: '10" x 12"', width: 10, height: 12, price: 500 },
  { label: '10" x 15"', width: 10, height: 15, price: 650 },
  { label: '12" x 15"', width: 12, height: 15, price: 750 },
  { label: '12" x 18"', width: 12, height: 18, price: 850 },
  { label: '12" x 24"', width: 12, height: 24, price: 1100 },
  { label: '20" x 16"', width: 20, height: 16, price: 1500 },
  { label: '20" x 24"', width: 20, height: 24, price: 1700 },
  { label: '24" x 16"', width: 24, height: 16, price: 1600 },
  { label: '20" x 30"', width: 20, height: 30, price: 2200 },
  { label: '24" x 36"', width: 24, height: 36, price: 3000 },
  { label: '30" x 40"', width: 30, height: 40, price: 3500 },
];

export const SAMPLE_PHOTOS: SamplePhoto[] = [
  {
    id: "wedding",
    label: "Royal Wedding",
    url: "/images/samples/sample-1.webp",
    thumb: "/images/samples/sample-1.webp",
  },
  {
    id: "bridal",
    label: "Bridal Portrait",
    url: "/images/samples/sample-2.webp",
    thumb: "/images/samples/sample-2.webp",
  },
  {
    id: "baby-shower",
    label: "Baby Shower Outdoor",
    url: "/images/samples/sample-3.webp",
    thumb: "/images/samples/sample-3.webp",
  },
];

/* ═════════════════════════════════════════════════════════════════════════════
   7. ABOUT STUDIO & PHILOSOPHY
   Studio milestones, philosophy pillars, and specialties.
   ═════════════════════════════════════════════════════════════════════════════ */

export const STUDIO_MILESTONES: Milestone[] = [
  {
    year: `${STUDIO_INFO.establishedYear}`,
    title: `Studio Founded in ${STUDIO_INFO.city}`,
    desc: "Started as a passionate wedding photography team focusing on candid traditional rituals.",
  },
  {
    year: "2018",
    title: "Destination & Coastal Expansion",
    desc: `Introduced cinematic pre-wedding & beach post-wedding shoots across ${STUDIO_INFO.state} & ${STUDIO_INFO.region}.`,
  },
  {
    year: "2021",
    title: "In-House Custom Framing Workshop",
    desc: `Established our signature Ultra-HD Acrylic & ${STUDIO_INFO.region} Teak Wood framing studio.`,
  },
  {
    year: `${new Date().getFullYear()}`,
    title: `${STUDIO_INFO.weddingsCovered} Weddings & ${STUDIO_INFO.framedPrintsDelivered} Wall Frames`,
    desc: `Celebrating ${STUDIO_INFO.experienceYears} years of timeless storytelling and client trust.`,
  },
];

export const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    iconName: "Aperture",
    title: "Artistic Vision",
    desc: "We approach every frame with a cinematic eye — capturing raw emotion, light, and cultural depth.",
  },
  {
    iconName: "Film",
    title: "Cinematic Storytelling",
    desc: "4K highlight reels and photo narratives that unfold like short films — timeless and emotional.",
  },
  {
    iconName: "Mountain",
    title: "Destination Specialists",
    desc: "From Kodaikanal misty hills to Rameswaram beaches — we travel across South India with you.",
  },
];

export const STUDIO_SPECIALTIES: string[] = [
  "Royal Wedding Photography",
  "Cinematic Pre-Wedding Shoots",
  "Post-Wedding Beach Shoots",
  "Baby Shower Outdoor Sessions",
  "Bridal Solo Portraits",
  "Custom Acrylic & Teak Framing",
  "4K Cinematic Highlight Films",
  "Drone Aerial Photography",
];

/* ═════════════════════════════════════════════════════════════════════════════
   8. STATS & TRUST INDICATORS
   Numerical metrics and trust badges.
   ═════════════════════════════════════════════════════════════════════════════ */

export const STUDIO_STATS: StatItem[] = [
  { iconName: "Camera", value: 850,  suffix: "+",     label: "Weddings Covered",      sublabel: "From intimate to grand royal ceremonies" },
  { iconName: "Frame",  value: 4500, suffix: "+",     label: "Wall Frames Delivered",  sublabel: `Acrylic, teak & canvas across ${STUDIO_INFO.region}` },
  { iconName: "Heart",  value: 99,   suffix: ".8%",   label: "Client Satisfaction",    sublabel: "Verified across 850+ event families" },
  { iconName: "Award",  value: STUDIO_INFO.experienceYears, suffix: "+ Yrs", label: "Years of Excellence", sublabel: `Founded ${STUDIO_INFO.establishedYear}, ${STUDIO_INFO.city}, ${STUDIO_INFO.state}` },
  { iconName: "Star",   value: 5,    suffix: "★",     label: "Average Rating",         sublabel: "Google & Instagram verified reviews" },
  { iconName: "Users",  value: 6,    suffix: "+",     label: "Expert Photographers",   sublabel: "Candid, traditional & drone specialists" },
];

export const TRUST_BADGES: string[] = [
  `✦ Established ${STUDIO_INFO.establishedYear}`,
  `✦ ${STUDIO_INFO.city}, ${STUDIO_INFO.state}`,
  `✦ Serving All of ${STUDIO_INFO.region}`,
  "✦ 4K Cinematic Delivery",
  "✦ Drone Certified",
];

/* ═════════════════════════════════════════════════════════════════════════════
   9. CLIENT TESTIMONIALS & REVIEWS
   Verified client reviews.
   ═════════════════════════════════════════════════════════════════════════════ */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    coupleName: "Karthik & Ananya",
    eventType: "Wedding & Pre-Wedding",
    quote: `Nanban Photography made our wedding in ${STUDIO_INFO.city} feel like a fairytale. The candid emotions captured during our Muhurtham and the acrylic frames delivered to our home are breathtaking!`,
    rating: 5,
    date: "Jan 2026",
    avatar: "/images/testimonials/avatar-1.webp",
    location: STUDIO_INFO.city,
  },
  {
    id: "t2",
    coupleName: "Siddharth & Meera",
    eventType: "Post-Wedding Beach Shoot",
    quote: "The post-wedding beach shoot at sunset was so relaxed and comfortable. Their drone shots and sunset color grading look like cinema scenes!",
    rating: 5,
    date: "Dec 2025",
    avatar: "/images/testimonials/avatar-2.webp",
    location: "Rameswaram",
  },
  {
    id: "t3",
    coupleName: "Dr. Rajesh & Divya",
    eventType: "Baby Shower Outdoor & Framing",
    quote: "We opted for their outdoor garden baby shower photoshoot. The team was so patient with us. The Teak wood frame in our baby nursery is our favorite piece of art.",
    rating: 5,
    date: "Nov 2025",
    avatar: "/images/testimonials/avatar-3.webp",
    location: "Madurai",
  },
];

/* ═════════════════════════════════════════════════════════════════════════════
   10. CONTACT, CTA & ENQUIRY CONFIG
   Availability callouts, contact cards, and modal options.
   ═════════════════════════════════════════════════════════════════════════════ */

export const AVAILABILITY_ITEMS: string[] = [
  "✦ Wedding Dates Open",
  "✦ Pre-Wedding Slots Available",
  "✦ Baby Shower Bookings",
  "✦ Framing Orders Accepted",
];

export const CONTACT_CARDS: ContactCard[] = [
  { iconName: "Phone",  label: "Call Us",         value: STUDIO_INFO.phone,     sublabel: "Mon–Sat, 9am–8pm IST",    href: `tel:${STUDIO_INFO.phone.replace(/\s+/g, "")}` },
  { iconName: "Mail",   label: "Email",            value: STUDIO_INFO.email,     sublabel: "We reply within 24 hours", href: `mailto:${STUDIO_INFO.email}` },
  { iconName: "MapPin", label: "Studio Location",  value: STUDIO_INFO.city,       sublabel: `${STUDIO_INFO.state} – ${STUDIO_INFO.zipCode}, ${STUDIO_INFO.country}`, href: `https://maps.google.com/?q=${encodeURIComponent(STUDIO_INFO.city + ", " + STUDIO_INFO.state)}` },
  { iconName: "Share2", label: "Instagram",        value: STUDIO_INFO.instagram,  sublabel: "Follow our latest work",   href: `https://instagram.com/${STUDIO_INFO.instagram.replace("@", "")}` },
];

export const SHOOT_TYPES: string[] = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Post-Wedding Beach Shoot",
  "Baby Shower Outdoor",
  "Bridal Portraits",
];

export const FRAMING_MATERIALS: string[] = [
  "Ultra-HD Premium Acrylic Framing",
  "Heritage Teak Wood Handmade Frame",
  "Museum Canvas Fine Art Gallery Wrap",
  "Luxe Handcrafted Flush Mount Album",
];

/** Human-readable frame size labels with price for the enquiry form dropdown. */
export const ENQUIRY_FRAME_SIZES: string[] = FRAME_SIZES.map(
  (s) => `${s.label} (₹${s.price})`
);
