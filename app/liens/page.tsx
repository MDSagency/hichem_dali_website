import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { usefulLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Liens Utiles",
};

export default function LiensPage() {
  return (
    <PageTransition>
      <PageHero
        label="06 / LIENS"
        title="Liens Utiles"
        subtitle="Ressources officielles algériennes"
        image="/images/boona-3.jpg"
        imageAlt="Institutions algériennes"
      />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {usefulLinks.map((link) => (
            <article
              key={link.url}
              className="flex flex-col border border-gold/25 bg-parchment p-8 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-gold/50 bg-cream font-accent text-lg text-gold">
                {link.name.charAt(0)}
              </div>
              <h3 className="mt-6 font-sans text-sm font-medium uppercase tracking-widest">
                {link.name}
              </h3>
              <p className="mt-3 flex-1 text-sm text-stone">{link.description}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-gold transition-colors hover:text-gold-light"
              >
                Visiter
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
