# Ameema Waheed — Personal Portfolio

An Awwwards-inspired "Site of the Day" quiet-luxury personal portfolio website for **Ameema Waheed**, Full Stack Developer.

Engineered with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling. The site adheres to a strict monochrome palette (white, black, and warm off-white `#f4f2ee`), with brand logos keeping their official colors and soft brand-tint glows.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested on Node v22.20.0)
- npm 9+
- Python 3.10+ with `ffmpeg` and `numpy` (for hero video processing pipeline)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

---

## 2. Sections Table

| # | Section | Component | Description & Key Interaction |
|---|---------|-----------|--------------------------------|
| **4.0** | **Navigation** | `src/components/Navigation.tsx` | Frosted pill, sliding active ink indicator, 2px top scroll-progress bar, 360° spinning AW mark, mobile clip-path overlay. |
| **4.1** | **Hero** | `src/components/hero/Hero.tsx` | Seamless looping video (`mix-blend-mode: multiply`), sound toggle (`▶` / `❚❚`) with autoplay-blocked ping ring, outlined ghost name, CTAs. |
| **4.2** | **About** | `src/components/sections/AboutSection.tsx` | 3-column layout with a realistic hanging lanyard ID card (damped pendulum spring physics + 3D flip front/back). |
| **4.3** | **Skills** | `src/components/sections/SkillsSection.tsx` | "Periodic table of my stack": 8-column element grid, category filter chips, diagonal wave reveal, sticky 320px element inspector with 150px logo pop. |
| **4.4** | **Work** | `src/components/sections/WorkSection.tsx` | Expanding horizontal accordion (`flex: 8` active, slim spines with rotating `+`), pure CSS/JSX grayscale illustrative mini-UIs. |
| **4.5** | **Certifications** | `src/components/sections/CertificationsSection.tsx` | White band with hairline borders, sticky heading, ink-flood hover rows (`scaleX: 0 → 1`), sliding `↗` arrow. |
| **4.6** | **Experience** | `src/components/sections/ExperienceSection.tsx` | Combined chronological education and experience timeline with a drawing ink spine linked to scroll progress; ends with *"Next — Your team?"*. |
| **4.7** | **Achievements** | `src/components/sections/AchievementsSection.tsx` | Pinned horizontal gallery (`sticky 100svh`), scroll-driven lateral track translation, count-up numbers (`easeOutQuart`), center card elevation. |
| **4.8** | **Contact & Footer** | `src/components/sections/ContactSection.tsx` | Interactive letter-hopping hover heading, direct email with copy chip (`aria-live`), spinning curved text badge, footer with smooth back-to-top. |

---

## 3. How to Rebuild Hero Video Assets

The hero video processing pipeline is automated via `scripts/build-hero-assets.py`:

```bash
python scripts/build-hero-assets.py
```

### Pipeline Details:
1. **Person Centering & Cropping**: Uses an 800:1000 crop window centered at `x=960`, `y=50` down to `1050`, perfectly framing head-to-toe and scaled to `768x960`.
2. **Whitening Filter**: Applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so the studio background maps to pure white `(255, 255, 255)`, perfectly blending into `--paper: #f4f2ee` via `mix-blend-mode: multiply`.
3. **Seamless 0.5s Video Loop**: Splits the 10.0s clip into main body (0.0s–9.5s) and tail (9.5s–10.0s), and cross-fades the tail into the head using ffmpeg `xfade=transition=fade:duration=0.5:offset=0`.
4. **Sample-Accurate Audio Cross-fade**: Processes 48 kHz stereo audio in `numpy` with linear cross-fading, avoiding `acrossfade` audio drops and ensuring lip sync.
5. **Multi-Format Export**:
   - `public/hero/hero.mp4` (H.264 yuv420p, CRF 24, AAC 96 kbps, `+faststart`)
   - `public/hero/hero.webm` (VP9, CRF 36, Opus 80 kbps)
   - `public/portrait-bust.webp` (480×600 head-to-shirt bust crop for the ID badge)
   - `public/og.jpg` (1200×630 OpenGraph card)

---

## 4. Logo Credits & Licences

All brand logos and iconography are kept in `public/logos` and licensed as follows:
- **JavaScript, React, Python, HTML5, CSS3, Bootstrap, jQuery, Adobe Photoshop, Adobe Illustrator**: Devicon / Simple Icons (MIT License). See `public/logos/LICENSE.md`.
- **LinkedIn, Google, TEDx**: Official trademark representations utilized solely for personal portfolio identity and verified credential demonstration.
- **DevQuest, KhiNext, ICyDD**: Community and conference event insignias.
- **Concept Icons**: Custom SVG thin line icons (`layout`, `cube`, `api`, `database`, `sparkles`, `bug`, `gauge`, `git-branch`, `pen-tool`, `users`, `calendar`, `clock`, `message-square`).

---

## 5. Non-Negotiable Rules Verification

- **Never Fabricate**: All names, companies, roles, credentials, projects, and metrics are extracted directly from `resume.pdf`. No GitHub button is shown because GitHub is not listed in the résumé.
- **Monochrome Quiet Luxury**: Palette restricted strictly to white, black, and grays (`--paper: #f4f2ee`, `--card: #ffffff`, `--ink: #0d0d0d`, `--mute: #77756f`, `--line: rgba(13,13,13,0.1)`). Only brand logos maintain official colors with soft brand-tint glows.
- **Self-Hosted Variable Fonts**: `Inter Tight`, `Instrument Serif`, and `JetBrains Mono` are self-hosted in `src/fonts/` as `.woff2` files.
- **Accessibility & Motion**: `prefers-reduced-motion` supported throughout; semantic HTML5 landmarks and keyboard navigation implemented on all interactive components.
