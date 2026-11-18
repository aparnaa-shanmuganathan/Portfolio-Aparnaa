import { experience } from "@/content/experience";
import { Section } from "./Section";
import { TagList } from "./Tag";

export function Experience() {
  return (
    <Section id="experience" title="Experience" className="bg-surface">
      <ol className="space-y-8">
        {experience.map((e) => (
          <li key={e.org + e.period} className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-xl font-bold">
                {e.role} <span className="text-muted">· {e.org}</span>
              </h3>
              <p className="text-sm text-muted">{e.period}</p>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <TagList items={e.stack} label={`${e.org} skills`} />
          </li>
        ))}
      </ol>
    </Section>
  );
}
