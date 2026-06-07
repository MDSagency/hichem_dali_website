import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = { title: "Notre Équipe" };
export const dynamic = "force-dynamic";

export default async function EquipePage() {
  const { equipe: e } = await getSiteContent();

  return (
    <PageTransition>
      <PageHero {...e.hero} />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-stone">
          <p>{e.intro}</p>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-3">
          {e.members.map((member) => (
            <article key={member.name} className="corner-brackets flex flex-col bg-cream p-8">
              <div className="mx-auto flex h-24 w-24 items-center justify-center border-2 border-gold/40 bg-parchment">
                <span className="font-serif text-3xl text-gold">
                  {member.name.split(" ").slice(-1)[0].charAt(0)}
                </span>
              </div>
              <h2 className="mt-6 text-center font-serif text-xl font-medium">{member.name}</h2>
              <p className="mt-1 text-center font-accent text-xs tracking-widest text-gold">{member.role}</p>
              <p className="mt-2 text-center text-sm text-stone">{member.title}</p>
              {member.since && (
                <p className="mt-2 text-center text-xs text-stone">
                  Barreau de Annaba depuis {member.since}
                </p>
              )}
              <p className="mt-6 flex-1 text-sm text-stone">{member.bio}</p>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {member.specialties.map((spec) => (
                  <li key={spec} className="border border-gold/25 px-3 py-1 text-xs uppercase tracking-wide text-charcoal">
                    {spec}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
