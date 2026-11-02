import Image from "next/image";
import Link from "next/link";
import { flavors, type Flavor } from "@/lib/flavors";

export function Flavors() {
  return (
    <section id="flavors" aria-labelledby="flavors-title">
      <div className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-berry">The lineup</p>
            <h2 id="flavors-title" className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
              Six bottles. One for every kind of night.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-8 lg:col-span-5 lg:col-start-8">
            <nav aria-label="Jump to a flavor">
              <ul className="flex flex-wrap gap-2">
                {flavors.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/#${f.slug}`}
                      className="flex items-center gap-2 border border-line px-3 py-2 text-sm transition-colors hover:border-bottle"
                    >
                      <span className="size-2" style={{ background: f.theme.accent }} aria-hidden="true" />
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {flavors.map((f, i) => (
        <FlavorBand key={f.slug} flavor={f} index={i} />
      ))}
    </section>
  );
}

function FlavorBand({ flavor: f, index }: { flavor: Flavor; index: number }) {
  const imageFirst = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      id={f.slug}
      aria-labelledby={`${f.slug}-title`}
      className="border-b"
      style={{ background: f.theme.tint, borderColor: f.theme.line }}
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
          <div className="flex items-start justify-between gap-4 sm:gap-6">
            <div className="min-w-0">
              <p className="eyebrow" style={{ color: f.theme.accent }}>
                {number} / 06 · {f.note}
              </p>
              <h3
                id={`${f.slug}-title`}
                className="type-display mt-5 text-[clamp(1.9rem,8.2vw,3.5rem)] uppercase lg:text-[clamp(2.5rem,4.3vw,4rem)]"
                style={{ color: f.theme.accent }}
              >
                <span className="block text-[0.42em] tracking-[0.02em] text-ink">Sojuholics</span>
                {f.name}
              </h3>
            </div>
            <p
              lang="ko"
              className="font-hangul shrink-0 text-[clamp(1.9rem,4.5vw,3.75rem)] leading-none [writing-mode:vertical-rl]"
              style={{ color: f.theme.accent, opacity: 0.9 }}
            >
              {f.korean}
            </p>
          </div>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink">{f.summary}</p>

          <details className="group mt-4 max-w-xl">
            <summary
              className="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-4 [&::-webkit-details-marker]:hidden"
              style={{ color: f.theme.accent }}
            >
              <span className="group-open:hidden">Read more</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <p className="mt-4 leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">{f.lead}</strong> {f.body}
            </p>
          </details>

          <dl className="mt-8 max-w-xl text-[0.9375rem]">
            {[
              { label: "Volume", value: `${f.volumeMl} ml` },
              { label: "ABV", value: `${f.abv}%` },
              f.pairing,
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-t py-3"
                style={{ borderColor: f.theme.line }}
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
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
