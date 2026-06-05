import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { enterprisePillars, interventionSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Entreprise & Investissement",
};

export default function EntreprisePage() {
  return (
    <PageTransition>
      <PageHero
        label="04 / ENTREPRISE"
        title="L'Entreprise & L'Investissement"
        subtitle="Une valeur ajoutée pour les entreprises et leurs acteurs opérationnels"
        image="/images/boona-2.jpg"
        imageAlt="Environnement économique d'Annaba"
      />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-stone">
          <p>
            Nous offrons une valeur ajoutée aux entreprises et à leurs acteurs opérationnels.
            Fondée sur un pacte de confiance, la confidentialité, la réactivité, et surtout le vécu
            et le suivi personnalisé.
          </p>
          <p>
            Vous pouvez solliciter l&apos;intervention de notre cabinet pour la création d&apos;une
            société commerciale, mais aussi en cas de litiges de toutes nature dans toutes les
            branches du droit des affaires, notamment en matière fiscale — nous vous
            représenterons, vous défendrons, et plaiderons devant toutes les juridictions de
            l&apos;ordre judiciaire.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">Nos piliers</h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {enterprisePillars.map((pillar, i) => (
              <div key={pillar.title} className="corner-brackets relative bg-cream p-8">
                <span className="section-label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-sans text-sm font-medium uppercase tracking-widest">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-stone">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-4xl font-medium">
            Processus d&apos;intervention
          </h2>
          <div className="mt-16 flex flex-col gap-8 lg:flex-row lg:gap-4">
            {interventionSteps.map((step, i) => (
              <div key={step.step} className="relative flex-1 text-center">
                {i < interventionSteps.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-gold/25 lg:block"
                    aria-hidden="true"
                  />
                )}
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-gold font-accent text-sm text-gold">
                  {step.step}
                </div>
                <h3 className="mt-4 font-sans text-xs font-medium uppercase tracking-widest">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-cream/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
