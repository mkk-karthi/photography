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
- **Testing Framework**: Vitest (`npx vitest run`) + React Testing Library
- **Developer Credit**: Developed by MKK Creation ([mkkcreation.com](https://mkkcreation.com))

---

## ⚙️ Core Architecture & Conventions

1. **Brand Decoupling & Configuration (`STUDIO_INFO`)**:
   - **Never hardcode brand names, locations, phone numbers, or social handles** inside UI components or metadata.
   - All brand identity attributes are configured in `STUDIO_INFO` inside `data/portfolioData.ts`.
   - UI components must dynamically interpolate values from `STUDIO_INFO`.

2. **Dynamic Date & Year Calculations**:
   - Experience years (`experienceYears`), current booking year (`currentYear`), upcoming year (`nextYear`), and enquiry helpline reference prefixes (`helplinePrefix`) are calculated dynamically via JavaScript `Date` API in `portfolioData.ts`.
   - Do NOT hardcode specific calendar years in UI badges, CTA section headings, or footers.

3. **Data Layer Strict Separation**:
   - `data/portfolioData.ts` holds pure data structures (strings, numbers, simple arrays).
   - `data/types.ts` contains all TypeScript interfaces.
   - Component visual logic (Lucide icons, Framer Motion configs, Tailwind gradient maps) lives inside component files using lookup objects.

4. **State & Modal Flow**:
   - Central state for the `EnquiryModal` lives in `app/page.tsx`.
   - `EnquiryModal` locks body scroll on activation (`document.body.style.overflow = "hidden"`).
   - Modal contains sticky dual-tab navigation ("Photoshoot Consultation" vs. "Photo Frame Order").

5. **Styling & Color Palette**:
   - Backgrounds: Luxury Dark `#09090b` (Main), `#121215` (Surface), `#18181c` (Card).
   - Accents: Amber Gold (`amber-400`, `amber-500`, `#d4af37`), Glassmorphism (`glass-panel`, `glass-nav`).

6. **Animations Protocol**:
   - Use `framer-motion` (`AnimatePresence`, `motion.div`) for dynamic component transitions.
   - Use `AOS` (`data-aos="fade-up"`) for scroll-triggered section entrances.

---

## 🛠️ Verification & Build Commands

Before concluding any coding session or making changes, run:

```bash
# 1. Run Vitest component unit test suite
npx vitest run

# 2. Verify TypeScript types and production build integrity
npm run build
```

Expected result: `✓ 9 test files passed` and `✓ Compiled successfully` with `0 errors`.
