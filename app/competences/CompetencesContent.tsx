"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import Divider from "@/components/ui/Divider";
import { getIcon } from "@/lib/icons";
import type { SiteContent } from "@/lib/site-content-types";

export default function CompetencesContent({ data }: { data: SiteContent["competences"] }) {
  const maritime = data.items.find((item) => item.icon === "Anchor");

  return (
    <PageTransition>
      <PageHero {...data.hero} />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center text-stone">
          {data.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <motion.div
          className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {data.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden bg-cream p-8 transition-colors hover:bg-gold"
              >
                <span className="roman-numeral-bg -right-2 -top-4 group-hover:text-cream/10">
                  {item.roman}
                </span>
                <Icon size={28} className="relative text-gold group-hover:text-charcoal" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="relative mt-4 font-sans text-sm font-medium uppercase tracking-widest group-hover:text-charcoal">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm text-stone group-hover:text-charcoal/80">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionReveal>

      {maritime && (
        <SectionReveal className="bg-charcoal px-6 py-20 text-cream lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <figure className="corner-brackets relative">
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-gold/25">
                <Image
                  src="/images/4.jpeg"
                  alt="Boussole ancienne posée sur une carte marine"
                  fill
                  className="object-cover sepia-photo"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </div>
            </figure>

            <div>
              <p className="section-label text-gold">{maritime.roman} / Spécialité</p>
              <h2 className="mt-4 font-serif text-4xl font-medium">{maritime.title}</h2>
              <Divider className="mt-6 !mx-0" />
              <p className="mt-6 text-cream/80">{maritime.description}</p>
              <p className="mt-4 text-cream/70">
                Port de commerce historique, Annaba place le contentieux maritime au cœur de
                l&apos;activité économique régionale. Le cabinet intervient en matière
                d&apos;affrètement, d&apos;avaries, de connaissements et de litiges portuaires,
                aux côtés des armateurs, transitaires et chargeurs.
              </p>
            </div>
          </div>
        </SectionReveal>
      )}
    </PageTransition>
  );
}
