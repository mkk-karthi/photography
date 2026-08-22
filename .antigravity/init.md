# 🚀 Antigravity Agent Session Initialization Protocol

This configuration file defines project context, technical rules, and architecture specs for Antigravity AI agent sessions operating within this **Brand-Agnostic Photography Portfolio** repository.

---

## 📌 Project Context & Metadata

- **Project Name**: Dynamic Photography & Photo Framing Studio Portfolio Template
- **Location**: `/var/www/html/react/photography`
- **Primary OS**: Linux (Ubuntu/Debian)
- **Framework**: Next.js 16.3.1 (App Router + Turbopack)
- **React Version**: React 19.2.8
- **Styling**: Tailwind CSS v4 + Vanilla CSS (`app/globals.css`)
- **Animation Libraries**: Framer Motion 13 (`framer-motion`), AOS (`aos`)
- **Icons**: Lucide React (`lucide-react`)
- **Testing Framework**: Vitest (`npm test`) + React Testing Library
- **Developer Credit**: Developed by MKK Creation ([mkkcreation.com](https://mkkcreation.com))

---

## ⚙️ Core Architecture & Conventions

1. **Brand Decoupling & Centralized Data Hub (`data/portfolioData.ts`)**:
   - **Never hardcode brand names, locations, phone numbers, email, social handles, or UI copy** inside UI components or test files.
   - All brand identity attributes are configured in `STUDIO_INFO` inside `data/portfolioData.ts`.
   - Structural text and UI copy are centralized in section constants (`FOOTER_CONTENT`, `HERO_SECTION_TEXT`, `SERVICES_SECTION_TEXT`, `PORTFOLIO_SECTION_TEXT`, `FRAMING_SECTION_TEXT`, `ABOUT_SECTION_TEXT`, `STATS_SECTION_TEXT`, `REVIEWS_SECTION_TEXT`, `CTA_SECTION_TEXT`).
   - UI components and test files (`__tests__/*.test.tsx`) must dynamically import and reference `portfolioData.ts`.

2. **Dynamic Date & Year Calculations**:
   - Experience years (`experienceYears`), current booking year (`currentYear`), upcoming year (`nextYear`), and helpline reference prefixes (`helplinePrefix`) are dynamically calculated via JavaScript `Date` API in `portfolioData.ts`.
   - Do NOT hardcode specific calendar years in UI badges, CTA section headings, footers, or tests.

3. **Data Layer Strict Separation**:
   - `data/portfolioData.ts` holds pure data structures (strings, numbers, simple arrays).
   - `data/types.ts` contains all TypeScript interfaces.
   - Component visual logic (Lucide icons, Framer Motion configs, Tailwind gradient maps) lives inside component files using lookup objects.

4. **State & Modal Flow**:
   - Central state for `EnquiryModal` lives in `app/page.tsx`.
   - `EnquiryModal` locks body scroll on activation (`document.body.style.overflow = "hidden"`).
   - Modal backdrop centering uses `fixed inset-0 min-h-full my-auto` positioning to prevent mobile viewport shaking on Android Chrome address bar toggles.
   - Modal contains sticky dual-tab navigation ("Photoshoot Consultation" vs. "Photo Frame Order").

5. **Styling & Color Palette**:
   - Backgrounds: Midnight Slate-Blue `bg-zinc-950` (Main), `bg-zinc-900` (Surface/Cards).
   - Accents: Amber Gold (`amber-400`, `amber-500`, `#d4af37`), Glassmorphism (`glass-panel`, `glass-nav`).
   - **Tailwind CSS v4 Utilities**: Use standard `size-N` utilities for equal width and height (e.g. `size-4`, `size-5`, `size-8`, `size-12`, `size-96`) instead of redundant `w-N h-N`.

6. **Animations & Media Protocol**:
   - Use `framer-motion` (`AnimatePresence`, `motion.div`) for dynamic component transitions.
   - Use `AOS` (`data-aos="fade-up"`) for scroll-triggered section entrances.
   - All portfolio and hero images use high-performance WebP format (`.webp`).

---

## 🛠️ Verification & Build Commands

Before concluding any coding session or making changes, run:

```bash
# 1. Run Vitest component unit test suite
npm test

# 2. Verify TypeScript types and production build integrity
npm run build
```

Expected result: `✓ 13 test files passed` and `✓ Compiled successfully` with `0 errors`.
