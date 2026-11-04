import Image from "next/image";
import Link from "next/link";
import { flavors, type Flavor } from "@/lib/flavors";

export function Flavors() {
  return (
    <section id="flavors" aria-labelledby="flavors-title">
      <div className="bg-paper">
        <div className="mx-auto max-w-[90rem] px-5 pb-20 pt-20 sm:px-8 md:pb-28 md:pt-28 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-muted">The lineup</p>
            <h2 id="flavors-title" className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
              Six bottles. One for every kind of night.
            </h2>
          </div>

          <nav aria-label="Jump to a flavor" className="mt-14 md:mt-20">
            {/* One swipeable row below xl (bleeds to the screen edges, next card peeks in); a 6-up grid on wide screens. */}
            <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain px-5 pt-2 sm:-mx-8 sm:scroll-px-8 sm:gap-6 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12 xl:mx-0 xl:grid xl:grid-cols-6 xl:overflow-visible xl:px-0">
              {flavors.map((f) => (
                <li key={f.slug} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[23%] xl:w-auto">
                  <FlavorCard flavor={f} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {flavors.map((f, i) => (
        <FlavorBand key={f.slug} flavor={f} index={i} />
      ))}
    </section>
  );
}

function FlavorCard({ flavor: f }: { flavor: Flavor }) {
  return (
    <Link
      href={`/#${f.slug}`}
      className="group block transition-transform duration-500 ease-out-soft hover:-translate-y-1.5"
    >
      <div className="photo-frame overflow-hidden" style={{ background: f.theme.tint }}>
        <Image
          src={f.image}
          alt=""
          sizes="(min-width: 1280px) 15vw, (min-width: 768px) 30vw, 46vw"
          quality={80}
          placeholder="blur"
          className="photo-zoom aspect-[4/5] w-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="type-display text-lg uppercase tracking-[0.01em] sm:text-xl" style={{ color: f.theme.accent }}>
          {f.name}
        </span>
        <span lang="ko" className="font-hangul text-sm text-muted">
          {f.korean}
        </span>
      </div>
    </Link>
  );
}

function FlavorBand({ flavor: f, index }: { flavor: Flavor; index: number }) {
  const imageFirst = index % 2 === 1;

  return (
    <article
      id={f.slug}
      aria-labelledby={`${f.slug}-title`}
      className={index % 2 === 0 ? "border-t border-line bg-white" : "border-t border-line bg-paper"}
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-muted">{f.note}</p>
              <h3
                id={`${f.slug}-title`}
                className="type-display mt-5 text-[clamp(2.4rem,9vw,3.75rem)] uppercase lg:text-[clamp(2.75rem,4.6vw,4.5rem)]"
                style={{ color: f.theme.accent }}
              >
                {f.name}
              </h3>
            </div>
            <p
              lang="ko"
              aria-hidden="true"
              className="font-hangul shrink-0 text-[clamp(1.6rem,3.6vw,3rem)] leading-none opacity-25 [writing-mode:vertical-rl]"
              style={{ color: f.theme.accent }}
            >
              {f.korean}
            </p>
          </div>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl">{f.summary}</p>

          <ul className="mt-8 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full border border-line px-3.5 py-1.5">
              {f.volumeMl} ml · {f.abv}% ABV
            </li>
            <li className="rounded-full border border-line px-3.5 py-1.5">
              <span className="text-muted">{f.pairing.label}:</span> {f.pairing.value}
            </li>
          </ul>

          <details className="group mt-8 max-w-md">
            <summary className="inline-flex list-none items-center gap-2 text-sm font-medium text-muted underline decoration-1 underline-offset-4 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read more</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {f.lead} {f.body}
            </p>
          </details>
        </div>

        <div className={`photo-frame order-first overflow-hidden ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
          <Image
            src={f.image}
            alt={f.alt}
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={85}
            placeholder="blur"
            className="photo-zoom aspect-square w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}
