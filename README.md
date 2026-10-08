# Jazz Du Jour — Next.js + Tailwind + Framer Motion + Sanity

This project converts the supplied Jazz Du Jour HTML/CSS/JS into a Next.js App Router site while preserving the original visual design and responsive behavior.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4 (project is configured for Tailwind; the original design CSS is retained where exact pixel/visual parity matters)
- Framer Motion for smooth section/card/player animations
- Sanity + `next-sanity` for editable content
- Native HTML audio player using the supplied track paths

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Sanity

Create or connect a Sanity project, then put these values in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2026-05-15
SANITY_API_READ_TOKEN=...
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
```

The app has safe local fallback content, so the site still renders if Sanity variables are not configured. Once Sanity is configured, the homepage reads the `siteSettings`, `combo`, `trackGroup`, `personnel`, and `bookingSettings` documents.

Studio is available at `/studio` after configuring the project.

## Audio and images

The original project referenced `/audio/*.wav` and `/images/image (2).png` / `images/herobg.png`. Put those original assets in:

- `public/audio/`
- `public/images/`

The supplied source files did not include the binary image/audio assets, so they are intentionally not fabricated.

## Sanity content model

The schema files are in `src/sanity/schemaTypes/` and include:

- Site Settings — hero, intro, footer
- Combo — quartet/trio/duo/solo cards
- Track Group — grouped sample tracks
- Personnel — musician photo and roster
- Booking Settings — phone, email, booking copy, band options

The environment variables make the Sanity project/dataset/token configurable without changing application code.
