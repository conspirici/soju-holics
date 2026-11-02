import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { flavors } from "@/lib/flavors";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t border-blush-line bg-blush">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 pb-10 pt-16 sm:px-8 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo size={44} className="size-11" />
            <span className="type-display text-2xl">Sojuholics</span>
          </div>
          <p className="mt-5 max-w-sm text-muted">
            Korean soju in six flavors, for the long dinners, the late nights, and every round of 건배 in between.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 font-medium hover:text-berry"
          >
            <InstagramIcon />
            {site.instagram.handle}
          </a>
        </div>

        <nav aria-label="Flavors" className="md:col-span-3">
          <h2 className="eyebrow text-muted">Flavors</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
            {flavors.map((f) => (
              <li key={f.slug}>
                <Link href={`/#${f.slug}`} className="hover:text-berry">
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow text-muted">Contact</h2>
          <address className="mt-4 grid gap-2.5 not-italic">
            <a href={`mailto:${site.email}`} className="hover:text-berry">
              {site.email}
            </a>
            <span>
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </span>
          </address>
          <p className="mt-6 inline-block border border-bottle px-3 py-1.5 text-bottle text-xs font-semibold tracking-wide">
            21+ · PLEASE DRINK RESPONSIBLY
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="type-display select-none whitespace-nowrap px-3 text-center text-[13.6vw] leading-[0.8] text-bottle/[0.08]"
      >
        SOJUHOLICS
      </p>

      <div className="mx-auto flex max-w-[90rem] flex-col gap-3 border-t border-blush-line px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          © {year} {site.legalName} All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </li>
          <li>
            <a href="https://www.responsibility.org/" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Drink responsibly
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
