import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { presentationDomains } from "@/lib/data";

export const metadata: Metadata = {
  title: "Présentation",
};

export default function PresentationPage() {
  return (
    <PageTransition>
      <PageHero
        label="01 / PRÉSENTATION"
        title="Présentation du Cabinet"
        subtitle="Fondé et dirigé par Maître DALI Hichem"
        image="/images/boona-1.jpg"
        imageAlt="Vue de la ville de Annaba"
      />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-stone">
              <p>
                Fondé et dirigé par Maître DALI Hichem, avocat à la cour suprême et au conseil
                d&apos;État, inscrit au barreau de Annaba (Algérie) depuis le 28 juin 1999, notre
                cabinet intervient principalement en droit des affaires, en droit administratif, en
                droit foncier, en droit maritime.
              </p>
              <p>
                Le cabinet intervient aussi dans les missions de conseil, assistance,
                représentation des entreprises.
              </p>
              <p>
                Maître DALI Hichem a développé une expertise en droit des marchés publics, en droit
                des affaires.
              </p>
            </div>
            <div className="space-y-6 text-stone">
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic text-charcoal">
                « Notre approche des dossiers, notre état d&apos;esprit et notre expérience sont un
                atout majeur, dont nous faisons bénéficier notre clientèle. »
              </blockquote>
              <p>
                Notre couverture du droit nous permet d&apos;assister et de défendre nos clients
                aussi bien dans le cadre de négociations, que devant les juridictions, de sorte que
                nous sommes à même de garantir au chef d&apos;entreprise un suivi complet de ses
                affaires.
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="section-label">Expérience</p>
            <p className="mt-4 font-serif text-8xl font-semibold text-gold md:text-9xl">28</p>
            <p className="mt-2 font-sans text-sm uppercase tracking-widest">ans d&apos;expérience</p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl font-medium">Domaines principaux</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {presentationDomains.map((domain, i) => (
              <div
                key={domain}
                className="corner-brackets relative border border-gold/25 p-8 text-center"
              >
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
              Découvrir nos compétences
            </Link>
          </div>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
