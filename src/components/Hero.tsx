import { links, profile } from "@/content/profile";
import { ButtonLink } from "./ButtonLink";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="py-20 sm:py-28">
      <div className="reveal mx-auto max-w-5xl px-5 sm:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">{profile.role}</p>
        <h1 id="hero-title" className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{profile.tagline}</p>
        <p className="mt-3 text-sm text-muted">
          {profile.location} · {profile.availability}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#projects" variant="primary">
            View projects
          </ButtonLink>
          <ButtonLink href={links.resume}>
            <DownloadIcon /> Resume
          </ButtonLink>
          <ButtonLink href={links.github}>
            <GithubIcon /> GitHub
          </ButtonLink>
          <ButtonLink href={links.linkedin}>
            <LinkedinIcon /> LinkedIn
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
