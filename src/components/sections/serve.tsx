const pours = [
  {
    korean: "한 잔",
    name: "The straight shot",
    body: "Fridge-cold, in small glasses. Pour for the people next to you, never for yourself.",
    recipe: [
      ["Sojuholics Original", "1 bottle"],
      ["Shot glasses", "One per friend"],
      ["Temperature", "Fridge-cold"],
    ],
  },
  {
    korean: "소맥",
    name: "Somaek",
    body: "Soju plus beer, Korea’s favorite mix. Stir once with a chopstick and drink it fizzing.",
    recipe: [
      ["Light lager", "3½ oz"],
      ["Sojuholics Original", "1½ oz"],
      ["Glass", "Small beer glass"],
    ],
  },
  {
    korean: "하이볼",
    name: "Yogurt highball",
    body: "Creamy, tangy and dangerously easy. Lots of ice, topped with lemon-lime soda.",
    recipe: [
      ["Sojuholics Yogurt", "2 oz"],
      ["Lemon-lime soda", "3 oz"],
      ["Korean yogurt drink", "A splash"],
    ],
  },
];

export function Serve() {
  return (
    <section id="serve" aria-labelledby="serve-title" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <p className="eyebrow text-muted">How to pour</p>
        <h2 id="serve-title" className="type-display-tight mt-5 max-w-2xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
          Three ways we like to drink it.
        </h2>

        <ol className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {pours.map((p, i) => (
            <li key={p.name} className="flex flex-col border border-line bg-white p-8 sm:p-10">
              <div className="flex items-baseline justify-between">
                <span className="type-display-tight text-sm text-muted">0{i + 1}</span>
                <span lang="ko" className="font-hangul text-3xl text-ink/25">
                  {p.korean}
                </span>
              </div>
              <h3 className="type-display-tight mt-10 text-2xl">{p.name}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{p.body}</p>
              <dl className="mt-auto pt-10 text-sm">
                {p.recipe.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-t border-dashed border-line py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-muted">Each recipe serves one. Know your limit, and never drink and drive.</p>
      </div>
    </section>
  );
}
