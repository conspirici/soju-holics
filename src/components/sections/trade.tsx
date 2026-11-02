import Link from "next/link";
import { ArrowIcon, InstagramIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Trade() {
  return (
    <section id="where-to-find" aria-labelledby="trade-title" className="bg-forest text-paper">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:items-end lg:px-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-paper/60">Restaurants, bars & retailers</p>
          <h2 id="trade-title" className="type-display-tight mt-5 text-[clamp(2rem,4vw,3.25rem)]">
            Want Sojuholics on your menu or shelf?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/75">
            We work with Korean BBQ spots, bars and bottle shops. Tell us about your venue and we’ll be in touch.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch">
          <Link href="/#contact" className="btn bg-paper text-forest hover:bg-white">
            Start a wholesale inquiry
            <ArrowIcon />
          </Link>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-paper"
          >
            <InstagramIcon />
            Follow {site.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
