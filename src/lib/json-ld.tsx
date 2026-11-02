import { flavors } from "@/lib/flavors";
import { site } from "@/lib/site";

type Thing = Record<string, unknown>;

export function JsonLd({ data }: { data: Thing | Thing[] }) {
  // Escape "<" so content can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

const orgId = `${site.url}/#organization`;

export function organizationJsonLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: [site.instagram.url],
  };
}

export function websiteJsonLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function flavorsJsonLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sojuholics flavors",
    itemListElement: flavors.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `Sojuholics ${f.name}`,
        alternateName: `${f.korean} 소주`,
        description: `${f.lead} ${f.body}`,
        image: `${site.url}${f.image.src}`,
        url: `${site.url}/#${f.slug}`,
        category: "Flavored soju",
        brand: { "@type": "Brand", name: site.name },
        manufacturer: { "@id": orgId },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Alcohol by volume", value: `${f.abv}%` },
          { "@type": "PropertyValue", name: "Volume", value: `${f.volumeMl} ml` },
        ],
      },
    })),
  };
}
