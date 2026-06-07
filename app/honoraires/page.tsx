import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getIcon } from "@/lib/icons";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = { title: "Honoraires" };
export const dynamic = "force-dynamic";

export default async function HonorairesPage() {
  const { honoraires: h } = await getSiteContent();

  return (
    <PageTransition>
      <PageHero {...h.hero} />

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-cream/80">
          {h.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">{h.factorsTitle}</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {h.factors.map((factor) => {
              const Icon = getIcon(factor.icon);
              return (
                <div key={factor.title} className="text-center">
                  <Icon size={36} className="mx-auto text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-6 font-sans text-sm font-medium uppercase tracking-widest">
                    {factor.title}
                  </h3>
                  <p className="mt-4 text-stone">{factor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="corner-brackets border border-gold/50 bg-cream p-10 text-center">
            <p className="font-serif text-xl italic text-charcoal md:text-2xl">{h.highlightBox}</p>
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              {h.btnText}
            </Link>
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
