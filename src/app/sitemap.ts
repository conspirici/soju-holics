import type { MetadataRoute } from "next";
import { flavors } from "@/lib/flavors";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/opengraph-image.jpg`, ...flavors.map((f) => `${site.url}${f.image.src}`)],
      videos: [
        {
          title: "Sojuholics flavors",
          thumbnail_loc: `${site.url}/media/hero-poster.jpg`,
          description: "The six Sojuholics flavored soju bottles with fresh fruit.",
          content_loc: `${site.url}/media/hero.mp4`,
        },
      ],
    },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
