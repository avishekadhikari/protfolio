# Avishek Adhikari — Portfolio

Static, dependency-free personal portfolio. Light SaaS-style design: soft grey canvas,
white cards, green accent.

```
index.html   markup + all content (sections are commented)
styles.css   design tokens, layout, responsive + print styles
script.js    scroll progress, mobile menu, reveals, scrollspy, copy-to-clipboard
assets/      photo, project screenshot, CV
```

## Run locally

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy

Plain HTML/CSS/JS, no build step. Drag the folder into **Netlify Drop**, or push to GitHub
and enable **Pages** (Settings → Pages → deploy from branch → `/root`). For Vercel, import
the repo and choose "Other" as the framework preset.

## Editing

- **Content** lives directly in `index.html`, section by section.
- **Colours** are CSS custom properties at the top of `styles.css` — `--green` drives the
  whole accent system, `--bg` the page canvas.
- **Photo**: replace `assets/photo.jpg` (portrait crop works best; it is used in both the
  header avatar and the hero).
- **CV**: replace `assets/Avishek-Adhikari-CV.pdf`.
- **WhatsApp button**: the number is in the `.wa` link at the bottom of `index.html`.
