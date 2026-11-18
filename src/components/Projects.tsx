import Link from "next/link";
import { featuredProjects, smallProjects } from "@/content/projects";
import { getRepo } from "@/lib/github/data";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";
import { TagList } from "./Tag";

export async function Projects() {
  const repos = await Promise.all([...featuredProjects, ...smallProjects].map((p) => (p.repo ? getRepo(p.repo) : null)));
  const repoFor = (slug: string) => {
    const i = [...featuredProjects, ...smallProjects].findIndex((p) => p.slug === slug);
    return repos[i] ?? null;
  };
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} repo={repoFor(p.slug)} />
        ))}
      </div>
      <h3 className="mb-4 mt-14 text-lg font-bold">Smaller builds</h3>
      <ul className="grid gap-4 sm:grid-cols-3">
        {smallProjects.map((p) => (
          <li key={p.slug} className="space-y-3 rounded-xl border border-line p-4">
            <h4 className="font-semibold">
              <Link href={`/projects/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h4>
            <p className="text-sm text-muted">{p.built}</p>
            <TagList items={p.stack} label={`${p.title} tech stack`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
