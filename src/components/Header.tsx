import { nav } from "@/lib/site";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="/" className="truncate font-bold tracking-tight">
          {profile.name}
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
      {/* Mobile nav: a scrollable row of links, so there is no JS menu to break keyboard use */}
      <nav aria-label="Primary mobile" className="border-t border-line md:hidden">
        <ul className="flex gap-1 overflow-x-auto px-3 py-1">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="inline-block whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
