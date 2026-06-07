import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, Jost, Playfair_Display, Libre_Franklin } from "next/font/google";
import AppShell from "@/components/layout/AppShell";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";
import { getSiteContent } from "@/lib/site-content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-cormorant-sc",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-libre-franklin",
  display: "swap",
});

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "nodejs";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: {
      template: `%s | ${content.global.siteName}`,
      default: content.global.seoTitle,
    },
    description: content.global.seoDescription,
    keywords: content.global.seoKeywords,
    openGraph: {
      type: "website",
      locale: "fr_DZ",
      siteName: content.global.siteName,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${cormorantSC.variable} ${jost.variable} ${playfair.variable} ${libreFranklin.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <SiteContentProvider content={content}>
          <AppShell content={content}>{children}</AppShell>
        </SiteContentProvider>
      </body>
    </html>
  );
}
