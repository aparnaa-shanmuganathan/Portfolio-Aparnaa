import type { ReactNode } from "react";

type Props = { id: string; title: string; children: ReactNode; className?: string };

export function Section({ id, title, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <h2 id={`${id}-title`} className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
