# Astro Migration Plan: Professional Portfolio Structure

This plan outlines the migration of the existing vanilla HTML/JS/CSS portfolio to [Astro](https://astro.build/). Astro is a modern, performance-first framework that allows us to build a faster, more maintainable website by utilizing components and static site generation while maintaining the zero-bundle-size "islands architecture" where possible.

## 1. Objectives
- **Professional Structure:** Modernize the project with a clean directory layout, components, and a standard build process.
- **Improved Performance & SEO:** Move from runtime JavaScript injection to build-time static HTML generation.
- **Maintainability:** Use components to organize UI logic and styles.
- **Developer Experience:** Introduce TypeScript for data and scripts, and a local dev server with hot module reloading.
- **GitHub Pages Deployment:** Configure Astro for automated static deployment via GitHub Actions.

## 2. New Directory Structure
We will transition to the following structure:
```
portfolio/
├── .github/workflows/deploy.yml  # Updated for Astro build/deploy
├── public/                       # Static assets (images, fonts, resume)
│   ├── assets/
│   │   ├── img/
│   │   └── webfonts/
│   └── resume.pdf
├── src/
│   ├── components/               # UI Components (Header, Hero, Section, etc.)
│   ├── layouts/                  # Base Layout (HTML head, scripts, global styles)
│   ├── pages/                    # Site pages (index.astro)
│   ├── styles/                   # Modular CSS files
│   ├── scripts/                  # Client-side JS modules
│   └── data/                     # Structured portfolio data (TypeScript)
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## 3. Implementation Steps

### Phase 1: Setup & Configuration
1. Initialize `package.json` with Astro and dependencies.
2. Create `astro.config.mjs` (set `site` and `base` for GitHub Pages).
3. Create `tsconfig.json`.
4. Update `.gitignore` for node_modules and build artifacts.

### Phase 2: Assets Migration
1. Move `assets/img/` to `public/assets/img/`.
2. Move `assets/webfonts/` to `public/assets/webfonts/`.
3. Move `resume.pdf` to `public/resume.pdf`.
4. Move `assets/css/*.css` to `src/styles/` (excluding the legacy `style.css`).
5. Move `assets/js/modules/*.js` to `src/scripts/` and rename to `.ts` where beneficial.

### Phase 3: Data Migration
1. Convert `assets/data/portfolio.js` into a structured `src/data/portfolio.ts` file with proper TypeScript interfaces for Projects, Experience, and Skills.

### Phase 4: Component Development
1. **Layouts:** Create `src/layouts/Layout.astro` containing the `<head>`, metadata, fonts, and global script/style imports.
2. **Components:** Break down `index.html` into:
   - `Header.astro`
   - `Hero.astro`
   - `Work.astro` (renders projects using data)
   - `About.astro`
   - `Experience.astro` (renders experience using data)
   - `Skills.astro` (renders expertise using data)
   - `Education.astro`
   - `Credentials.astro`
   - `Contact.astro`
   - `Footer.astro`
   - `Toast.astro`
3. **Pages:** Create `src/pages/index.astro` which composes all components together.

### Phase 5: Client-side Interactivity
1. Migrate client-side logic (theme toggling, navigation, motion, reveal, clipboard) into Astro's `<script>` tags or imported TS modules.
2. Ensure `theme-init.js` is placed in the `<head>` to prevent theme flashing.
3. Remove the legacy `assets/js/render.js` as rendering will now happen at build-time.

### Phase 6: Clean-up & CI/CD
1. Delete legacy unused files: `assets/js/script.js`, `assets/css/style.css`, `assets/data/data.json`.
2. Delete the old root `index.html`.
3. Update `.github/workflows/deploy.yml` to build the Astro project before deployment.

## 4. Verification & Testing
- **Local Dev:** Verify the site looks and functions identically using `npm run dev`.
- **Production Build:** Run `npm run build` to ensure all assets are correctly prefixed and bundled.
- **Deployment:** Push to GitHub and verify that GitHub Actions successfully builds and deploys to the GitHub Pages URL.
- **Performance:** Check Lighthouse scores for performance, accessibility, and SEO.

## 5. Alternatives Considered
- **Vite (Vanilla):** Good, but lacks the component-based authoring and easy static site features of Astro.
- **Next.js:** Powerful, but brings more overhead than needed for a static portfolio site. Astro is lighter and generates less client-side JavaScript.
