---
name: jeevan-dhara-website
description: >
  Context, conventions, and implementation guidelines for the Jeevan Dhara
  Sansthan NGO website project. Applies whenever working on any file inside
  the "Jeevan Dhara" workspace.
---

# Jeevan Dhara Sansthan — Project Skill

## Organisation Context

| Field | Value |
|---|---|
| Organisation | Jeevan Dhara Sansthan |
| Type | Non-Profit NGO |
| Founded | August 2012 |
| Registration No. | 58/1-8-2012 |
| Certifications | 12AA (Income Tax), 80G(5) (Tax Exemption for Donors) |
| HQ Address | Kolasar Mandi, Bikaner, Rajasthan 334001 |
| Branch | Hanumangarh, Rajasthan |
| Districts Active | Bikaner, Hanumangarh, Sri Ganganagar, Jaipur, Jaisalmer, Jodhpur, Barmer |
| Founder | Mahaveer Upadhyay |
| Focus Areas | Skill Development, WASH, Food Nutrition & Health, Sustainable Livelihood |
| Languages | English + Hindi (bilingual site) |

## Mission / Vision / Values

**Mission:** Empowering women, children & farmers across rural Rajasthan through skill development, hygiene education, nutritional awareness, and sustainable income generation.

**Goal:** Socio-economic & skill development of marginalized rural communities.

**Values:** Honesty · Transparency · Mutual Respect · Participation · Solidarity

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 (via `@import "tailwindcss"` in globals.css)
- **Fonts:** `Playfair Display` (serif, headings) + `Inter` (sans-serif, body) — loaded via `next/font/google`
- **i18n:** Custom `translations.ts` dictionary — no external i18n library
- **Types:** Centralized in `src/types/index.ts`
- **Env:** Zod-validated via `src/lib/env.ts`

---

## Design System

### Color Tokens (defined in `globals.css` `@theme`)

| Token | Hex | Usage |
|---|---|---|
| `terracotta` / `terracotta-500` | `#B85042` | Primary brand color, headings, primary buttons |
| `amber` / `amber-500` | `#E7A93B` | Donate CTA, highlighted accents |
| `sage` / `sage-400` | `#A7BEA9` | Secondary UI, borders, success states |
| `cream` / `cream-200` | `#F7F5F0` | Page background |
| `dark` | `#2B2D2F` | Body text |

**Never use generic `blue`, `red`, `green` from Tailwind defaults.** Always use the custom palette above.

### Typography

- `font-serif` or `font-playfair` -> headings, founder quotes, hero titles
- `font-sans` / `font-inter` -> body text, labels, navigation
- Tone: grounded, humble, warm — avoid aggressive corporate language

### Shadows & Borders

- Cards: `shadow-md border border-sage-200`
- Hover: `hover:shadow-lg hover:border-amber-400`
- Buttons primary: `bg-terracotta text-white hover:bg-terracotta-600`
- Buttons secondary: `border-2 border-sage-700 text-sage-900 hover:bg-sage-100`
- CTA (Donate): `bg-amber text-dark hover:bg-amber-600`

---

## Component Library (src/components/)

| Component | Status | Purpose |
|---|---|---|
| `Header.tsx` | Built | Sticky nav, language toggle, Donate button |
| `HeroSection.tsx` | Built | Full-width hero with headline + CTAs |
| `ImpactStatsSection.tsx` | Needs update | Credibility strip: Est. 2012, 7 Districts, 2 Branches, 80G |
| `AboutSnapshot.tsx` | TODO | Founder story snapshot + photo |
| `ProgrammesSection.tsx` | TODO | 4-card grid of programme areas |
| `WhereWeWork.tsx` | TODO | 7 Rajasthan districts visual |
| `ValuesStrip.tsx` | TODO | 5 values icon row |
| `GetInvolved.tsx` | TODO | 3 CTA cards: Donate, Volunteer, Partner |
| `Footer.tsx` | TODO | Full footer with registration, addresses |

---

## Site Map / Pages

```
/                     -> Home (all homepage sections assembled)
/about                -> About Us (History, Founder, Vision/Mission, Values)
/our-work             -> Our Work / Programmes (4 programme areas)
/where-we-work        -> Where We Work (7 districts)
/get-involved         -> Get Involved / Donate
/contact              -> Contact / Reach Us
```

### Homepage Section Build Order (top to bottom)

1. Header — sticky nav + donate button
2. HeroSection — full-width, mission headline, Donate + See Our Work CTAs
3. TrustStrip — Est. 2012, 7 Districts, 2 Branches, 80G Tax-Exempt
4. AboutSnapshot — founder snippet + "Read Full Story" link
5. ProgrammesSection — 4 programme cards
6. WhereWeWork — district map/grid
7. ValuesStrip — 5 values icons
8. GetInvolved — 3 CTA cards
9. Footer — addresses, registration, social

---

## i18n Rules

- All user-visible strings MUST go through `translations.ts` — never hardcode English text directly in JSX.
- Language type: `"en" | "hi"` (defined in `src/types/index.ts`)
- Language state lives in root `page.tsx` and is passed down as `lang` prop.
- Every component that shows text takes a `lang: Language` prop.
- Hindi text must be included before committing any new section.
- Pattern: `const t = translations[lang].sectionName;`

---

## NGO-Specific Content Rules

1. **Credibility first** — always display 12AA/80G status near donation CTAs.
2. **Donor trust signals** in footer: Registration No., PAN note, 12AA, 80G(5).
3. **Tone is humble and grounded** — no startup-style hype. Reflect the NGO's own value of Honesty.
4. **Programme names are fixed:**
   - Skill Development
   - WASH (Water, Sanitation & Hygiene)
   - Food Nutrition & Health
   - Sustainable Livelihood
5. **Never use CSR/Charkha as primary nav items** — these were from original scaffold, now replaced by the official site map.
6. **Districts are fixed:** Bikaner, Hanumangarh, Sri Ganganagar, Jaipur, Jaisalmer, Jodhpur, Barmer.
7. **Founder name:** Mahaveer Upadhyay — always spelled exactly this way.

---

## Build & Dev Commands

```bash
# Start dev server
cmd /c "npm run dev"

# Build for production verification
cmd /c "npm run build"
```

> Note: Always run via `cmd /c "..."` due to PowerShell execution policy restrictions on this machine.

---

## File Naming Conventions

- Components: `PascalCase.tsx` in `src/components/`
- Pages: `page.tsx` inside `src/app/<route>/`
- Layouts: `layout.tsx` inside `src/app/`
- Types: centralized in `src/types/index.ts`
- Translations: centralized in `src/i18n/translations.ts`
- Images: `public/images/<name>.png` — always use descriptive kebab-case names
