import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-20 pb-12 pt-8 text-center">
      <p className="text-sm tracking-[0.16em] uppercase text-ink-soft">
        {site.wedding.dateLabel}
      </p>
      <p className="mt-6 text-sm text-ink-faint">
        <Link href="/admin" className="transition-opacity hover:opacity-70">
          Couple login
        </Link>
      </p>
    </footer>
  );
}
