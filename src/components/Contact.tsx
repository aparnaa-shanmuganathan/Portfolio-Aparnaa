import { links, profile } from "@/content/profile";
import { formspreeId } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";
import { ContactForm } from "./ContactForm";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Get in touch" className="bg-surface">
      <div className={formspreeId ? "grid gap-10 md:grid-cols-2" : "max-w-2xl"}>
        <div className="space-y-4">
          <p className="text-lg text-muted">
            I&apos;m looking for AI / ML opportunities. Whether it&apos;s a role, a project or just a question, my inbox is open.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>
              <MailIcon /> Email
            </ButtonLink>
            <ButtonLink href={links.github}>
              <GithubIcon /> GitHub
            </ButtonLink>
            <ButtonLink href={links.linkedin}>
              <LinkedinIcon /> LinkedIn
            </ButtonLink>
          </div>
        </div>
        <ContactForm fallbackEmail={profile.email} />
      </div>
    </Section>
  );
}
