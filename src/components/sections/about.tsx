import Image from "next/image";
import lifestyle from "@/assets/lifestyle-table.jpg";

const facts = [
  { value: "6", label: "Flavors, from Original to Yogurt" },
  { value: "375 ml", label: "Every bottle, made to share" },
  { value: "12–16%", label: "ABV, smooth not harsh" },
  { value: "Korea", label: "Where every bottle comes from" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper">
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <figure className="lg:col-span-6">
          <div className="photo-frame overflow-hidden">
            <Image
              src={lifestyle}
              alt="Bottles of Sojuholics Strawberry, Original and Peach on a wooden board with a poured shot"
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={85}
              placeholder="blur"
              className="photo-zoom aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
          <figcaption className="mt-3 flex justify-between text-sm text-muted">
            <span>Pour for each other. Never for yourself.</span>
            <span className="font-hangul" aria-hidden="true">
              한 잔 해요
            </span>
          </figcaption>
        </figure>

        <div className="lg:col-span-6">
          <p className="eyebrow text-berry">About Soju Holics</p>
          <h2 id="about-title" className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            Welcome to Sojuholics, where tradition meets innovation in every sip.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            Discover the bold and vibrant flavors of Korea with our handcrafted range of flavored soju. From the
            timeless elegance of classic recipes to exciting modern twists, each bottle is a celebration of Korean
            culture and craftsmanship.
          </p>

          <dl className="mt-12 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.value} className="border-b border-line py-5 pr-4 sm:border-b-0">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="type-display-tight block text-2xl">{f.value}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
