import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, Jost } from "next/font/google";
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

export const dynamic = "force-dynamic";

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
      className={`${cormorant.variable} ${cormorantSC.variable} ${jost.variable}`}
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
