"use client";

import { MoonIcon, SunIcon } from "./Icons";

/**
 * The initial theme is applied by an inline script in <head> (see layout.tsx), so there is no flash.
 * Icons switch with CSS, so the component needs no state and cannot cause a hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line hover:bg-surface"
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </button>
  );
}
