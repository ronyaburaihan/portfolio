# Abu Raihan Rony — Portfolio

Personal portfolio site: home, about, portfolio, and contact sections in a single-page layout.

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
