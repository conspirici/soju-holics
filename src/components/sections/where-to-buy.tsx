import Link from "next/link";
import { ArrowIcon, InstagramIcon } from "@/components/icons";
import { site } from "@/lib/site";

const regions = [
  { region: "Southern California", stores: ["Ralphs", "Food 4 Less", "Kroger"] },
  {
    region: "Las Vegas",
    stores: ["Lee’s Discount Liquor (20 locations)", "99 Ranch Market", "168 Market", "SF Supermarket"],
  },
  { region: "Hawaii", stores: ["Walmart"] },
];

export function WhereToBuy() {
  return (
    <section id="where-to-buy" aria-labelledby="buy-title" className="bg-forest text-paper">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-paper/70">Where to buy</p>
          <h2 id="buy-title" className="type-display-tight mt-5 text-[clamp(2rem,4vw,3.25rem)]">
            Find Sojuholics near you.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/80">
            Distributed exclusively by Wismettac. Retailers, bars and restaurants: get in touch and we’ll help you
            stock it.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/#contact" className="btn bg-paper text-forest hover:bg-white">
              Wholesale inquiry
              <ArrowIcon />
            </Link>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-paper">
              <InstagramIcon />
              Follow {site.instagram.handle}
            </a>
          </div>
        </div>

        <dl className="lg:col-span-7">
          {regions.map((r) => (
            <div key={r.region} className="grid gap-2 border-t border-paper/20 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-6 lg:first:pt-2">
              <dt className="type-display-tight text-xl">{r.region}</dt>
              <dd className="flex flex-wrap gap-2">
                {r.stores.map((s) => (
                  <span key={s} className="rounded-full border border-paper/25 px-3.5 py-1.5 text-sm text-paper/90">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
