import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { values, missions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Objectifs & Valeurs",
};

export default function ObjectifsPage() {
  return (
    <PageTransition>
      <PageHero
        label="02 / OBJECTIFS & VALEURS"
        title="Objectifs & Valeurs"
        subtitle="Un service pertinent et adapté aux réalités de l'entreprise"
        image="/images/boona-2.jpg"
        imageAlt="Patrimoine de Annaba"
      />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-stone">
          <p>
            L&apos;objectif de notre étude est d&apos;apporter, tant en conseil qu&apos;en
            contentieux, un service pertinent et adapté aux réalités de l&apos;entreprise, défense de
            ces intérêts devant les tribunaux, l&apos;établissement des premiers contrats
            nécessaires à l&apos;activité et l&apos;implantation des entreprises étrangères en
            Algérie.
          </p>
          <p>
            Notre défi est de sécuriser le business et protéger les opportunités offertes aux
            clients.
          </p>
          <p>
            Nous pouvons intervenir pour vous conseiller sur l&apos;opportunité d&apos;engager ou non
            un procès, sur l&apos;intérêt de signer un contrat, de constituer ou non une société,
            d&apos;engager ou non une procédure de licenciement, intervenir auprès de tiers pour
            tenter une conciliation en tant que médiateur.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">Nos valeurs</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="bg-cream p-10 text-center">
                <value.icon size={36} className="mx-auto text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 font-sans text-sm font-medium uppercase tracking-widest">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm text-stone">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-4xl">
          <blockquote className="text-center font-serif text-3xl italic text-gold-light md:text-4xl">
            « Sécuriser le business, protéger les opportunités »
          </blockquote>

          <div className="mt-16 space-y-6">
            {missions.map((mission, i) => (
              <details
                key={mission.title}
                className="group border border-gold/25 bg-charcoal/50"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 font-sans text-sm font-medium uppercase tracking-widest transition-colors hover:text-gold">
                  <span>
                    {String(i + 1).padStart(2, "0")}. {mission.title}
                  </span>
                  <span className="text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-gold/25 px-6 py-4 text-cream/70">
                  {mission.description}
                </p>
              </details>
            ))}
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
