# Aparnaa A S, portfolio

The personal portfolio website of Aparnaa A S, an ML / AI engineer. It showcases projects, experience, skills and ways to get in touch.

## What's on the site
- **Projects:** featured and smaller projects, each with a problem, what was built, tech stack and a detail page
- **More on GitHub:** other public repositories, kept up to date automatically
- **About, experience and skills**
- **Resume** download and **contact** links (email, GitHub, LinkedIn)
- Light and dark themes, responsive layout, SEO and social-share metadata

## Built with
Next.js (App Router), TypeScript and Tailwind CSS v4.

## Hosting
Deployed on Vercel. GitHub data (repositories, languages, last commit) is fetched on the server and refreshed every 6 hours, so the site updates itself without redeploys.

Environment variables (set in Vercel, see `.env.example`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The site's public URL, used for links and social previews |
| `GITHUB_TOKEN` | Optional read-only token that avoids GitHub API rate limits |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional; enables the contact form |

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Updating content
Page content lives in `src/content/` (profile, projects, experience, skills). Project images go in `public/projects/`, and the resume is `public/resume.pdf`.
