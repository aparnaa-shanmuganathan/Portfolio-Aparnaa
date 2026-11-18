import snapshotJson from "@/content/github-snapshot.json";
import { github } from "@/content/github.config";
import { projects } from "@/content/projects";
import {
  CommitsSchema,
  LanguagesSchema,
  ReadmeSchema,
  ReposSchema,
  RepoSchema,
  SnapshotSchema,
  type Repo,
} from "./schema";

/** Keep in sync with `export const revalidate` on pages (those must be literals). */
const REVALIDATE = 21_600; // 6 hours

export type LanguageShare = { name: string; percent: number };
export type RepoData = {
  name: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  languages: LanguageShare[];
  stars: number;
  forks: number;
  topics: string[];
  lastCommit: string | null;
  defaultBranch: string;
};

/* ---------- fallbacks: last good response in this server instance, then the committed snapshot ---------- */

const lastGood = new Map<string, unknown>();
const snapshotParse = SnapshotSchema.safeParse(snapshotJson);
const snapshot = snapshotParse.success ? snapshotParse.data : null;
if (!snapshotParse.success) console.error("[github] invalid local snapshot:", snapshotParse.error.message);

function logError(what: string, err: unknown) {
  console.error(`[github] ${what} failed, using fallback:`, err instanceof Error ? err.message : err);
}

async function gh(path: string, accept = "application/vnd.github+json"): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: accept,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "portfolio-site-build",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: REVALIDATE, tags: ["github"] },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res;
}

function toLanguageShares(bytes: Record<string, number>): LanguageShare[] {
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) return [];
  const sorted = Object.entries(bytes)
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => ({ name, percent: (n / total) * 100 }));
  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5).reduce((a, l) => a + l.percent, 0);
  return rest > 0.5 ? [...top, { name: "Other", percent: rest }] : top;
}

function toRepoData(repo: Repo, langs: Record<string, number>, lastCommit: string | null): RepoData {
  return {
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    homepage: repo.homepage?.trim() || null,
    language: repo.language,
    languages: toLanguageShares(langs),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics,
    lastCommit: lastCommit ?? repo.pushed_at,
    defaultBranch: repo.default_branch,
  };
}

function fromSnapshot(name: string): RepoData | null {
  const repo = snapshot?.repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
  if (!snapshot || !repo) return null;
  return toRepoData(repo, snapshot.languages[repo.name] ?? {}, snapshot.lastCommit[repo.name] ?? null);
}

/* ---------- public API (server only; GITHUB_TOKEN is never exposed to the client) ---------- */

export async function getRepo(name: string): Promise<RepoData | null> {
  const base = `/repos/${github.username}/${name}`;
  try {
    const [repo, langs, commits] = await Promise.all([
      gh(base).then((r) => r.json()),
      gh(`${base}/languages`).then((r) => r.json()),
      gh(`${base}/commits?per_page=1`)
        .then((r) => r.json())
        .catch(() => []), // empty repos return 409; not fatal
    ]);
    const lastCommit = CommitsSchema.parse(commits)[0]?.commit.committer?.date ?? null;
    const data = toRepoData(RepoSchema.parse(repo), LanguagesSchema.parse(langs), lastCommit);
    lastGood.set(name, data);
    return data;
  } catch (err) {
    logError(`repo ${name}`, err);
    return (lastGood.get(name) as RepoData | undefined) ?? fromSnapshot(name);
  }
}

export async function getReadme(name: string): Promise<string | null> {
  const key = `readme:${name}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${github.username}/${name}/readme`, {
      headers: {
        Accept: "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio-site-build",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: REVALIDATE, tags: ["github"] },
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status === 404) return null; // repo simply has no README
    if (!res.ok) throw new Error(`GitHub ${res.status} for README`);
    const text = ReadmeSchema.parse(await res.text());
    lastGood.set(key, text);
    return text;
  } catch (err) {
    logError(`README ${name}`, err);
    return (lastGood.get(key) as string | undefined) ?? null;
  }
}

/** Public, non-fork, non-archived repos that aren't featured or excluded, newest activity first. */
export async function getMoreRepos(): Promise<RepoData[]> {
  let repos: Repo[];
  try {
    const res = await gh(`/users/${github.username}/repos?per_page=100&sort=pushed&type=owner`);
    repos = ReposSchema.parse(await res.json());
  } catch (err) {
    logError("repo list", err);
    repos = snapshot?.repos ?? [];
  }
  const hidden = new Set(
    [...github.exclude, ...projects.flatMap((p) => (p.repo ? [p.repo] : []))].map((n) => n.toLowerCase()),
  );
  return repos
    .filter((r) => !r.fork && !r.archived && !hidden.has(r.name.toLowerCase()))
    .sort((a, b) => (b.pushed_at ?? "").localeCompare(a.pushed_at ?? ""))
    .slice(0, github.moreLimit)
    .map((r) => toRepoData(r, {}, null));
}

/** Server-side reachability check for live demos, cached for the same 6h window. */
export async function isReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(8_000) });
    return res.status < 400;
  } catch (err) {
    logError(`reachability ${url}`, err);
    return false;
  }
}
