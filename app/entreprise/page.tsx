import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = { title: "Entreprise & Investissement" };
export const dynamic = "force-dynamic";

export default async function EntreprisePage() {
  const { entreprise: e } = await getSiteContent();

  return (
    <PageTransition>
      <PageHero {...e.hero} />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-stone">
          {e.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">{e.pillarsTitle}</h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {e.pillars.map((pillar, i) => (
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
          <h2 className="text-center font-serif text-4xl font-medium">{e.stepsTitle}</h2>
          <div className="mt-16 flex flex-col gap-8 lg:flex-row lg:gap-4">
            {e.steps.map((step, i) => (
              <div key={step.step} className="relative flex-1 text-center">
                {i < e.steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-gold/25 lg:block" aria-hidden="true" />
                )}
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-gold font-accent text-sm text-gold">
                  {step.step}
                </div>
                <h3 className="mt-4 font-sans text-xs font-medium uppercase tracking-widest">{step.title}</h3>
                <p className="mt-2 text-sm text-cream/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
