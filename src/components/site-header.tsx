"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, home`}>
          <Logo size={40} className="size-10" />
          <span className="type-display text-[1.35rem] tracking-[-0.01em]">Sojuholics</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.9375rem] text-muted xl:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-bottle">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center text-ink transition-colors hover:text-berry"
            aria-label={`Sojuholics on Instagram (${site.instagram.handle})`}
          >
            <InstagramIcon />
          </a>
          <Link href="/#contact" className="btn btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex lg:hidden xl:inline-flex">
            Get in touch
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-t border-line bg-paper px-5 pb-8 pt-2 sm:px-8 lg:hidden"
      >
        <ul>
          {nav.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="type-display-tight block py-4 text-2xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
