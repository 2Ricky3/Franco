"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isAdmin) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-5 py-4 md:justify-center md:px-8">
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] tracking-[0.14em] uppercase transition-opacity hover:opacity-70 ${
                  active ? "opacity-100" : "opacity-70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/rsvp"
            className="bg-fill px-4 py-2 text-[13px] tracking-[0.14em] uppercase text-white transition-opacity hover:opacity-85"
          >
            RSVP
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-ink transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[60px] z-30 bg-background lg:hidden">
          <nav className="flex flex-col items-center gap-6 px-6 py-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-[0.18em] uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/rsvp"
              className="mt-2 bg-fill px-8 py-3 text-sm tracking-[0.18em] uppercase text-white"
            >
              RSVP
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
