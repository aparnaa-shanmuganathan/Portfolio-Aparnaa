import { links, profile } from "@/content/profile";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: profile.siteUrl,
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
    sameAs: [links.github, links.linkedin].filter((l) => !l.endsWith("/TODO")),
    knowsAbout: ["Machine Learning", "Computer Vision", "Natural Language Processing", "Large Language Models", "Edge AI"],
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
