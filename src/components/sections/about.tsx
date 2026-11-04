import Image from "next/image";
import Link from "next/link";
import lifestyle from "@/assets/lifestyle-table.jpg";

const facts = [
  { value: "8", label: "Soju flavors" },
  { value: "375 ml", label: "Per bottle" },
  { value: "12–16%", label: "ABV" },
  { value: "20 years", label: "Importing Korean drinks" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-12 lg:gap-24 lg:px-12">
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
          <p className="eyebrow text-muted">About Soju Holics</p>
          <h2 id="about-title" className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            Welcome to Sojuholics, where tradition meets innovation in every sip.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-soft">
            Discover the bold and vibrant flavors of Korea with our handcrafted range of flavored soju. From the
            timeless elegance of classic recipes to exciting modern twists, each bottle is a celebration of Korean
            culture and craftsmanship.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
            Sojuholics was founded by Henry Kim after 20 years of importing Korean beverages to the U.S. The family
            now includes{" "}
            <Link href="/#wineholics" className="font-medium underline decoration-line underline-offset-4 hover:decoration-bottle">
              Wineholics
            </Link>{" "}
            and{" "}
            <Link href="/#makgeolliholics" className="font-medium underline decoration-line underline-offset-4 hover:decoration-bottle">
              Makgeolliholics
            </Link>
            .
          </p>

          <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="pr-4">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="type-display-tight block text-3xl">{f.value}</span>
                  <span className="mt-2 block text-sm text-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
