import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" };

const styles = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-line text-fg hover:bg-surface",
};

export function ButtonLink({ variant = "secondary", className = "", children, ...rest }: Props) {
  const external = typeof rest.href === "string" && /^https?:/.test(rest.href);
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
