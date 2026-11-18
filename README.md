# Aparnaa A S, portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel with ISR (GitHub data refreshes every 6 hours).

The previous React (Create React App) version of this site is kept in [`old/`](old/) for reference. It is not built or deployed.

## Edit your content
Everything lives in `src/content/`:
- `profile.ts`: name, tagline, email, graduation year, LinkedIn URL (search for `TODO`)
- `projects.ts`: projects, metrics, links, screenshots
- `experience.ts`: experience, certifications, leadership
- `skills.ts`: skill groups

**Screenshots:** put images in `public/projects/` and add `image: { src: "/projects/x.png", alt: "…", width: 1600, height: 900 }` to the project. Use 16:9 images or GIFs.
**Resume:** put your PDF at `public/resume.pdf`.
**OG image:** `public/og.png` (1200×630).

## Contact form
Create a form at https://formspree.io and set `NEXT_PUBLIC_FORMSPREE_ID` (see `.env.example`). Until then the section shows a mailto link.

## Run / deploy
```bash
npm install
npm run dev
npm run typecheck
npm run build   # production build
npm start       # serve the production build on http://localhost:3000
```
Deploy: import the repo in Vercel and add the env vars `NEXT_PUBLIC_FORMSPREE_ID` and `NEXT_PUBLIC_SITE_URL`. No other settings are needed.

## GitHub integration
- Data is fetched **on the server only** (`src/lib/github/data.ts`) and revalidated every 6 hours (ISR, `revalidate = 21600`). The token is never sent to the browser.
- Create a **fine-grained personal access token** (read-only, public repositories, no extra permissions) and add it in Vercel as `GITHUB_TOKEN`.
- Each project maps to a repo via `repo: "name"` in `src/content/projects.ts`. Leave it out for projects without a public repo.
- `src/content/github.config.ts` holds the username and the exclude list for "More on GitHub".
- If the API fails: last good data in memory, then `src/content/github-snapshot.json`, then the card simply omits GitHub stats. Errors are logged on the server. Refresh the snapshot with `npm run snapshot`.
- Because of ISR this is **not** a `next export` site. Deploy on Vercel (the default).

## Adding demos
Set `demo` on a project in `src/content/projects.ts`. Files go in `public/demos/<slug>/`.
- `video`: `sources` (MP4 and/or WebM), `poster`, optional `captions` (.vtt).
- `live`: `url` of the embeddable app plus an optional `fallback` video.
- `walkthrough`: `steps`, each with an optional screenshot or clip.

### Recording settings
| | Recommended |
|---|---|
| Length | 20–40 s, one task, no dead time |
| Resolution | 1280×720 (1920×1080 only if text is tiny) |
| Frame rate | 30 fps (24 for screen recordings is fine) |
| Audio | None (cards autoplay muted); put narration in captions |
| Size | Under 5 MB for a 30 s clip; if larger, host on a CDN |
| Poster | A 1280×720 PNG/JPG frame, under 150 KB |

Free tools: record with **OBS Studio**, compress with **ffmpeg** (or HandBrake):
```bash
# MP4 (H.264), universal
ffmpeg -i raw.mkv -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -an -movflags +faststart demo.mp4
# WebM (VP9), smaller on supporting browsers
ffmpeg -i raw.mkv -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an demo.webm
# Poster frame at 2 seconds
ffmpeg -i raw.mkv -ss 2 -frames:v 1 -vf "scale=1280:-2" poster.jpg
```
Captions: write a `captions.en.vtt` file (WebVTT) by hand, or generate a draft with Whisper and edit it.
