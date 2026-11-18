import type { ReactNode } from "react";
import { certifications, leadership } from "@/content/experience";
import { profile } from "@/content/profile";
import { Section } from "./Section";

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{title}</h3>
      {children}
    </div>
  );
}

export function About() {
  const { education } = profile;
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 text-lg leading-relaxed lg:col-span-3">
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-base text-muted">
            {education.degree}, {education.school}
            {(education.graduating as string) !== "TODO" && <> · Graduating {education.graduating}</>}
          </p>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          <Card title="Certifications">
            <ul className="space-y-1 text-sm">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.name} <span className="text-muted">· {c.issuer}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Leadership & activities">
            <ul className="space-y-1 text-sm">
              {leadership.map((l) => (
                <li key={l.title}>{l.title}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
