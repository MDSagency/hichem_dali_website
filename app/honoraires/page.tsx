import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { honorairesFactors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Honoraires",
};

export default function HonorairesPage() {
  return (
    <PageTransition>
      <PageHero
        label="05 / HONORAIRES"
        title="Honoraires"
        subtitle="Transparence et convention d'honoraires"
        image="/images/boona-1.jpg"
        imageAlt="Cabinet juridique"
      />

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-cream/80">
          <p>
            Il est d&apos;usage dans notre cabinet de proposer la signature d&apos;une convention
            d&apos;honoraires prévoyant le montant des honoraires.
          </p>
          <p>
            Le montant des honoraires est fonction de la difficulté du dossier, le temps passé dans
            le traitement du dossier et en audience, ainsi que l&apos;importance des intérêts en
            cause.
          </p>
          <p>
            En règle générale, une provision sera demandée lors de l&apos;ouverture du dossier.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">
            Facteurs déterminants
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {honorairesFactors.map((factor) => (
              <div key={factor.title} className="text-center">
                <factor.icon size={36} className="mx-auto text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 font-sans text-sm font-medium uppercase tracking-widest">
                  {factor.title}
                </h3>
                <p className="mt-4 text-stone">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="corner-brackets border border-gold/50 bg-cream p-10 text-center">
            <p className="font-serif text-xl italic text-charcoal md:text-2xl">
              Toute intervention débute par la signature d&apos;une convention d&apos;honoraires
              transparente.
            </p>
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Demander un premier entretien
            </Link>
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
