import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, Jost } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: {
    template: "%s | Cabinet Maître DALI Hichem",
    default: "Cabinet Maître DALI Hichem — Avocat à la Cour Suprême — Annaba",
  },
  description:
    "Cabinet d'avocat fondé en 1999 à Annaba, Algérie. Spécialisé en droit des affaires, droit foncier, droit maritime et droit administratif. Maître DALI Hichem, avocat à la Cour Suprême.",
  keywords: [
    "avocat Annaba",
    "cabinet juridique Algérie",
    "droit des affaires",
    "droit foncier",
    "droit maritime",
    "DALI Hichem",
  ],
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: "Cabinet Maître DALI Hichem",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${cormorantSC.variable} ${jost.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
