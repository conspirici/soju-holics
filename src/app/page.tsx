import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Family } from "@/components/sections/family";
import { Flavors, NewFlavors } from "@/components/sections/flavors";
import { Hero } from "@/components/sections/hero";
import { WhereToBuy } from "@/components/sections/where-to-buy";
import { JsonLd, flavorsJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd data={flavorsJsonLd()} />
      <Hero />
      <NewFlavors />
      <Flavors />
      <About />
      <Family />
      <WhereToBuy />
      <Contact />
    </>
  );
}
