import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = { title: "Présentation" };
export const dynamic = "force-dynamic";

export default async function PresentationPage() {
  const { presentation: p } = await getSiteContent();

  return (
    <PageTransition>
      <PageHero {...p.hero} />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-stone">
              {p.paragraphsLeft.map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
            </div>
            <div className="space-y-6 text-stone">
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic text-charcoal">
                « {p.quote} »
              </blockquote>
              {p.paragraphsRight.map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="section-label">Expérience</p>
            <p className="mt-4 font-serif text-8xl font-semibold text-gold md:text-9xl">
              {p.experienceYears}
            </p>
            <p className="mt-2 font-sans text-sm uppercase tracking-widest">{p.experienceLabel}</p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">{p.domainsTitle}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.domains.map((domain, i) => (
              <div key={domain} className="corner-brackets relative border border-gold/25 p-8 text-center">
                <span className="roman-numeral-bg left-4 top-2">
                  {["I", "II", "III", "IV"][i]}
                </span>
                <p className="relative font-sans text-sm font-medium uppercase tracking-widest">
                  {domain}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/competences" className="btn-outline-light">
              {p.btnText}
            </Link>
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
