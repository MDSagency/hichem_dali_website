import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import HomeHero from "@/components/home/HomeHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { mainDomains, expertiseCards } from "@/lib/data";

export default function HomePage() {
  return (
    <PageTransition>
      <HomeHero />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-label text-center">Domaines principaux</p>
          <h2 className="mt-4 text-center font-serif text-4xl font-medium md:text-5xl">
            Une expertise reconnue
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {mainDomains.map((domain, i) => (
              <div key={domain.title} className="text-center">
                <domain.icon
                  size={36}
                  className="mx-auto text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-sans text-sm font-medium uppercase tracking-widest">
                  {domain.title}
                </h3>
                <p className="mt-3 text-stone">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-label text-center">Expertise</p>
          <h2 className="mt-4 text-center font-serif text-4xl font-medium md:text-5xl">
            Domaines d&apos;intervention
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {expertiseCards.map((card) => (
              <div
                key={card.title}
                className="corner-brackets relative bg-cream p-8 transition-shadow hover:shadow-lg"
              >
                <card.icon size={28} className="text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 font-sans text-sm font-medium uppercase tracking-widest">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-stone">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/competences" className="btn-outline">
              Voir toutes les compétences
            </Link>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-24 text-center text-cream lg:px-8 arabesque-bg">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-4xl font-medium md:text-5xl">
            Prendre un rendez-vous
          </h2>
          <p className="mt-6 text-cream/70">
            Bénéficiez d&apos;un premier entretien pour évaluer votre situation juridique et
            définir la meilleure stratégie d&apos;intervention.
          </p>
          <Link href="/contact" className="btn-primary mt-10 inline-flex">
            Nous contacter
          </Link>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
