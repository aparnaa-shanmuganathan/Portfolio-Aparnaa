import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { DemoVideo } from "@/components/DemoVideo";
import { ExternalIcon, GithubIcon } from "@/components/Icons";
import { demoUrl } from "@/components/ProjectCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { LiveDemo } from "@/components/LiveDemo";
import { Markdown } from "@/components/Markdown";
import { RepoStats } from "@/components/RepoStats";
import { TagList } from "@/components/Tag";
import { Walkthrough } from "@/components/Walkthrough";
import { github } from "@/content/github.config";
import { getProject, projects } from "@/content/projects";
import { getReadme, getRepo, isReachable } from "@/lib/github/data";

/** Must be a literal. Matches REVALIDATE in lib/github/data.ts (6 hours). */
export const revalidate = 21600;
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.problem,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.problem, url: `/projects/${p.slug}`, type: "article" },
  };
}

function H2({ children }: { children: string }) {
  return <h2 className="mb-4 mt-12 text-2xl font-bold tracking-tight">{children}</h2>;
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const [repo, readme, reachable] = await Promise.all([
    p.repo ? getRepo(p.repo) : null,
    p.repo ? getReadme(p.repo) : null,
    p.demo?.type === "live" ? isReachable(p.demo.url) : true,
  ]);
  const live = demoUrl(p, repo);
  const codeUrl = repo?.url ?? (p.repo ? `https://github.com/${github.username}/${p.repo}` : null);
  const d = p.demo;

  return (
    <article className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
      <Link href="/#projects" className="text-sm font-medium text-accent hover:underline">
        ← All projects
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{p.title}</h1>
      <p className="mt-4 text-xl">{p.problem}</p>
      <p className="mt-3 text-lg text-muted">{p.built}</p>
      {p.metric && (
        <p className="mt-4 inline-flex items-baseline gap-2 rounded-lg bg-tag px-3 py-1.5">
          <span className="text-xl font-bold text-accent">{p.metric.value}</span>
          <span className="text-sm text-muted">{p.metric.label}</span>
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        {codeUrl && (
          <ButtonLink href={codeUrl}>
            <GithubIcon /> View code
          </ButtonLink>
        )}
        {live && (
          <ButtonLink href={live} variant="primary">
            <ExternalIcon /> Open live app
          </ButtonLink>
        )}
      </div>

      {repo && (
        <section aria-label="Repository" className="mt-8 space-y-3 rounded-xl border border-line bg-surface p-5">
          {repo.description && <p className="text-sm text-muted">GitHub: {repo.description}</p>}
          <RepoStats repo={repo} />
        </section>
      )}

      {(d?.type === "video" || d?.type === "live") && (
        <section aria-labelledby="demo-h">
          <h2 id="demo-h" className="mb-4 mt-12 text-2xl font-bold tracking-tight">
            Demo
          </h2>
          {d.type === "video" ? (
            <DemoVideo video={d} mode="detail" title={p.title} />
          ) : (
            <LiveDemo demo={d} title={p.title} reachable={reachable} />
          )}
        </section>
      )}

      {(d?.type === "walkthrough" || p.architecture) && (
        <section aria-labelledby="how-h">
          <h2 id="how-h" className="mb-4 mt-12 text-2xl font-bold tracking-tight">
            How it works
          </h2>
          {d?.type === "walkthrough" ? (
            <Walkthrough steps={d.steps} title={p.title} />
          ) : (
            <FlowDiagram nodes={p.architecture ?? []} label={`${p.title} architecture`} />
          )}
        </section>
      )}

      <H2>Tech stack</H2>
      <TagList items={p.stack} label="Tech stack" />

      {p.role && (
        <>
          <H2>My role</H2>
          <p className="text-muted">{p.role}</p>
        </>
      )}
      {p.highlights?.length ? (
        <>
          <H2>Highlights</H2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      ) : null}
      {p.challenges?.length ? (
        <>
          <H2>Challenges and solutions</H2>
          <dl className="space-y-5">
            {p.challenges.map((c) => (
              <div key={c.challenge}>
                <dt className="font-semibold">{c.challenge}</dt>
                <dd className="mt-1 text-muted">{c.solution}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}
      {(p.results?.length || p.metric) && (
        <>
          <H2>Results</H2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
            {p.metric && (
              <li>
                {p.metric.value} {p.metric.label}
              </li>
            )}
            {p.results?.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      )}

      {p.repo && (
        <section aria-labelledby="readme-h">
          <h2 id="readme-h" className="mb-4 mt-12 text-2xl font-bold tracking-tight">
            README
          </h2>
          {readme ? (
            <div className="rounded-xl border border-line p-5 sm:p-6">
              <Markdown source={readme} repo={p.repo} branch={repo?.defaultBranch ?? "main"} />
            </div>
          ) : (
            <p className="text-muted">
              The README couldn&apos;t be loaded right now.{" "}
              {codeUrl && (
                <a className="font-semibold text-accent underline" href={codeUrl} target="_blank" rel="noopener noreferrer">
                  Read it on GitHub
                </a>
              )}
              .
            </p>
          )}
        </section>
      )}
    </article>
  );
}
