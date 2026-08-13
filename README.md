# OK. GIALFRA LLC — Corporate Website

A modern, premium, fully responsive corporate website for **OK. GIALFRA LLC** —
a procurement, oilfield equipment, industrial supply and project support company
based in Homestead, Florida, USA.

Built as a fast, maintainable single-page application with a component-based
architecture and a self-contained visual system (no external image dependencies),
so it previews and deploys anywhere with zero configuration.

## Tech stack

- **Vite** — build tooling & dev server
- **React 18 + TypeScript** — component architecture
- **Tailwind CSS** — design system & responsive utilities
- **Framer Motion** — subtle, professional animations

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:5173
npm run build    # type-check + production build → /dist
npm run preview  # preview the production build → http://localhost:4173
```

## Project structure

```
src/
  components/
    art/            Self-contained SVG artwork (hero scene, tiles, world map)
    *.tsx           Page sections (Hero, About, Products, RFQ, Contact, …)
    icons.tsx       Industrial line-icon set
    Logo.tsx        Brand wordmark lockup
  data/
    content.ts      Single source of truth for all site copy & data
  App.tsx           Section composition
index.html          SEO metadata, Open Graph, JSON-LD structured data
```

All copy, navigation, product/industry lists and process steps live in
`src/data/content.ts` — edit that one file to update site content.

## Brand & imagery

- **Logo:** the site ships with a clean vector interpretation of the OK. GIALFRA
  wordmark (`src/components/Logo.tsx`). To use the official raster logo, drop it at
  `public/logo.png` and reference it where desired.
- **Photography:** every image container uses `object-fit: cover` (see the `.media`
  helper in `src/index.css`), so real industrial photography can be dropped into
  `public/images/` and swapped into the `ArtTile` slots without any layout changes —
  images will always crop to fit and never stretch or distort.

## Forms

The **Request a Quote** and **Contact** forms compose a structured email to
`sales@okgialfra.com` via the visitor's email client. To wire a server-side
handler (e.g. an API route or a service such as Formspree/Web3Forms), replace the
`mailto:` submission in `src/components/RFQ.tsx` and `src/components/Contact.tsx`
with a `fetch()` POST to your endpoint.

## Deployment

The production build in `/dist` is fully static. Deploy to Vercel, Netlify,
Cloudflare Pages, GitHub Pages or any static host.

---

© 2025 OK. GIALFRA LLC. Manufacturer names and trademarks are the property of their
respective owners.
