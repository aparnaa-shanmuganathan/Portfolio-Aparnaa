import { github } from "@/content/github.config";
import { links } from "@/content/profile";
import { getMoreRepos } from "@/lib/github/data";
import { ButtonLink } from "./ButtonLink";
import { GithubIcon } from "./Icons";
import { formatDate } from "./RepoStats";
import { Section } from "./Section";

export async function MoreOnGithub() {
  const repos = await getMoreRepos();
  if (!repos.length) return null; // never render an empty section
  return (
    <Section id="github" title="More on GitHub" className="bg-surface">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <li key={r.name} className="flex flex-col gap-2 rounded-xl border border-line bg-bg p-4">
            <h3 className="font-semibold">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {r.name}
              </a>
            </h3>
            <p className="flex-1 text-sm text-muted">{r.description ?? github.descriptions[r.name.toLowerCase()] ?? "No description yet."}</p>
            <p className="text-xs text-muted">
              {r.language ?? "Mixed"} · <span aria-hidden="true">★ </span>
              {r.stars}
              <span className="sr-only"> stars</span> · Updated {formatDate(r.lastCommit) ?? "recently"}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href={links.github}>
          <GithubIcon /> All repositories
        </ButtonLink>
      </div>
    </Section>
  );
}
