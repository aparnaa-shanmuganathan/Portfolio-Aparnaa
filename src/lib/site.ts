export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#github", label: "GitHub" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Formspree form ID. Set NEXT_PUBLIC_FORMSPREE_ID in Vercel / .env.local. */
export const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
