# Abu Raihan Rony — Senior Mobile Developer Portfolio

[![Astro](https://img.shields.io/badge/Astro-4.16-BC52EE.svg?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-20%2B-339933.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Deploy to GitHub Pages](https://github.com/ronyaburaihan/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/ronyaburaihan/portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Personal engineering portfolio for **Abu Raihan Rony**, Senior Mobile Application Developer. Six years of production experience architecting native Android (Kotlin, Jetpack Compose), cross-platform (Flutter), and shared codebases with **Kotlin Multiplatform (KMP)** and SwiftUI.

🌐 **Live Website:** [https://ronyaburaihan.github.io/portfolio/](https://ronyaburaihan.github.io/portfolio/)  
📄 **Résumé:** [Download PDF](https://ronyaburaihan.github.io/portfolio/resume.pdf)  
💼 **LinkedIn:** [/in/ronyaburaihan](https://www.linkedin.com/in/ronyaburaihan/)  
🐙 **GitHub:** [@ronyaburaihan](https://github.com/ronyaburaihan)

---

## ⚡ Highlights & Key Features

- **⚡ Performance-First Static Architecture:** Powered by [Astro 4](https://astro.build/), achieving near-instant Time to First Byte (TTFB), zero unused runtime JavaScript, and build-time static HTML generation.
- **📱 Interactive Device Mockups:** Embedded CSS/JS simulations of live mobile products built by Raihan:
  - **Turner: LiveVoiceTranslator:** Real-time speech-to-text wave animation and multi-lingual translation state machine.
  - **ImproveType AI Keyboard:** Simulated keyboard interface with predictive suggestions, auto-typing, and interactive pause/resume.
  - **Image Enlarger:** Interactive before/after comparative sweep visualizer with quota metering simulation.
  - **TTBoost Request Pipeline:** Live console log simulation displaying App Check token prefetching, request signing, and localized retry handlers.
- **🌓 FOUC-Proof Theme System:** Instant theme resolution in `<head>` preventing Flash of Unstyled Content (FOUC), with support for explicit visitor toggle and system `prefers-color-scheme`.
- **♿ Accessibility (a11y) & Motion Controls:**
  - Accessible keyboard focus rings and dedicated "Skip to main content" link.
  - Granular animation pause toggle backed by full `prefers-reduced-motion` compliance.
  - Accessible numbers: Screen readers hear static, true values while visual visitors see fluid count-up animations.
- **🔍 Modern SEO & Structured Data:**
  - Full Schema.org JSON-LD `Person` metadata.
  - Pre-rendered Open Graph and Twitter Card tags.
  - Canonical URL resolution and `robots.txt` configuration.

---

## 🏗️ Technical Architecture & Tech Stack

| Layer | Technologies | Rationale |
| :--- | :--- | :--- |
| **Framework** | [Astro v4](https://astro.build/) | Static Site Generation (SSG) with Islands architecture. Zero runtime JavaScript bloat. |
| **Language** | TypeScript | Strict typing for portfolio data, experiences, projects, and components. |
| **Styling** | Modular Vanilla CSS | Custom design token system with zero CSS-in-JS overhead; lightning-fast CSS parsing. |
| **Animations** | Web Animations API | Hardware-accelerated browser-native animations (`element.animate`) without heavy libraries like GSAP or Framer Motion. |
| **CI / CD** | GitHub Actions | Deterministic static build (`npm ci`) deploying automatically to GitHub Pages. |

---

## 📂 Project Structure

```
portfolio/
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/                     # Static assets served untouched at site root
│   ├── assets/img/             # Profile photos and Open Graph previews
│   ├── robots.txt              # Search crawler configuration
│   └── resume.pdf              # Canonical PDF résumé
├── src/
│   ├── components/             # Astro presentation components
│   │   ├── Header.astro        # Sticky navigation, logo, and theme/motion controls
│   │   ├── Hero.astro          # Hero section, identity card, and primary CTAs
│   │   ├── Work.astro          # Featured case studies & interactive mobile demos
│   │   ├── About.astro         # Developer profile, philosophy, and quick facts
│   │   ├── Experience.astro    # Career history and accomplishments
│   │   ├── Skills.astro        # Categorized technical skills matrix
│   │   ├── Education.astro     # Academic history
│   │   ├── Credentials.astro   # Certifications and training
│   │   ├── Contact.astro       # Contact channels with click-to-copy
│   │   ├── Footer.astro        # Copyright, dynamic year, and metadata
│   │   └── Toast.astro         # Accessible status feedback notification
│   ├── data/
│   │   └── portfolio.ts        # Typed data sources (Projects, Experience, Skills)
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML document, head tags, fonts, global scripts
│   ├── pages/
│   │   └── index.astro         # Single-page application entrypoint
│   ├── scripts/                # Modular client-side interactions
│   │   ├── clipboard.js        # One-click copy with toast notifications
│   │   ├── demos.js            # Interactive phone preview state machines
│   │   ├── dom.js              # Lightweight DOM selection helpers
│   │   ├── motion.js           # Fluid scroll reveals and motion sync
│   │   └── theme.js            # Light/Dark mode toggling and persistence
│   └── styles/                 # Modular CSS architecture
│       ├── base.css            # Base resets, typography, and core tokens
│       ├── layout.css          # Grid shells, header, buttons, and sections
│       ├── sections.css        # Specific section styling rules
│       ├── demos.css           # Device frame simulation and screen styles
│       ├── theme.css           # Color schemes and visual hierarchy
│       └── motion.css          # Keyframes and animation rules
├── astro.config.mjs            # Astro configuration (base path & site URL)
├── package.json                # Project dependencies and lifecycle scripts
└── tsconfig.json               # TypeScript strict configuration
```

---

## 🛠️ Local Development & Scripts

### Prerequisites

- **Node.js**: v20.x or higher
- **npm**: v10.x or higher

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/ronyaburaihan/portfolio.git
cd portfolio
npm install
```

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local development server at `http://localhost:4321/portfolio/` with hot module reloading. |
| `npm run check` | Runs Astro compiler check and TypeScript type checking across all files. |
| `npm run build` | Compiles an optimized, zero-warning production build into `dist/`. |
| `npm run preview` | Locally serves the production build in `dist/` to preview before deploying. |

---

## ✏️ Content Management Guide

- **Projects, Work & Skills:** Update [`src/data/portfolio.ts`](src/data/portfolio.ts). Content is strictly typed via `Project`, `Experience`, and `SkillCategory` interfaces.
- **Featured Case Studies:** Edit [`src/components/Work.astro`](src/components/Work.astro) to update deep-dive engineering notes, metrics, or store links.
- **Résumé:** Replace [`public/resume.pdf`](public/resume.pdf) with the updated PDF. All download buttons across the site link directly to this file.
- **Head Metadata:** Modify [`src/layouts/Layout.astro`](src/layouts/Layout.astro) to update Schema.org JSON-LD properties, page titles, or meta tags.

---

## 🚀 Deployment

The site is configured for automatic zero-downtime deployment to **GitHub Pages**:

1. Pushes or merges to the `main` branch trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
2. The workflow performs a clean dependency install via `npm ci`, executes `npm run build`, and publishes the static `dist/` directory using official GitHub Pages actions.
3. Base path handling is automatically configured via `site` and `base` in [`astro.config.mjs`](astro.config.mjs).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Copyright © Abu Raihan Rony.
