import Link from "next/link";
import { github } from "@/content/github.config";
import type { Project } from "@/content/projects";
import type { RepoData } from "@/lib/github/data";
import { ButtonLink } from "./ButtonLink";
import { ExternalIcon, GithubIcon } from "./Icons";
import { ProjectMedia } from "./ProjectMedia";
import { RepoStats } from "./RepoStats";
import { TagList } from "./Tag";

export function demoUrl(p: Project, repo: RepoData | null): string | null {
  return p.demo?.type === "live" ? p.demo.url : (repo?.homepage ?? null);
}

export function ProjectCard({ project: p, repo }: { project: Project; repo: RepoData | null }) {
  const live = demoUrl(p, repo);
  const codeUrl = repo?.url ?? (p.repo ? `https://github.com/${github.username}/${p.repo}` : null);
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5">
      <ProjectMedia project={p} />
      <div className="flex-1 space-y-3">
        <h3 className="text-xl font-bold tracking-tight">
          <Link href={`/projects/${p.slug}`} className="hover:underline">
            {p.title}
          </Link>
        </h3>
        <p className="font-medium">{p.problem}</p>
        <p className="text-muted">{p.built}</p>
        {p.metric && (
          <p className="inline-flex items-baseline gap-2 rounded-lg bg-tag px-3 py-1.5">
            <span className="text-lg font-bold text-accent">{p.metric.value}</span>
            <span className="text-sm text-muted">{p.metric.label}</span>
          </p>
        )}
      </div>
      <TagList items={p.stack} label={`${p.title} tech stack`} />
      {repo && <RepoStats repo={repo} compact />}
      <div className="flex flex-wrap gap-2">
        <ButtonLink href={`/projects/${p.slug}`} variant="primary" aria-label={`${p.title}: details and demo`}>
          Details &amp; demo
        </ButtonLink>
        {codeUrl && (
          <ButtonLink href={codeUrl} aria-label={`${p.title} source code on GitHub`}>
            <GithubIcon width={16} height={16} /> Code
          </ButtonLink>
        )}
        {live && (
          <ButtonLink href={live} aria-label={`${p.title} live app (opens in a new tab)`}>
            <ExternalIcon /> Live
          </ButtonLink>
        )}
      </div>
    </article>
  );
}
