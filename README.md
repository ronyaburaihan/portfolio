# Abu Raihan Rony — Portfolio

[![Deploy to GitHub Pages](https://github.com/ronyaburaihan/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/ronyaburaihan/portfolio/actions/workflows/deploy.yml)
![No build step](https://img.shields.io/badge/build-none-brightgreen)
![HTML/CSS/JS](https://img.shields.io/badge/stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-blue)

Personal portfolio site — home, about, portfolio, and contact sections in a single-page layout. Vanilla HTML/CSS/JS, no framework, no build step, content driven entirely by one JSON file.

**Live:** https://ronyaburaihan.github.io/portfolio/

## Features

- Single-page layout with smooth section switching, dark mode, and mobile nav
- Portfolio grid with category filtering and a project-details popup
- Fully data-driven — profile, skills, education, experience, training, languages, and projects all render from `assets/data/data.json`
- Zero build tooling — edit and deploy, no `npm install` required
- Auto-deploys to GitHub Pages via GitHub Actions on every push to `main`

## Tech stack

- Vanilla HTML, CSS, JS — no build step, no framework
- [Font Awesome](https://fontawesome.com/) 5 (vendored, `assets/webfonts/`)
- Content is data-driven: `assets/js/script.js` fetches `assets/data/data.json` on load and renders profile, skills, education, experience, training, languages, and portfolio project cards

## Structure

```
index.html
resume.pdf
assets/
  css/        style.css, font-awesome.css
  js/         script.js
  data/       data.json          (single source of content — edit this to update the site)
  img/        profile-pic.png, portfolio/*
  webfonts/   Font Awesome font files
```

## Editing content

All text, skills, experience, education, and project entries live in `assets/data/data.json`. Edit that file; no HTML changes needed for content updates.

## Local preview

`assets/js/script.js` loads content via `fetch()`. Browsers block `fetch()` of local files under the `file://` origin (opening `index.html` by double-click), so either:

- Open `index.html` in **Firefox** (allows `file://` fetch of same-folder files), or
- Serve the folder with any static server, e.g. `python3 -m http.server`, then visit `http://localhost:8000`

GitHub Pages serves over HTTPS, so the deployed site works with no extra setup.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which publishes the repo to GitHub Pages via GitHub Actions. No build step — static files are deployed as-is. Requires repo Settings → Pages → Source set to **GitHub Actions**.

## Contributing

Issues and PRs welcome — typo fixes, accessibility improvements, and small enhancements are all fair game. For anything larger, open an issue first to discuss the change.
