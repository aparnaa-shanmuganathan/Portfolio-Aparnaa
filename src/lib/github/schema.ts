import { z } from "zod";

/** Only the fields we use. Everything from the GitHub API is parsed through these before rendering. */
export const RepoSchema = z.object({
  name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number().int().nonnegative(),
  forks_count: z.number().int().nonnegative(),
  pushed_at: z.string().nullable(),
  topics: z.array(z.string()).default([]),
  homepage: z.string().nullable().optional(),
  fork: z.boolean(),
  archived: z.boolean().default(false),
  default_branch: z.string().default("main"),
});
export type Repo = z.infer<typeof RepoSchema>;

export const ReposSchema = z.array(RepoSchema);
export const LanguagesSchema = z.record(z.string(), z.number().nonnegative());
export const CommitsSchema = z.array(
  z.object({ commit: z.object({ committer: z.object({ date: z.string() }).nullable() }) }),
);
export const ReadmeSchema = z.string().max(400_000);

export const SnapshotSchema = z.object({
  generatedAt: z.string(),
  repos: ReposSchema,
  languages: z.record(z.string(), LanguagesSchema),
  lastCommit: z.record(z.string(), z.string()),
});
export type Snapshot = z.infer<typeof SnapshotSchema>;
