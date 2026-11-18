import type { RepoData } from "@/lib/github/data";

// Non-text colours only; the legend always names each language, so colour is never the sole signal.
const COLORS: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#3178C6",
  JavaScript: "#C9A400",
  Java: "#B07219",
  HTML: "#E34C26",
  CSS: "#7B4FBF",
  Shell: "#4EAA25",
  Other: "#8B93A7",
};
const FALLBACK = ["#0E8A7D", "#B5446E", "#5B6AD0", "#9A6B00", "#2F7FB5"];
const colorFor = (name: string, i: number) => COLORS[name] ?? FALLBACK[i % FALLBACK.length];

export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function LanguageBar({ repo, legend }: { repo: RepoData; legend: boolean }) {
  if (!repo.languages.length) return null;
  const label = repo.languages.map((l) => `${l.name} ${l.percent.toFixed(0)}%`).join(", ");
  return (
    <div>
      <div role="img" aria-label={`Languages: ${label}`} className="flex h-2 w-full overflow-hidden rounded-full bg-tag">
        {repo.languages.map((l, i) => (
          <span key={l.name} style={{ width: `${l.percent}%`, background: colorFor(l.name, i) }} />
        ))}
      </div>
      {legend && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          {repo.languages.map((l, i) => (
            <li key={l.name} className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: colorFor(l.name, i) }} />
              {l.name} {l.percent.toFixed(l.percent < 10 ? 1 : 0)}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RepoStats({ repo, compact = false }: { repo: RepoData; compact?: boolean }) {
  const updated = formatDate(repo.lastCommit);
  return (
    <div className="space-y-2.5">
      <LanguageBar repo={repo} legend={!compact} />
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        {compact && repo.language && <li>{repo.language}</li>}
        <li>
          <span aria-hidden="true">★ </span>
          {repo.stars}
          <span className="sr-only"> stars</span>
        </li>
        <li>
          <span aria-hidden="true">⑂ </span>
          {repo.forks}
          <span className="sr-only"> forks</span>
        </li>
        {updated && <li>Last commit {updated}</li>}
      </ul>
      {!compact && repo.topics.length > 0 && (
        <ul aria-label="GitHub topics" className="flex flex-wrap gap-2">
          {repo.topics.map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
