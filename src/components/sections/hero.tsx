import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { ArrowIcon } from "@/components/icons";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[max(34rem,calc(100svh-4.5rem))] items-end overflow-hidden bg-ink text-white"
    >
      <HeroVideo />

      {/* Soften the whole video a touch, then darken the left and bottom where the copy sits. */}
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-[#1f140e]/25" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(31,20,14,0.72)_0%,rgba(31,20,14,0.42)_38%,rgba(31,20,14,0)_68%),linear-gradient(to_top,rgba(31,20,14,0.6)_0%,rgba(31,20,14,0)_45%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 pb-12 pt-28 [text-shadow:0_1px_24px_rgba(0,0,0,0.25)] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="eyebrow flex items-center gap-3 text-white">
          <span className="font-hangul text-base normal-case tracking-normal text-white">소주</span>
          Korean flavored soju
        </p>
        <h1 id="hero-title" className="type-display mt-5 max-w-[13ch] text-[clamp(2.75rem,min(8.2vw,10.5vh),7.25rem)]">
          Sip the flavor, savor the moment.
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/85 sm:text-xl">
          Experience the authentic taste of Soju Holics.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/#flavors" className="btn bg-white text-bottle hover:bg-paper">
            Meet the six flavors
            <ArrowIcon />
          </Link>
          <Link href="/#contact" className="btn btn-outline text-white">
            Stock Sojuholics
          </Link>
        </div>
      </div>
    </section>
  );
}
