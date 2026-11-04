import type { StaticImageData } from "next/image";
import original from "@/assets/flavors/original.jpg";
import strawberry from "@/assets/flavors/strawberry.jpg";
import greenGrape from "@/assets/flavors/green-grape.jpg";
import peach from "@/assets/flavors/peach.jpg";
import lychee from "@/assets/flavors/lychee.jpg";
import yogurt from "@/assets/flavors/yogurt.jpg";

export type Flavor = {
  slug: string;
  name: string;
  korean: string;
  note: string;
  /** One-line version shown by default; lead + body is the full original copy. */
  summary: string;
  lead: string;
  body: string;
  abv: number;
  volumeMl: number;
  /** Newly released flavors are featured first on the home page. */
  isNew?: boolean;
  /** Product photo; flavors without one yet get a branded colour panel instead. */
  image?: StaticImageData;
  alt: string;
  /** Section tint, accent (AA on tint and white), hairline colour, and the panel gradient used when there's no photo. */
  theme: { tint: string; accent: string; line: string; panel?: string };
};

export const flavors: Flavor[] = [
  {
    slug: "pineapple",
    name: "Pineapple",
    korean: "파인애플",
    note: "Bright · juicy · tropical",
    summary: "Bright, juicy pineapple with the smooth, clean finish of soju. A sweet-tart, sunny sip.",
    lead: "Bring the tropics to every pour",
    body: "with our Pineapple Flavored Soju. Bright, juicy pineapple meets the smooth, clean finish of traditional soju for a sweet-tart, sunny sip that’s perfect chilled, over ice or mixed into easy cocktails.",
    abv: 12,
    volumeMl: 375,
    isNew: true,
    alt: "Sojuholics Pineapple, a new flavor",
    theme: {
      tint: "#fff8e1",
      accent: "#7d5f00",
      line: "#f3e5b5",
      panel: "linear-gradient(135deg,#fbe27a 0%,#f6c343 45%,#e8a317 100%)",
    },
  },
  {
    slug: "mango",
    name: "Mango",
    korean: "망고",
    note: "Lush · silky · tropical",
    summary: "Lush, ripe mango blended with smooth, clean soju. Silky, tropical and made for sharing.",
    lead: "Taste summer in every sip",
    body: "with our Mango Flavored Soju. Lush, ripe mango sweetness blends with smooth, clean soju for a silky, tropical drink made for sharing, whether you sip it straight or blend it into a frozen treat.",
    abv: 12,
    volumeMl: 375,
    isNew: true,
    alt: "Sojuholics Mango, a new flavor",
    theme: {
      tint: "#fff1e4",
      accent: "#a04f00",
      line: "#f7dcc2",
      panel: "linear-gradient(135deg,#ffd27f 0%,#ffb048 45%,#f07f1b 100%)",
    },
  },
  {
    slug: "original",
    name: "Original",
    korean: "오리지널",
    note: "Clean · smooth · classic",
    summary: "Smooth, clean and timeless. The traditional spirit at the heart of every Korean celebration.",
    lead: "Discover the true essence of Korean craftsmanship",
    body: "with our Original Soju. Smooth, clean, and timeless, this traditional spirit has been enjoyed for centuries and continues to be the heart of celebrations, gatherings, and quiet moments alike. Made with the finest grains and distilled to perfection, our Original Soju offers the perfect balance of strength and subtlety, making it the ideal drink for any occasion.",
    abv: 16,
    volumeMl: 375,
    image: original,
    alt: "A bottle of Sojuholics Original soju beside two chilled shot glasses on ice",
    theme: { tint: "#eef5fb", accent: "#0a5f93", line: "#d3e4f1" },
  },
  {
    slug: "lychee",
    name: "Lychee",
    korean: "리치",
    note: "Delicate · floral · exotic",
    summary: "Delicate and floral, with the exotic sweetness of ripe lychees.",
    lead: "Indulge in the delicate sweetness of lychee",
    body: "with every sip of our Lychee Flavored Soju. This luxurious, fruity spirit combines the smoothness of traditional soju with the vibrant, floral notes of ripe lychees, creating a refreshing and exotic drinking experience that’s perfect for any occasion.",
    abv: 12,
    volumeMl: 375,
    image: lychee,
    alt: "Sojuholics Lychee soju on pink silk with fresh lychees and rose petals",
    theme: { tint: "#fcf0f6", accent: "#b0246a", line: "#f3d8e6" },
  },
  {
    slug: "yogurt",
    name: "Yogurt",
    korean: "요구르트",
    note: "Creamy · tangy · light",
    summary: "Creamy, tangy and light. A smooth twist on a Korean favorite.",
    lead: "Indulge in a creamy, tangy treat",
    body: "with our Yogurt Flavored Soju. Combining the rich, velvety texture of yogurt with the smooth, clean taste of soju, this delightful spirit offers a unique, refreshing twist on a classic favorite. Light, smooth, and just the right amount of tang, it’s the perfect drink for those who love a little indulgence with their soju.",
    abv: 12,
    volumeMl: 375,
    image: yogurt,
    alt: "Sojuholics Yogurt soju with small yogurt drink bottles and a creamy splash",
    theme: { tint: "#fcf7e8", accent: "#8a5d00", line: "#f1e6c4" },
  },
  {
    slug: "peach",
    name: "Peach",
    korean: "복숭아",
    note: "Juicy · aromatic · soft",
    summary: "Premium soju with the juicy, aromatic sweetness of ripe peaches.",
    lead: "Savor the moment with every sip.",
    body: "Introducing our Peach Flavored Soju, where the smooth, clean finish of premium soju meets the juicy, aromatic sweetness of ripe peaches. Crafted with the finest ingredients, this delightful spirit offers a refreshing twist on tradition, perfect for any occasion.",
    abv: 12,
    volumeMl: 375,
    image: peach,
    alt: "Sojuholics Peach soju with halved peaches and falling blossom petals",
    theme: { tint: "#fdf2ea", accent: "#b5491c", line: "#f5ddcd" },
  },
  {
    slug: "green-grape",
    name: "Green Grape",
    korean: "청포도",
    note: "Crisp · tart · bright",
    summary: "Crisp and bright, with the sweet tartness of perfectly ripened green grapes.",
    lead: "Unleash the refreshing essence of green grapes",
    body: "in every glass with our Green Grape Flavored Soju. Smooth, crisp, and bursting with the sweet tartness of perfectly ripened grapes, this is the ultimate soju experience for those who crave something uniquely vibrant. Elevate your sipping experience with a flavor that’s both refreshing and unforgettable.",
    abv: 12,
    volumeMl: 375,
    image: greenGrape,
    alt: "Sojuholics Green Grape soju with bunches of green grapes and a water splash",
    theme: { tint: "#eff7ec", accent: "#25723a", line: "#d6ead0" },
  },
  {
    slug: "strawberry",
    name: "Strawberry",
    korean: "딸기",
    note: "Ripe · sweet · floral",
    summary: "Ripe, sweet strawberries in smooth soju. Lovely straight, even better in a cocktail.",
    lead: "Enjoy the sweet, juicy taste of ripe strawberries",
    body: "with our Strawberry Flavored Soju. Fruity, floral and smooth, it blends classic soju with fresh berry notes for a refreshing experience that’s perfect for any occasion. Whether you’re sipping it straight or mixing it into cocktails, it’s the ideal drink for those who love a fruity twist on tradition.",
    abv: 12,
    volumeMl: 375,
    image: strawberry,
    alt: "Sojuholics Strawberry soju surrounded by fresh strawberries and a pink splash",
    theme: { tint: "#fdeff2", accent: "#bf1f45", line: "#f6d5dd" },
  },
];

export const newFlavors = flavors.filter((f) => f.isNew);
export const classicFlavors = flavors.filter((f) => !f.isNew);
