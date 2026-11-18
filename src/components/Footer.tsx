import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-muted">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
