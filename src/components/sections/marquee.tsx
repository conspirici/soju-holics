import { flavors } from "@/lib/flavors";

function Row() {
  return flavors.map((f) => (
    <span key={f.slug} className="flex shrink-0 items-center gap-4 pr-12">
      <span className="type-display text-lg uppercase tracking-[0.02em]">{f.name}</span>
      <span className="font-hangul text-lg" style={{ color: f.theme.accent }}>
        {f.korean}
      </span>
      <span className="ml-8 size-1.5 rotate-45 bg-ink/30" />
    </span>
  ));
}

export function Marquee() {
  return (
    <div aria-hidden="true" className="group overflow-hidden border-b border-line bg-paper py-4">
      {/* Two identical rows; the track slides by exactly one row's width, then repeats. */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </div>
  );
}
