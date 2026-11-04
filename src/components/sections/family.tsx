const brands = [
  {
    id: "wineholics",
    name: "Wineholics",
    status: "Arriving end of 2026",
    body: "The same look and smooth, easy-drinking style as Sojuholics, made with a wine base so it can be sold in stores that carry beer and wine. Fruit-forward and made for sharing at Korean BBQ nights, holiday parties and everyday get-togethers.",
    spec: "Flavors to be announced",
    panel: "linear-gradient(135deg,#8a3556 0%,#5e1e39 55%,#4a1328 100%)",
  },
  {
    id: "makgeolliholics",
    name: "Makgeolliholics",
    status: "Coming soon",
    body: "Korea’s traditional rice wine from the Sojuholics family. Made from fermented rice, makgeolli is milky, lightly sparkling and gently sweet-tart. Gently tip the chilled bottle to mix the rice that settles, pour into small bowls, and enjoy with pajeon (savory scallion pancake).",
    spec: "Details coming soon",
    panel: "linear-gradient(135deg,#8f8869 0%,#6f6a55 55%,#57523f 100%)",
  },
];

export function Family() {
  return (
    <section id="family" aria-labelledby="family-title" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="max-w-2xl">
          <p className="eyebrow text-muted">The Sojuholics family</p>
          <h2 id="family-title" className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            More from the family, on the way.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {brands.map((b) => (
            <article
              key={b.id}
              id={b.id}
              aria-labelledby={`${b.id}-title`}
              className="flex flex-col overflow-hidden border border-line bg-white"
            >
              <div
                aria-hidden="true"
                className="relative grid aspect-[16/9] place-items-center overflow-hidden"
                style={{ background: b.panel }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.22),transparent_45%)]" />
                <span className="type-display relative px-6 text-center text-[clamp(1.5rem,3.4vw,2.75rem)] uppercase text-white">
                  {b.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <p className="eyebrow self-start border border-ink px-2.5 py-1">{b.status}</p>
                <h3 id={`${b.id}-title`} className="type-display-tight mt-6 text-3xl">
                  {b.name}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{b.body}</p>
                <p className="mt-auto pt-8 text-sm text-muted">{b.spec}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
