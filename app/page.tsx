import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import HomeHero from "@/components/home/HomeHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getIcon } from "@/lib/icons";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { home } = await getSiteContent();

  return (
    <PageTransition>
      <HomeHero />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-label text-center">{home.domainsSection.label}</p>
          <h2 className="mt-4 text-center font-serif text-4xl font-medium md:text-5xl">
            {home.domainsSection.title}
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {home.domainsSection.items.map((domain) => {
              const Icon = getIcon(domain.icon);
              return (
                <div key={domain.title} className="text-center">
                  <Icon size={36} className="mx-auto text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 font-sans text-sm font-medium uppercase tracking-widest">
                    {domain.title}
                  </h3>
                  <p className="mt-3 text-stone">{domain.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-label text-center">{home.expertiseSection.label}</p>
          <h2 className="mt-4 text-center font-serif text-4xl font-medium md:text-5xl">
            {home.expertiseSection.title}
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {home.expertiseSection.items.map((card) => {
              const Icon = getIcon(card.icon);
              return (
                <div
                  key={card.title}
                  className="corner-brackets relative bg-cream p-8 transition-shadow hover:shadow-lg"
                >
                  <Icon size={28} className="text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 font-sans text-sm font-medium uppercase tracking-widest">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone">{card.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/competences" className="btn-outline">
              {home.expertiseSection.btnText}
            </Link>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-24 text-center text-cream lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-4xl font-medium md:text-5xl">{home.ctaSection.title}</h2>
          <p className="mt-6 text-cream/70">{home.ctaSection.description}</p>
          <Link href="/contact" className="btn-primary mt-10 inline-flex">
            {home.ctaSection.btnText}
          </Link>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
