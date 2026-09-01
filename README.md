# Angelique & Franco — Wedding Website

A minimal wedding website for Saturday, 20 March 2027 in Haenertsburg, Limpopo.

## Edit content

Almost everything guests see lives in one file:

- [`src/content/site.ts`](src/content/site.ts) — names, dates, schedule, travel copy, FAQs, accommodation listings, registry/EFT details, additional information, photo paths

Change text there and save. The pages update automatically.

## Photos

Drop image files into [`public/photos/`](public/photos/) using these names:

| File | Where it appears |
|---|---|
| `couple.jpg` | Home |
| `ceremony.jpg` | Schedule — ceremony |
| `breakfast.jpg` | Schedule — breakfast |
| `travel.jpg` | Travel |
| `accommodation-directory.jpg` | Stay — directory image |
| `stay-cheerio.jpg` | Stay listing |
| `stay-africamps.jpg` | Stay listing |
| `stay-hotel.jpg` | Stay listing |

Until a file exists, the site shows a quiet “Photo coming soon” placeholder.

## Registry / EFT

In `src/content/site.ts`, fill in `registry.contribution`:

- `accountName`
- `bank`
- `accountNumber`
- `branchCode`

If those fields are empty, the page keeps the warm wording and a short placeholder instead of showing blank bank details.

## RSVP admin

1. Open `/admin`
2. Password is `ADMIN_PASSWORD` from `.env.local`
3. You’ll see confirmed guest totals and a CSV download

The password must match the hash stored in the Supabase project (set during setup). If you change it, update both `.env.local` and the database hash.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

This is a Next.js app. Deploy to [Vercel](https://vercel.com) and add the same environment variables as `.env.example`.
