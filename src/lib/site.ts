export const site = {
  name: "Sojuholics",
  legalName: "Sojuholics, Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.soju-holics.com").replace(/\/$/, ""),
  tagline: "Sip the flavor, savor the moment.",
  description:
    "Sojuholics makes smooth Korean flavored soju, now including new Pineapple and Mango alongside Original, Lychee, Yogurt, Peach, Green Grape and Strawberry. 375 ml bottles, 12–16% ABV.",
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
  { href: "/#new", label: "New flavors" },
  { href: "/#flavors", label: "Flavors" },
  { href: "/#about", label: "Our story" },
  { href: "/#family", label: "Wineholics" },
  { href: "/#where-to-buy", label: "Where to buy" },
  { href: "/#contact", label: "Contact" },
] as const;
