import type { Metadata, Viewport } from "next";
import { Archivo, Be_Vietnam_Pro, Black_Han_Sans } from "next/font/google";
import { AgeGate } from "@/components/age-gate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--ff-display",
  display: "swap",
});

const body = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-body",
  display: "swap",
});

// Only used for short Hangul words; Google serves the Korean glyphs in unicode-range chunks.
const hangul = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-hangul",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sojuholics | Korean Flavored Soju: New Pineapple & Mango, Original & More",
    template: "%s | Sojuholics",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Sojuholics | Sip the flavor, savor the moment",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sojuholics | Sip the flavor, savor the moment",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: "food & drink",
};

export const viewport: Viewport = {
  themeColor: "#fcebe3",
  colorScheme: "light",
};

// Runs during HTML parsing so returning visitors never see the gate flash.
const ageScript = `try{if(localStorage.getItem("sh-age")==="ok")document.documentElement.dataset.age="ok"}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hangul.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ageScript }} />
        <noscript>
          <style>{`.age-gate{display:none!important}html body{overflow:auto!important}`}</style>
        </noscript>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bottle focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div id="site">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
        <AgeGate />
      </body>
    </html>
  );
}
