import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MoreOnGithub } from "@/components/MoreOnGithub";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

/** Must be a literal. Matches REVALIDATE in lib/github/data.ts (6 hours). */
export const revalidate = 21600;

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <MoreOnGithub />
      <Experience />
      <Skills />
      <Contact />
      <JsonLd />
    </>
  );
}
