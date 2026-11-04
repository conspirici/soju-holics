import Image from "next/image";
import { Logo } from "@/components/logo";
import { classicFlavors, newFlavors, type Flavor } from "@/lib/flavors";

export function NewFlavors() {
  return (
    <section id="new" aria-labelledby="new-title" className="bg-white">
      <SectionIntro
        eyebrow="Just released"
        title="New: Pineapple & Mango."
        titleId="new-title"
        text="Two tropical flavors join the Sojuholics lineup. Same smooth, clean soju, now with a sunny twist."
      />
      {newFlavors.map((f, i) => (
        <FlavorBand key={f.slug} flavor={f} index={i} />
      ))}
    </section>
  );
}

export function Flavors() {
  return (
    <section id="flavors" aria-labelledby="flavors-title" className="border-t border-line bg-paper">
      <SectionIntro
        eyebrow="The lineup"
        title="Our classic flavors."
        titleId="flavors-title"
        text="From the timeless Original to fruity favorites, there’s a bottle for every kind of night."
      />
      {classicFlavors.map((f, i) => (
        <FlavorBand key={f.slug} flavor={f} index={i} />
      ))}
    </section>
  );
}

function SectionIntro({ eyebrow, title, titleId, text }: { eyebrow: string; title: string; titleId: string; text: string }) {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-4 pt-20 text-center sm:px-8 md:pt-28">
      <p className="eyebrow text-muted">{eyebrow}</p>
      <h2 id={titleId} className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}

function FlavorBand({ flavor: f, index }: { flavor: Flavor; index: number }) {
  const imageFirst = index % 2 === 1;

  return (
    <article id={f.slug} aria-labelledby={`${f.slug}-title`} className={index === 0 ? "" : "border-t border-line"}>
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              {f.isNew ? (
                <p className="eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white" style={{ background: f.theme.accent }}>
                  New flavor
                </p>
              ) : (
                <p className="eyebrow text-muted">{f.note}</p>
              )}
              <h3
                id={`${f.slug}-title`}
                className="type-display mt-5 text-[clamp(2.4rem,9vw,3.75rem)] uppercase lg:text-[clamp(2.75rem,4.6vw,4.5rem)]"
                style={{ color: f.theme.accent }}
              >
                {f.name}
              </h3>
              {f.isNew && <p className="eyebrow mt-4 text-muted">{f.note}</p>}
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

          <p className="mt-6 inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm">
            {f.volumeMl} ml · {f.abv}% ABV
          </p>

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
          {f.image ? (
            <Image
              src={f.image}
              alt={f.alt}
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={85}
              placeholder="blur"
              className="photo-zoom aspect-square w-full object-cover"
            />
          ) : (
            <FlavorPanel flavor={f} />
          )}
        </div>
      </div>
    </article>
  );
}

/** Branded stand-in for flavors that don't have a product photo yet. */
function FlavorPanel({ flavor: f }: { flavor: Flavor }) {
  return (
    <div
      role="img"
      aria-label={f.alt}
      className="relative grid aspect-square w-full place-items-center overflow-hidden"
      style={{ background: f.theme.panel ?? f.theme.tint }}
    >
      {/* Soft light blooms so the flat gradient reads as a lit scene. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.55),transparent_42%),radial-gradient(circle_at_82%_86%,rgba(255,255,255,0.28),transparent_38%)]"
      />
      <span
        lang="ko"
        aria-hidden="true"
        className="font-hangul pointer-events-none absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(4rem,12vw,9rem)] leading-none text-white/30"
      >
        {f.korean}
      </span>
      <div className="relative flex flex-col items-center gap-6 text-center">
        <Logo size={160} className="size-28 rounded-[11%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] sm:size-36" />
        <div>
          <p className="eyebrow text-ink/70">New flavor</p>
          <p className="type-display mt-2 text-[clamp(2rem,5vw,3.25rem)] uppercase text-ink">{f.name}</p>
        </div>
      </div>
    </div>
  );
}
