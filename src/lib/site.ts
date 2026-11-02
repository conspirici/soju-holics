export const site = {
  name: "Sojuholics",
  legalName: "Sojuholics, Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.soju-holics.com").replace(/\/$/, ""),
  tagline: "Sip the flavor, savor the moment.",
  description:
    "Sojuholics makes smooth Korean soju in six flavors: Original, Strawberry, Green Grape, Peach, Lychee and Yogurt. 375 ml bottles, 12–16% ABV, imported from Korea.",
  email: "info@soju-holics.com",
  instagram: {
    handle: "@sojuholics1",
    url: "https://www.instagram.com/sojuholics1/",
  },
  address: {
    locality: "Anaheim",
    region: "CA",
    postalCode: "92806",
    country: "US",
  },
} as const;

export const nav = [
  { href: "/#about", label: "Our story" },
  { href: "/#flavors", label: "Flavors" },
  { href: "/#serve", label: "How to pour" },
  { href: "/#contact", label: "Contact" },
] as const;
