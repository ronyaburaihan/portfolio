# Abu Raihan Rony — Portfolio

Personal portfolio for a Senior Mobile Application Developer, built with vanilla HTML, CSS, and JavaScript. No framework, dependencies, or build step.

**Live:** https://ronyaburaihan.github.io/portfolio/

## Features

- Responsive single-page layout with work, about, experience, expertise, and contact sections
- Light and dark themes with a saved preference and system-theme support
- Featured projects with interactive app previews and store links
- Additional project listings and technical skills rendered from inline data
- Mobile navigation, keyboard accessibility, and reduced-motion support with an animation toggle
- Direct PDF résumé download from `resume.pdf`
- Search and social-sharing metadata, including an Open Graph cover image

## Structure

```
index.html              Page markup, styles, project data, and interactions
assets/img/og-cover.png  Social-sharing preview image
resume.pdf              Downloadable résumé
.github/workflows/       GitHub Pages deployment workflow
```

The previous version’s assets are retained for compatibility with existing direct links. The current page does not load `assets/data/data.json`, `assets/css/style.css`, or `assets/js/script.js`.

## Editing content

Edit `index.html`:

- Update the page markup for the introduction, featured projects, about, experience, and contact information.
- Update the `PROJECTS` and `SKILLS` arrays for the additional project list and expertise section.
- Replace `resume.pdf` to update the downloadable résumé; keep structured data and social metadata consistent with visible content.
- Styles and scripts are embedded in the same file.

## Local preview

Serve the repository with a static server:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No dependency installation or build is required.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which publishes the repository to GitHub Pages. The workflow also supports manual runs. Repository Settings → Pages → Source must be set to **GitHub Actions**.
