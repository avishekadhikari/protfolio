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

## Contact form

The form posts to [Web3Forms](https://web3forms.com) — no backend, no build step.
Submissions are emailed to the address the access key was registered with.

- The key lives in the `access_key` hidden input in `index.html`. It is a **public**
  key and is safe to commit; it only identifies which inbox to deliver to.
- Reply-to is set automatically from the visitor's `email` field, so replying to a
  notification goes straight back to the sender.
- A `botcheck` honeypot field filters spam. Free tier allows 250 submissions/month.
- To change the destination inbox, register a new key at web3forms.com and swap it in.
- To switch providers (e.g. Formspree), change the `fetch` URL in `script.js` and the
  hidden fields in `index.html`; the markup and validation stay the same.
