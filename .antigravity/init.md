# 🚀 Antigravity Agent Session Initialization Protocol

This document defines architecture specs, styling standards, and development protocols for the **Brand-Agnostic Photography Portfolio** repository.

---

## 📌 1. Technical Stack & Standards

- **Framework**: Next.js 16 (App Router + Turbopack)
- **React**: React 19
- **Styling**: Tailwind CSS v4 (Primary) + Utility Declarations (`app/globals.css`)
- **Animation**: Framer Motion 13 (`framer-motion`), AOS (`aos`)
- **Icons**: Lucide React (`lucide-react`)
- **Testing**: Vitest + React Testing Library (`npm test`)

---

## ⚙️ 2. Core Architecture Rules & DRY Principles

1. **Centralized Data Hub (`data/portfolioData.ts`) [DRY Rule]**:
   - **Never hardcode brand details**, phone numbers, email addresses, studio locations, or section copy in components or tests.
   - All studio details live in `STUDIO_INFO` inside `data/portfolioData.ts`.
   - Structural text and UI copy are centralized in section constants (`FOOTER_CONTENT`, `HERO_SECTION_TEXT`, `SERVICES_SECTION_TEXT`, `PORTFOLIO_SECTION_TEXT`, `FRAMING_SECTION_TEXT`, `ABOUT_SECTION_TEXT`, `STATS_SECTION_TEXT`, `REVIEWS_SECTION_TEXT`, `CTA_SECTION_TEXT`).
   - Dynamic calculations (`experienceYears`, `currentYear`, `nextYear`, `helplinePrefix`) use standard JavaScript `Date` methods.

2. **Tailwind-First Styling & Zero Conflict Rules**:
   - **Use Tailwind CSS v4 utilities for layout and styling.** Avoid writing manual inline `style={{ ... }}` attributes unless dynamic values (e.g. dynamic width/height percentages or dynamic particle offsets) require runtime evaluation.
   - **Standard Tailwind Spacing Scale**: Always prefer standard Tailwind CSS scale classes over arbitrary pixel brackets by dividing pixel values by 4 (e.g. `p-3` for 12px, `p-4` for 16px, `p-6` for 24px, `gap-4` for 16px). Reserved arbitrary brackets `[...]` are strictly for unique custom bounds.
   - **No CSS Class Conflicts**: Registered `@theme` tokens in `app/globals.css` (`bg-void`, `bg-deep`, `bg-surface`, `bg-elevated`, `bg-card`) must be used directly via Tailwind classes (e.g. `bg-surface`, `bg-elevated`, `bg-card`). Do not combine redundant border or background utility classes on the same element.
   - **Standard Size Utilities**: Use `size-N` (e.g., `size-4`, `size-8`, `size-12`) instead of redundant `w-N h-N`.
   - Single-use styles belong inline as Tailwind CSS classes. Multi-use photography decorators (`photo-badge`, `card-lift`, `film-grain`, `film-strip-top`, `ambient-glow-*`, `glass-panel`) are maintained in `app/globals.css` as clean `@utility` directives.

3. **Reusable Component Architecture (DRY Pattern)**:
   - **Section Headers**: All portfolio content sections (`AboutStudio`, `ServicesSection`, `FramingShowcase`, `PortfolioGallery`, `ReviewsSection`) use `<SectionHeader />` (`components/Common/SectionHeader.tsx`) for consistent badge icons, title highlights, and subtitles.
   - **Hero Layout Stability**: The `Hero` text block uses locked min-height containers (`min-h-[90px] sm:min-h-[130px] lg:min-h-[150px]`) so title and subtitle transitions occur with zero layout shifts, while `min-h-[600px] sm:h-dvh sm:max-h-dvh` guarantees small devices never clip hero controls.

4. **Human-Readable & Optimized Code**:
   - Write clear, self-explanatory variable and function names.
   - Maintain concise JSX blocks without redundant wrapper `div`s.
   - Keep TypeScript types strictly separated in `data/types.ts`.

---

## 🛠️ 3. Verification & Build Commands

Before concluding any task or committing changes, run:

```bash
# 1. Run Vitest component unit test suite
npm test

# 2. Verify TypeScript types and production build compilation
npm run build
```

Expected result: `✓ 13 test files passed` and `✓ Compiled successfully` with `0 errors`.
