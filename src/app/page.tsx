import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Flavors } from "@/components/sections/flavors";
import { Hero } from "@/components/sections/hero";
import { Serve } from "@/components/sections/serve";
import { Trade } from "@/components/sections/trade";
import { JsonLd, flavorsJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd data={flavorsJsonLd()} />
      <Hero />
      <Flavors />
      <About />
      <Serve />
      <Trade />
      <Contact />
    </>
  );
}
