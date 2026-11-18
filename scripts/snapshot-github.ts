/**
 * Refreshes src/content/github-snapshot.json, the local fallback used when the GitHub API is unreachable.
 * Usage: GITHUB_TOKEN=... npm run snapshot   (token optional)
 */
import { writeFileSync } from "node:fs";
import { github } from "../src/content/github.config.ts";
import { projects } from "../src/content/projects.ts";

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-snapshot",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};
const get = async (path: string) => {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
};

const repos: Record<string, unknown>[] = await get(`/users/${github.username}/repos?per_page=100&sort=pushed&type=owner`);
const featured = new Set(projects.flatMap((p) => (p.repo ? [p.repo.toLowerCase()] : [])));
const languages: Record<string, unknown> = {};
const lastCommit: Record<string, string> = {};

for (const r of repos.filter((r) => featured.has(String(r.name).toLowerCase()))) {
  const name = String(r.name);
  languages[name] = await get(`/repos/${github.username}/${name}/languages`);
  const commits = await get(`/repos/${github.username}/${name}/commits?per_page=1`).catch(() => []);
  const date = commits[0]?.commit?.committer?.date;
  if (date) lastCommit[name] = date;
}

const keep = ["name", "html_url", "description", "language", "stargazers_count", "forks_count", "pushed_at", "topics", "homepage", "fork", "archived", "default_branch"];
const slim = repos.map((r) => Object.fromEntries(keep.map((k) => [k, r[k]])));
writeFileSync(
  new URL("../src/content/github-snapshot.json", import.meta.url),
  JSON.stringify({ generatedAt: new Date().toISOString(), repos: slim, languages, lastCommit }, null, 2) + "\n",
);
console.log(`Snapshot: ${slim.length} repos, ${Object.keys(languages).length} with languages`);
