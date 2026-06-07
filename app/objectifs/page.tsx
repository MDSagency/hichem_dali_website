import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getIcon } from "@/lib/icons";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = { title: "Objectifs & Valeurs" };
export const dynamic = "force-dynamic";

export default async function ObjectifsPage() {
  const { objectifs: o } = await getSiteContent();

  return (
    <PageTransition>
      <PageHero {...o.hero} />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-stone">
          {o.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">{o.valuesTitle}</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {o.values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <div key={value.title} className="bg-cream p-10 text-center">
                  <Icon size={36} className="mx-auto text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-6 font-sans text-sm font-medium uppercase tracking-widest">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm text-stone">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-4xl">
          <blockquote className="text-center font-serif text-3xl italic text-gold-light md:text-4xl">
            « {o.quote} »
          </blockquote>
          <div className="mt-16 space-y-6">
            {o.missions.map((mission, i) => (
              <details key={mission.title} className="group border border-gold/25 bg-charcoal/50">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-sans text-sm font-medium uppercase tracking-widest transition-colors hover:text-gold">
                  <span>
                    {String(i + 1).padStart(2, "0")}. {mission.title}
                  </span>
                  <span className="text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-gold/25 px-6 py-4 text-cream/70">{mission.description}</p>
              </details>
            ))}
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
