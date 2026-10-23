# Luxe Wedding Invitation

A premium, mobile-first wedding invitation starter built with Next.js App Router, TypeScript, CSS, Framer Motion, and Lucide icons.

## Included
- Cinematic invitation cover with an open-card transition
- Editorial hero and couple story
- Countdown timer
- One combined event timeline with Indian wedding and Nikah events
- Event-level venue, dress code, date, time, and map links
- Responsive photo gallery with keyboard-accessible lightbox
- RSVP form validation and API endpoint scaffold
- Venue directions
- Responsive mobile navigation
- Theme and wedding data centralized in `src/config/wedding.config.ts`
- Metadata and reduced-motion support

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Customize the wedding
Edit `src/config/wedding.config.ts`:
- Bride and groom names
- Date, timezone, and location
- Invitation and story text
- Venue and Google Maps URL
- Events (add, edit, remove, reorder)
- Gallery images
- Optional audio file path

Replace sample image URLs with the couple's real photographs before publishing.

## RSVP backend status
The UI validates fields and submits to `POST /api/rsvp`. The included route validates the request but returns HTTP 501 because no persistent database or email provider is configured. It deliberately does not pretend that responses were saved.

Before production, connect a database (for example PostgreSQL with Prisma or Supabase), store RSVP submissions securely, add rate limiting, and protect any admin panel with real authentication. No admin panel or persistent storage is claimed in this starter.

## Music status
The floating control is a UI placeholder until an audio file is configured. Add a licensed audio file and connect playback in `WeddingExperience.tsx` before using it.

## Production checklist
- Replace sample names, dates, venue, and sample imagery
- Confirm timezone and all event times
- Connect persistent RSVP storage and test failure/success states
- Add a licensed music file if desired
- Set canonical URL and production social preview image
- Run `npm run build` and verify on target devices
