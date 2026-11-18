import { skills } from "@/content/skills";
import { Section } from "./Section";
import { TagList } from "./Tag";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-6 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.label} className="space-y-2">
            <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{g.label}</dt>
            <dd>
              <TagList items={g.items} label={g.label} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
