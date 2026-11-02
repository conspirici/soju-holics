const pours = [
  {
    korean: "한 잔",
    name: "The straight shot",
    with: "Sojuholics Original",
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
    with: "Sojuholics Original",
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
    with: "Sojuholics Yogurt",
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
    <section id="serve" aria-labelledby="serve-title" className="bg-paper">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <p className="eyebrow text-berry">How to pour</p>
        <h2 id="serve-title" className="type-display-tight mt-5 max-w-2xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
          Three ways we like to drink it.
        </h2>

        <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {pours.map((p, i) => (
            <li key={p.name} className="flex flex-col bg-paper p-7 sm:p-9">
              <div className="flex items-baseline justify-between">
                <span className="type-display-tight text-sm text-muted">0{i + 1}</span>
                <span lang="ko" className="font-hangul text-3xl text-berry">
                  {p.korean}
                </span>
              </div>
              <h3 className="type-display-tight mt-8 text-2xl">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">with {p.with}</p>
              <p className="mt-5 leading-relaxed text-ink-soft">{p.body}</p>
              <dl className="mt-auto pt-8 text-sm">
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

        <p className="mt-6 text-sm text-muted">Each recipe serves one. Know your limit, and never drink and drive.</p>
      </div>
    </section>
  );
}
